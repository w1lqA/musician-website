# core/management/commands/fill_concerts_data.py
import random
from django.core.management.base import BaseCommand
from django.utils import timezone
from datetime import timedelta
from django.contrib.auth import get_user_model
from django.db import transaction

from concerts.models import Concert, Ticket, City
from discounts.models import DiscountCode
from orders.models import OrderDiscount

User = get_user_model()


class Command(BaseCommand):
    help = 'заполняет данными только концерты, билеты и промокоды'

    def handle(self, *args, **kwargs):
        self.stdout.write('начинаем заполнение данных концертов...')

        with transaction.atomic():
            # очищаем только связанные данные
            self.clean_concerts_data()

            # создаем города если их нет
            cities = self.create_cities()

            # создаем концерты
            concerts = self.create_concerts(cities)

            # создаем пользователей если нет (для билетов)
            users = self.get_or_create_users()

            # создаем билеты
            tickets = self.create_tickets(concerts, users)

            # создаем промокоды
            discount_codes = self.create_discount_codes(tickets)

        self.stdout.write(self.style.SUCCESS('данные концертов успешно созданы'))

    def clean_concerts_data(self):
        self.stdout.write('очищаем существующие данные концертов...')

        # очищаем в правильном порядке
        OrderDiscount.objects.all().delete()
        DiscountCode.objects.all().delete()
        Ticket.objects.all().delete()
        Concert.objects.all().delete()

        self.stdout.write('данные концертов очищены')

    def create_cities(self):
        self.stdout.write('создаем города...')

        cities_data = [
            ('Москва', 'moscow'),
            ('Санкт-Петербург', 'spb'),
            ('Екатеринбург', 'ekaterinburg'),
            ('Новосибирск', 'novosibirsk'),
            ('Казань', 'kazan')
        ]

        cities = []
        for name, slug in cities_data:
            city, created = City.objects.get_or_create(
                slug=slug,
                defaults={'name': name}
            )
            cities.append(city)
            self.stdout.write(f'  {name} -> {city.id}')

        return cities

    def get_or_create_users(self):
        self.stdout.write('проверяем пользователей...')

        users = []

        # админ
        admin, created = User.objects.get_or_create(
            email='admin@example.com',
            defaults={
                'first_name': 'Admin',
                'last_name': 'User',
                'is_staff': True,
                'is_superuser': True
            }
        )
        if created:
            admin.set_password('admin123')
            admin.save()
        users.append(admin)

        # обычные пользователи
        for i in range(1, 4):
            email = f'user{i}@example.com'
            user, created = User.objects.get_or_create(
                email=email,
                defaults={
                    'first_name': f'Имя{i}',
                    'last_name': f'Фамилия{i}',
                    'is_active': True
                }
            )
            if created:
                user.set_password('user123')
                user.save()
            users.append(user)

        self.stdout.write(f'найдено/создано {len(users)} пользователей')
        return users

    def create_concerts(self, cities):
        self.stdout.write('создаем концерты...')

        # создаем словарь для быстрого доступа к городам
        city_map = {city.name: city for city in cities}

        concert_data = [
            {
                'venue': 'ГлавClub',
                'city': city_map['Москва'],
                'status': 'upcoming',
                'total_tickets': 300
            },
            {
                'venue': 'А2',
                'city': city_map['Санкт-Петербург'],
                'status': 'soldout',
                'total_tickets': 500
            },
            {
                'venue': '16 тонн',
                'city': city_map['Москва'],
                'status': 'upcoming',
                'total_tickets': 200
            },
            {
                'venue': 'Космонавт',
                'city': city_map['Санкт-Петербург'],
                'status': 'completed',
                'total_tickets': 400
            },
            {
                'venue': 'Tele-Club',
                'city': city_map['Екатеринбург'],
                'status': 'upcoming',
                'total_tickets': 350
            },
            {
                'venue': 'Олимпик',
                'city': city_map['Новосибирск'],
                'status': 'upcoming',
                'total_tickets': 280
            },
            {
                'venue': 'Pyramid',
                'city': city_map['Казань'],
                'status': 'upcoming',
                'total_tickets': 320
            }
        ]

        concerts = []
        for i, data in enumerate(concert_data):
            sold = random.randint(50, data['total_tickets'] - 50)
            concert = Concert.objects.create(
                venue=data['venue'],
                city=data['city'],
                country='Россия',
                date=timezone.now() + timedelta(days=random.randint(10, 90)),
                price=random.randint(1000, 3500),
                ticket_url=f"https://tickets.example.com/concert_{i + 1}",
                status=data['status'],
                total_tickets=data['total_tickets'],
                sold_tickets=sold
            )
            concerts.append(concert)
            self.stdout.write(f'  {concert.venue} ({concert.city.name}) - {concert.price}₽')

        self.stdout.write(f'создано {len(concerts)} концертов')
        return concerts

    def create_tickets(self, concerts, users):
        self.stdout.write('создаем билеты...')
        tickets = []

        for concert in concerts[:4]:  # берем первые 4 концерта
            for user in users[:3]:  # первые 3 пользователя
                ticket = Ticket.objects.create(
                    concert=concert,
                    user=user,
                    price_paid=concert.price,
                    purchase_date=timezone.now() - timedelta(days=random.randint(1, 30)),
                    is_used_for_discount=random.choice([True, False])
                )
                tickets.append(ticket)

        self.stdout.write(f'создано {len(tickets)} билетов')
        return tickets

    def create_discount_codes(self, tickets):
        self.stdout.write('создаем промо-коды...')
        codes = []

        for ticket in tickets:
            if random.choice([True, False]):
                code = DiscountCode.objects.create(
                    ticket=ticket,
                    discount_percent=random.choice([10, 15, 20]),
                    is_active=True
                )
                codes.append(code)

        self.stdout.write(f'создано {len(codes)} промо-кодов')
        return codes