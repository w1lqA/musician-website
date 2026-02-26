from django.test import TestCase
from django.contrib.auth import get_user_model
from core.models import Subscriber
from django.utils import timezone
from datetime import timedelta

User = get_user_model()


class UserModelTest(TestCase):
    """Тесты для кастомной модели User"""

    def setUp(self):
        self.user_data = {
            'email': 'test@example.com',
            'password': 'testpass123',
            'first_name': 'Иван',
            'last_name': 'Иванов'
        }

    def test_create_user(self):
        """Тест создания обычного пользователя"""
        user = User.objects.create_user(**self.user_data)

        self.assertEqual(user.email, 'test@example.com')
        self.assertEqual(user.first_name, 'Иван')
        self.assertEqual(user.last_name, 'Иванов')
        self.assertTrue(user.check_password('testpass123'))
        self.assertTrue(user.is_active)
        self.assertFalse(user.is_staff)
        self.assertFalse(user.is_superuser)

    def test_create_user_without_email(self):
        """Тест создания пользователя без email"""
        with self.assertRaises(ValueError):
            User.objects.create_user(email='', password='testpass123')

    def test_create_superuser(self):
        """Тест создания суперпользователя"""
        admin = User.objects.create_superuser(
            email='admin@example.com',
            password='admin123'
        )

        self.assertTrue(admin.is_staff)
        self.assertTrue(admin.is_superuser)
        self.assertTrue(admin.is_active)

    def test_user_str_method(self):
        """Тест строкового представления пользователя"""
        user = User.objects.create_user(**self.user_data)
        self.assertEqual(str(user), 'test@example.com')

    def test_full_name_property(self):
        """Тест свойства full_name"""
        user = User.objects.create_user(**self.user_data)
        self.assertEqual(user.full_name, 'Иван Иванов')

        # Без имени
        user.first_name = ''
        user.last_name = ''
        user.save()
        self.assertEqual(user.full_name, 'test@example.com')


class SubscriberModelTest(TestCase):
    """Тесты для модели Subscriber"""

    def setUp(self):
        self.subscriber = Subscriber.objects.create(
            email='subscriber@example.com',
            is_active=True
        )

    def test_subscriber_creation(self):
        """Тест создания подписчика"""
        self.assertEqual(self.subscriber.email, 'subscriber@example.com')
        self.assertTrue(self.subscriber.is_active)
        self.assertIsNotNone(self.subscriber.subscribed_at)
        self.assertIsNone(self.subscriber.unsubscribed_at)

    def test_subscriber_str_method(self):
        """Тест строкового представления"""
        self.assertEqual(str(self.subscriber), 'subscriber@example.com')

    def test_unsubscribe_method(self):
        """Тест метода отписки"""
        self.subscriber.unsubscribe()

        self.assertFalse(self.subscriber.is_active)
        self.assertIsNotNone(self.subscriber.unsubscribed_at)

        # Проверяем, что повторная отписка не меняет дату
        unsubscribed_at = self.subscriber.unsubscribed_at
        self.subscriber.unsubscribe()
        self.assertEqual(self.subscriber.unsubscribed_at, unsubscribed_at)

    def test_unique_email_constraint(self):
        """Тест уникальности email"""
        with self.assertRaises(Exception):
            Subscriber.objects.create(
                email='subscriber@example.com',  # Тот же email
                is_active=True
            )

    def test_subscriber_ordering(self):
        """Тест сортировки подписчиков"""
        Subscriber.objects.create(email='a@example.com')
        Subscriber.objects.create(email='b@example.com')

        subscribers = Subscriber.objects.all()
        # Должны быть отсортированы по убыванию даты подписки
        self.assertEqual(
            list(subscribers),
            sorted(subscribers, key=lambda x: x.subscribed_at, reverse=True)
        )