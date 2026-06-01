# core/management/commands/fill_test_data.py
import random
from django.core.management.base import BaseCommand
from django.utils import timezone
from datetime import timedelta, date
from django.contrib.auth import get_user_model
from django.db import transaction

from merch.models import Product, SKU
from music.models import Release, Track, Favorite
from concerts.models import Concert, Ticket, City
from discounts.models import DiscountCode
from orders.models import Cart, CartItem, Order, OrderItem, OrderDiscount
from core.models import Subscriber

User = get_user_model()


class Command(BaseCommand):
    help = 'заполняет базу тестовыми данными для всех приложений'

    def handle(self, *args, **kwargs):
        self.stdout.write('начинаем заполнение тестовыми данными...')

        self.clean_data()

        with transaction.atomic():
            users = self.create_users()
            subscribers = self.create_subscribers(users)
            releases = self.create_releases()
            tracks = self.create_tracks(releases)
            favorites = self.create_favorites(users, releases)
            cities = self.create_cities()
            concerts = self.create_concerts(cities)
            tickets = self.create_tickets(concerts, users)
            discount_codes = self.create_discount_codes(tickets)
            products = self.create_products()
            skus = self.create_skus(products)
            carts = self.create_carts(users)
            cart_items = self.create_cart_items(carts, skus)
            orders = self.create_orders(users)
            order_items = self.create_order_items(orders, skus)
            order_discounts = self.create_order_discounts(orders, discount_codes)

        self.stdout.write(self.style.SUCCESS('все тестовые данные успешно созданы'))

    def clean_data(self):
        self.stdout.write('очищаем существующие данные...')

        OrderDiscount.objects.all().delete()
        OrderItem.objects.all().delete()
        Order.objects.all().delete()
        CartItem.objects.all().delete()
        Cart.objects.all().delete()
        DiscountCode.objects.all().delete()
        Ticket.objects.all().delete()
        Concert.objects.all().delete()
        City.objects.all().delete()
        Favorite.objects.all().delete()
        Track.objects.all().delete()
        Release.objects.all().delete()
        SKU.objects.all().delete()
        Product.objects.all().delete()
        Subscriber.objects.all().delete()
        User.objects.filter(is_superuser=False).delete()

        self.stdout.write('данные очищены')

    def create_users(self, count=5):
        self.stdout.write('создаем пользователей...')
        users = []

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

        for i in range(1, count):
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

        self.stdout.write(f'создано {len(users)} пользователей')
        return users

    def create_subscribers(self, users):
        self.stdout.write('создаем подписчиков...')
        subscribers = []

        for user in users[:3]:
            sub, created = Subscriber.objects.get_or_create(
                email=user.email,
                defaults={
                    'is_active': True,
                    'subscribed_at': timezone.now() - timedelta(days=random.randint(1, 100))
                }
            )
            subscribers.append(sub)

        extra_emails = [
            'fan1@mail.ru',
            'fan2@yandex.ru',
            'fan3@gmail.com',
            'concertlover@mail.ru'
        ]

        for email in extra_emails:
            sub, created = Subscriber.objects.get_or_create(
                email=email,
                defaults={
                    'is_active': random.choice([True, False]),
                    'subscribed_at': timezone.now() - timedelta(days=random.randint(1, 200)),
                    'unsubscribed_at': timezone.now() - timedelta(days=10) if random.choice([True, False]) else None
                }
            )
            subscribers.append(sub)

        self.stdout.write(f'создано {len(subscribers)} подписчиков')
        return subscribers

    def create_releases(self, count=5):
        self.stdout.write('создаем релизы...')
        releases = []

        release_data = [
            {
                'title': 'Ночной полет',
                'artist': 'Электрофорез',
                'type': 'album',
                'description': 'дебютный альбом в жанре синти-поп',
                'is_featured': True
            },
            {
                'title': 'Первая любовь',
                'artist': 'Молчат дома',
                'type': 'single',
                'description': 'новый сингл',
                'is_featured': True
            },
            {
                'title': 'Круги на воде',
                'artist': 'Sirotkin',
                'type': 'ep',
                'description': 'акустический ep',
                'is_featured': False
            },
            {
                'title': 'Без названия',
                'artist': 'Перемотка',
                'type': 'album',
                'description': 'студийный альбом',
                'is_featured': True
            },
            {
                'title': 'Зима в сердце',
                'artist': 'ГШ',
                'type': 'single',
                'description': 'зимний сингл',
                'is_featured': False
            }
        ]

        for i, data in enumerate(release_data[:count]):
            release = Release.objects.create(
                title=data['title'],
                artist=data['artist'],
                type=data['type'],
                description=data['description'],
                is_featured=data['is_featured'],
                release_date=date.today() - timedelta(days=random.randint(30, 365)),
                cover=f"https://picsum.photos/seed/release_{i+1}/400/400"
            )
            releases.append(release)

        self.stdout.write(f'создано {len(releases)} релизов')
        return releases

    def create_tracks(self, releases):
        self.stdout.write('создаем треки...')
        tracks = []

        for release in releases:
            track_count = random.randint(3, 8) if release.type == 'album' else random.randint(1, 2)

            for j in range(1, track_count + 1):
                track = Track.objects.create(
                    release=release,
                    title=f'Трек {j}',
                    duration_seconds=random.randint(120, 300),
                    track_number=j,
                    file=f"https://example.com/audio/{release.id}/track_{j}.mp3"
                )
                tracks.append(track)

        self.stdout.write(f'создано {len(tracks)} треков')
        return tracks

    def create_favorites(self, users, releases):
        self.stdout.write('создаем избранное...')
        favorites = []

        for user in users[:3]:
            for release in random.sample(releases, min(3, len(releases))):
                fav, created = Favorite.objects.get_or_create(
                    user=user,
                    release=release,
                    defaults={
                        'added_at': timezone.now() - timedelta(days=random.randint(1, 30))
                    }
                )
                favorites.append(fav)

        self.stdout.write(f'создано {len(favorites)} избранных')
        return favorites

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

    def create_concerts(self, cities):
        self.stdout.write('создаем концерты...')

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
                ticket_url=f"https://tickets.example.com/concert_{i+1}",
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

        for concert in concerts[:4]:
            for user in users[:3]:
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

    def create_products(self):
        self.stdout.write('создаем товары...')
        products = []

        products_data = [
            {
                'name': 'Футболка с логотипом',
                'category': 'clothing',
                'description': 'хлопковая футболка с принтом',
                'main_image': 'https://picsum.photos/seed/tshirt/400/400',
                'artist': 'w1lq',
            },
            {
                'name': 'Худи оверсайз',
                'category': 'clothing',
                'description': 'теплое худи с капюшоном',
                'main_image': 'https://picsum.photos/seed/hoodie/400/400',
                'artist': 'w1lq',
            },
            {
                'name': 'Значок',
                'category': 'accessories',
                'description': 'металлический значок 3см',
                'main_image': 'https://picsum.photos/seed/pin/400/400',
            },
            {
                'name': 'Шопер',
                'category': 'accessories',
                'description': 'эко-сумка из хлопка',
                'main_image': 'https://picsum.photos/seed/tote/400/400',
            },
            {
                'name': 'Винил "Ночной полет"',
                'category': 'vinyl',
                'description': 'виниловая пластинка 12"',
                'main_image': 'https://picsum.photos/seed/vinyl/400/400',
                'artist': 'Электрофорез',
                'release_date': date.today() - timedelta(days=30),
            },
            {
                'name': 'CD "Первая любовь"',
                'category': 'cd',
                'description': 'компакт-диск в диджипаке',
                'main_image': 'https://picsum.photos/seed/cd/400/400',
                'artist': 'Молчат дома',
                'release_date': date.today() - timedelta(days=60),
            }
        ]

        for data in products_data:
            product = Product.objects.create(
                name=data['name'],
                category=data['category'],
                description=data['description'],
                main_image=data['main_image'],
                artist=data.get('artist', ''),
                release_date=data.get('release_date'),
                is_active=True
            )
            products.append(product)

        self.stdout.write(f'создано {len(products)} товаров')
        return products

    def create_skus(self, products):
        self.stdout.write('создаем sku...')
        skus = []

        sku_configs = [
            (0, [{'size': 'S', 'color': 'Black'}, {'size': 'M', 'color': 'Black'},
                 {'size': 'L', 'color': 'White'}, {'size': 'XL', 'color': 'White'}], 2500),
            (1, [{'size': 'S', 'color': 'Black'}, {'size': 'M', 'color': 'Gray'},
                 {'size': 'L', 'color': 'Black'}], 4500),
            (2, [{'type': 'metal', 'size': '3cm'}], 300),
            (3, [{'color': 'Black'}, {'color': 'Natural'}], 1200),
            (4, [{'format': '12"', 'weight': '180g'}], 3500),
            (5, [{'format': 'CD', 'type': 'digipack'}], 1500),
        ]

        for product_idx, attrs_list, base_price in sku_configs:
            product = products[product_idx]
            for attrs in attrs_list:
                sku = SKU.objects.create(
                    product=product,
                    attributes=attrs,
                    price=base_price,
                    compare_at_price=base_price + 500 if random.choice([True, False]) else None,
                    stock=random.randint(5, 20),
                    is_active=True
                )
                skus.append(sku)

        self.stdout.write(f'создано {len(skus)} sku')
        return skus

    def create_carts(self, users):
        self.stdout.write('создаем корзины...')
        carts = []

        for user in users:
            cart, created = Cart.objects.get_or_create(
                user=user,
                defaults={
                    'session_id': f"session_{user.id}"
                }
            )
            carts.append(cart)

        guest_cart = Cart.objects.create(
            session_id=f"guest_{random.randint(1000, 9999)}"
        )
        carts.append(guest_cart)

        self.stdout.write(f'создано {len(carts)} корзин')
        return carts

    def create_cart_items(self, carts, skus):
        self.stdout.write('создаем позиции в корзинах...')
        cart_items = []

        for cart in carts[:3]:
            for sku in random.sample(skus, min(2, len(skus))):
                cart_item = CartItem.objects.create(
                    cart=cart,
                    sku=sku,
                    quantity=random.randint(1, 2)
                )
                cart_items.append(cart_item)

        self.stdout.write(f'создано {len(cart_items)} позиций в корзинах')
        return cart_items

    def create_orders(self, users, count=10):
        self.stdout.write('создаем заказы...')
        orders = []

        statuses = ['pending', 'paid', 'shipped', 'delivered', 'cancelled']

        for _ in range(count):
            user = random.choice(users)
            days_ago = random.randint(0, 60)
            status = random.choice(statuses)

            order = Order.objects.create(
                user=user,
                shipping_cost=random.choice([0, 300, 500]),
                discount_total=0,
                status=status,
                discount_data={},
                created_at=timezone.now() - timedelta(days=days_ago),
                completed_at=timezone.now() - timedelta(days=days_ago - 1) if status in ['delivered', 'paid'] else None
            )
            orders.append(order)

        self.stdout.write(f'создано {len(orders)} заказов')
        return orders

    def create_order_items(self, orders, skus):
        self.stdout.write('создаем позиции в заказах...')
        order_items = []

        for order in orders:
            for sku in random.sample(skus, random.randint(1, 3)):
                order_item = OrderItem.objects.create(
                    order=order,
                    sku=sku,
                    quantity=random.randint(1, 2)
                )
                order_items.append(order_item)

        self.stdout.write(f'создано {len(order_items)} позиций в заказах')
        return order_items

    def create_order_discounts(self, orders, discount_codes):
        self.stdout.write('создаем скидки на заказы...')
        order_discounts = []

        for order in orders[:5]:
            if discount_codes and random.choice([True, False]):
                code = random.choice(discount_codes)
                discount = OrderDiscount.objects.create(
                    order=order,
                    discount_code=code
                )
                order_discounts.append(discount)

                order.discount_total = discount.discount_amount
                order.save()

        self.stdout.write(f'создано {len(order_discounts)} скидок на заказы')
        return order_discounts