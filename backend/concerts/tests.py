from django.test import TestCase
from django.contrib.auth import get_user_model
from concerts.models import Concert, Ticket
from django.utils import timezone
from datetime import timedelta

User = get_user_model()


class ConcertModelTest(TestCase):
    """Тесты для модели Concert"""

    def setUp(self):
        self.concert = Concert.objects.create(
            venue='ГлавClub',
            city='Москва',
            country='Россия',
            date=timezone.now() + timedelta(days=30),
            price=2000,
            total_tickets=100,
            sold_tickets=30
        )

    def test_concert_creation(self):
        """Тест создания концерта"""
        self.assertEqual(self.concert.venue, 'ГлавClub')
        self.assertEqual(self.concert.city, 'Москва')
        self.assertEqual(self.concert.price, 2000)
        self.assertEqual(self.concert.status, 'upcoming')

    def test_concert_str_method(self):
        """Тест строкового представления"""
        date_str = self.concert.date.strftime('%d.%m.%Y %H:%M')
        expected = f"ГлавClub - Москва ({date_str})"
        self.assertEqual(str(self.concert), expected)

    def test_available_tickets_property(self):
        """Тест свойства available_tickets"""
        self.assertEqual(self.concert.available_tickets, 70)

        self.concert.sold_tickets = 100
        self.assertEqual(self.concert.available_tickets, 0)

    def test_is_sold_out_property(self):
        """Тест свойства is_sold_out"""
        self.assertFalse(self.concert.is_sold_out)

        self.concert.sold_tickets = 100
        self.assertTrue(self.concert.is_sold_out)

    def test_status_choices(self):
        """Тест выбора статуса"""
        statuses = ['upcoming', 'soldout', 'cancelled', 'completed']
        for status in statuses:
            self.concert.status = status
            self.concert.save()
            self.assertEqual(self.concert.status, status)

    def test_concert_ordering(self):
        """Тест сортировки концертов по дате"""
        Concert.objects.create(
            venue='Клуб 1',
            city='СПб',
            date=timezone.now() + timedelta(days=10),
            price=1500,
            total_tickets=100
        )
        Concert.objects.create(
            venue='Клуб 2',
            city='СПб',
            date=timezone.now() + timedelta(days=5),
            price=1500,
            total_tickets=100
        )

        concerts = Concert.objects.all()
        self.assertTrue(concerts[0].date <= concerts[1].date)

    def test_auto_status_update_on_save(self):
        """Тест автоматического обновления статуса при распродаже"""
        self.concert.sold_tickets = 100
        self.concert.save()

        self.assertEqual(self.concert.status, 'soldout')


class TicketModelTest(TestCase):
    """Тесты для модели Ticket"""

    def setUp(self):
        self.user = User.objects.create_user(
            email='fan@example.com',
            password='testpass123'
        )
        self.concert = Concert.objects.create(
            venue='ГлавClub',
            city='Москва',
            date=timezone.now() + timedelta(days=30),
            price=2000,
            total_tickets=100
        )
        self.ticket = Ticket.objects.create(
            concert=self.concert,
            user=self.user,
            price_paid=2000
        )

    def test_ticket_creation(self):
        """Тест создания билета"""
        self.assertEqual(self.ticket.concert, self.concert)
        self.assertEqual(self.ticket.user, self.user)
        self.assertEqual(self.ticket.price_paid, 2000)
        self.assertIsNotNone(self.ticket.ticket_number)
        self.assertFalse(self.ticket.is_used_for_discount)

    def test_ticket_str_method(self):
        """Тест строкового представления"""
        expected = f"Билет {self.ticket.ticket_number}"
        self.assertEqual(str(self.ticket), expected)

    def test_ticket_number_generation(self):
        """Тест генерации номера билета"""
        # Формат: WLQ-МОС-{date}-{random}
        self.assertTrue(self.ticket.ticket_number.startswith('WLQ-МОС-'))
        self.assertIn(self.concert.date.strftime('%d%m'), self.ticket.ticket_number)
        self.assertEqual(len(self.ticket.ticket_number.split('-')[-1]), 4)

    def test_unique_ticket_number(self):
        """Тест уникальности номера билета"""
        with self.assertRaises(Exception):
            Ticket.objects.create(
                concert=self.concert,
                user=self.user,
                price_paid=2000,
                ticket_number=self.ticket.ticket_number  # Тот же номер
            )

    def test_ticket_ordering(self):
        """Тест сортировки билетов по дате покупки"""
        Ticket.objects.create(
            concert=self.concert,
            user=self.user,
            price_paid=2000
        )

        tickets = Ticket.objects.all()
        self.assertEqual(
            list(tickets),
            sorted(tickets, key=lambda x: x.purchase_date, reverse=True)
        )

    def test_concert_tickets_relation(self):
        """Тест связи концерта с билетами"""
        self.assertIn(self.ticket, self.concert.tickets.all())

    def test_user_tickets_relation(self):
        """Тест связи пользователя с билетами"""
        self.assertIn(self.ticket, self.user.tickets.all())

    def test_discount_code_relation(self):
        """Тест связи с промо-кодом (One-to-One)"""
        from discounts.models import DiscountCode

        discount = DiscountCode.objects.create(
            ticket=self.ticket,
            discount_percent=15
        )

        self.assertEqual(self.ticket.discount_code, discount)
        self.assertEqual(discount.ticket, self.ticket)