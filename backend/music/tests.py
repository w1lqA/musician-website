from django.test import TestCase
from django.contrib.auth import get_user_model
from music.models import Release, Track, Favorite
from datetime import date, timedelta

User = get_user_model()


class ReleaseModelTest(TestCase):
    """Тесты для модели Release"""

    def setUp(self):
        self.release = Release.objects.create(
            title='Ночной полет',
            artist='Электрофорез',
            release_date=date.today() - timedelta(days=30),
            type='album',
            description='Тестовый альбом',
            is_featured=True
        )

    def test_release_creation(self):
        """Тест создания релиза"""
        self.assertEqual(self.release.title, 'Ночной полет')
        self.assertEqual(self.release.artist, 'Электрофорез')
        self.assertEqual(self.release.type, 'album')
        self.assertTrue(self.release.is_featured)

    def test_release_str_method(self):
        """Тест строкового представления"""
        expected = 'Электрофорез - Ночной полет'
        self.assertEqual(str(self.release), expected)

    def test_release_types_choices(self):
        """Тест выбора типа релиза"""
        release_types = ['album', 'single', 'ep', 'live', 'compilation']
        for release_type in release_types:
            release = Release.objects.create(
                title=f'Test {release_type}',
                artist='Test Artist',
                release_date=date.today(),
                type=release_type
            )
            self.assertEqual(release.type, release_type)

    def test_track_count_method(self):
        """Тест метода подсчета треков"""
        # Создаем треки
        for i in range(1, 4):
            Track.objects.create(
                release=self.release,
                title=f'Трек {i}',
                duration_seconds=180,
                track_number=i
            )

        # Обновляем объект из БД
        self.release.refresh_from_db()
        self.assertEqual(self.release.tracks.count(), 3)

    def test_release_ordering(self):
        """Тест сортировки релизов"""
        Release.objects.create(
            title='Старый релиз',
            artist='Artist',
            release_date=date.today() - timedelta(days=100)
        )
        Release.objects.create(
            title='Новый релиз',
            artist='Artist',
            release_date=date.today()
        )

        releases = Release.objects.all()
        # Должны быть отсортированы по убыванию даты релиза
        self.assertEqual(
            releases[0].title,
            'Новый релиз'
        )


class TrackModelTest(TestCase):
    """Тесты для модели Track"""

    def setUp(self):
        self.release = Release.objects.create(
            title='Тестовый альбом',
            artist='Тест-артист',
            release_date=date.today()
        )
        self.track = Track.objects.create(
            release=self.release,
            title='Первый трек',
            duration_seconds=185,
            track_number=1,
            audio_url='https://example.com/track1.mp3'
        )

    def test_track_creation(self):
        """Тест создания трека"""
        self.assertEqual(self.track.title, 'Первый трек')
        self.assertEqual(self.track.duration_seconds, 185)
        self.assertEqual(self.track.track_number, 1)
        self.assertEqual(self.track.release, self.release)

    def test_track_str_method(self):
        """Тест строкового представления"""
        self.assertEqual(str(self.track), '1. Первый трек')

    def test_duration_formatted_property(self):
        """Тест форматирования длительности"""
        test_cases = [
            (45, '0:45'),
            (60, '1:00'),
            (185, '3:05'),
            (3661, '61:01'),
        ]

        for seconds, expected in test_cases:
            self.track.duration_seconds = seconds
            self.assertEqual(self.track.duration_formatted, expected)

    def test_unique_track_number_per_release(self):
        """Тест уникальности номера трека в рамках релиза"""
        with self.assertRaises(Exception):
            Track.objects.create(
                release=self.release,
                title='Второй трек',
                duration_seconds=180,
                track_number=1  # Тот же номер
            )

    def test_track_ordering(self):
        """Тест сортировки треков по номеру"""
        Track.objects.create(
            release=self.release,
            title='Второй трек',
            duration_seconds=180,
            track_number=2
        )
        Track.objects.create(
            release=self.release,
            title='Третий трек',
            duration_seconds=180,
            track_number=3
        )

        tracks = Track.objects.all()
        self.assertEqual(tracks[0].track_number, 1)
        self.assertEqual(tracks[1].track_number, 2)
        self.assertEqual(tracks[2].track_number, 3)


class FavoriteModelTest(TestCase):
    """Тесты для модели Favorite (многие-ко-многим)"""

    def setUp(self):
        self.user = User.objects.create_user(
            email='user@example.com',
            password='testpass123'
        )
        self.release = Release.objects.create(
            title='Любимый альбом',
            artist='Любимый артист',
            release_date=date.today()
        )
        self.favorite = Favorite.objects.create(
            user=self.user,
            release=self.release
        )

    def test_favorite_creation(self):
        """Тест создания избранного"""
        self.assertEqual(self.favorite.user, self.user)
        self.assertEqual(self.favorite.release, self.release)
        self.assertIsNotNone(self.favorite.added_at)

    def test_favorite_str_method(self):
        """Тест строкового представления"""
        expected = f"{self.user.email} → {self.release.title}"
        self.assertEqual(str(self.favorite), expected)

    def test_unique_user_release_constraint(self):
        """Тест уникальности пары пользователь-релиз"""
        with self.assertRaises(Exception):
            Favorite.objects.create(
                user=self.user,
                release=self.release  # Та же пара
            )

    def test_cascade_delete_user(self):
        """Тест каскадного удаления при удалении пользователя"""
        favorite_id = self.favorite.id
        self.user.delete()

        with self.assertRaises(Favorite.DoesNotExist):
            Favorite.objects.get(id=favorite_id)

    def test_cascade_delete_release(self):
        """Тест каскадного удаления при удалении релиза"""
        favorite_id = self.favorite.id
        self.release.delete()

        with self.assertRaises(Favorite.DoesNotExist):
            Favorite.objects.get(id=favorite_id)

    def test_user_favorites_relation(self):
        """Тест связи пользователя с избранным"""
        self.assertIn(self.favorite, self.user.favorite_releases.all())

    def test_release_favorited_by_relation(self):
        """Тест связи релиза с избранным"""
        self.assertIn(self.favorite, self.release.favorited_by.all())