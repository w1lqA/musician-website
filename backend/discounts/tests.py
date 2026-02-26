# discounts/tests/tests.py
from datetime import date, timedelta
from django.test import TestCase
from django.utils import timezone
from concerts.models import Concert, Ticket
from discounts.models import DiscountCode
from django.contrib.auth import get_user_model

User = get_user_model()


class DiscountCodeAutoGenerationTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(email='test@example.com')
        self.concert = Concert.objects.create(
            venue='Test Venue',
            city='Moscow',
            date=timezone.now() + timedelta(days=30),
            price=2000
        )
        self.ticket = Ticket.objects.create(
            concert=self.concert,
            user=self.user,
            price_paid=2000
        )

    def test_code_generation_from_ticket(self):
        """Тестируем генерацию кода из номера билета"""
        discount = DiscountCode.objects.create(
            ticket=self.ticket,
            discount_percent=15
        )

        # Код должен быть равен номеру билета
        self.assertEqual(discount.code, self.ticket.ticket_number)

    def test_valid_until_default(self):
        """Тестируем установку valid_until по умолчанию (+365 дней)"""
        discount = DiscountCode.objects.create(
            ticket=self.ticket,
            discount_percent=15
        )

        expected_date = date.today() + timedelta(days=365)
        self.assertEqual(discount.valid_until, expected_date)

    def test_is_valid_property(self):
        """Тестируем проверку актуальности кода"""
        # Активный код с будущей датой
        discount = DiscountCode.objects.create(
            ticket=self.ticket,
            discount_percent=15,
            valid_until=date.today() + timedelta(days=30),
            is_active=True
        )
        self.assertTrue(discount.is_valid)

        # Просроченный код
        discount.valid_until = date.today() - timedelta(days=1)
        discount.save()
        self.assertFalse(discount.is_valid)

        # Неактивный код
        discount.valid_until = date.today() + timedelta(days=30)
        discount.is_active = False
        discount.save()
        self.assertFalse(discount.is_valid)