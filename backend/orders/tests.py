# orders/tests/tests.py
from django.test import TestCase
from orders.models import Order, OrderItem
from merch.models import Product, SKU
from django.contrib.auth import get_user_model

User = get_user_model()


class OrderItemSnapshotTest(TestCase):
    def setUp(self):
        """Создаем данные перед каждым тестом"""
        self.user = User.objects.create_user(
            email='test@example.com',
            password='testpass123'
        )
        self.product = Product.objects.create(
            name='Тестовая футболка',
            category='clothing'
        )
        self.sku = SKU.objects.create(
            product=self.product,
            attributes={'size': 'M', 'color': 'Black'},
            price=2500,
            stock=10
        )
        self.order = Order.objects.create(
            user=self.user,
            shipping_cost=300
        )

    def test_order_item_snapshot_creation(self):
        """Тестируем, что снэпшот правильно заполняется"""
        order_item = OrderItem.objects.create(
            order=self.order,
            sku=self.sku,
            quantity=2
        )

        # Проверяем, что поля снэпшота заполнились
        self.assertEqual(order_item.sku_code, self.sku.sku_code)
        self.assertEqual(order_item.product_name, self.product.name)
        self.assertEqual(order_item.unit_price, self.sku.price)
        self.assertEqual(order_item.attributes, self.sku.attributes)
        self.assertEqual(order_item.total, 5000)  # 2500 * 2

    def test_order_item_without_sku(self):
        """Тестируем поведение при удаленном SKU"""
        order_item = OrderItem.objects.create(
            order=self.order,
            sku=self.sku,
            quantity=1
        )
        sku_id = self.sku.id
        self.sku.delete()

        # Обновляем объект из БД
        order_item.refresh_from_db()
        self.assertIsNone(order_item.sku)
        # Но данные снэпшота сохранились
        self.assertEqual(order_item.product_name, 'Тестовая футболка')