# merch/tests/tests.py

from django.test import TestCase
from merch.models import Product, SKU

class SKUAutoGenerationTest(TestCase):
    def setUp(self):
        self.product = Product.objects.create(
            name='Тестовая футболка',
            category='clothing'
        )

    def test_sku_code_generation(self):
        """Тестируем генерацию артикула"""
        sku = SKU.objects.create(
            product=self.product,
            attributes={'size': 'M', 'color': 'Black'},
            price=2500,
            stock=10
        )

        # Проверяем, что код сгенерировался и соответствует формату
        self.assertTrue(sku.sku_code.startswith('CLTH-'))
        self.assertIn('BLA', sku.sku_code)  # Black -> BLA
        self.assertIn('M', sku.sku_code)  # Size M

    def test_display_name_generation(self):
        """Тестируем генерацию отображаемого названия"""
        sku = SKU.objects.create(
            product=self.product,
            attributes={'size': 'M', 'color': 'Black', 'material': 'cotton'},
            price=2500,
            stock=10
        )

        expected = "Тестовая футболка - Black - размер M - cotton"
        self.assertEqual(sku.display_name, expected)

    def test_unique_together_constraint(self):
        """Тестируем уникальность product + attributes"""
        SKU.objects.create(
            product=self.product,
            attributes={'size': 'M', 'color': 'Black'},
            price=2500,
            stock=10
        )

        # Попытка создать дубликат должна вызвать ошибку
        with self.assertRaises(Exception):
            SKU.objects.create(
                product=self.product,
                attributes={'size': 'M', 'color': 'Black'},
                price=2500,
                stock=5
            )