# backend/merch/management/commands/fill_test_data.py
import random
from django.core.management.base import BaseCommand
from django.utils import timezone
from datetime import timedelta, date
from django.contrib.auth import get_user_model

from merch.models import Product, SKU, ProductImage
from music.models import Release, Track, Favorite
from concerts.models import Concert, Ticket
from discounts.models import DiscountCode
from orders.models import Cart, CartItem, Order, OrderItem, OrderDiscount
from core.models import Subscriber

User = get_user_model()

class Command(BaseCommand):
    help = 'Заполняет базу тестовыми данными для всех приложений'
    
    def handle(self, *args, **kwargs):
        self.stdout.write('Начинаем заполнение тестовыми данными...')
        
        # Очищаем существующие данные (опционально)
        self.clean_data()
        
        # Создаем данные в правильном порядке (с учетом зависимостей)
        users = self.create_users()
        subscribers = self.create_subscribers(users)
        releases = self.create_releases()
        tracks = self.create_tracks(releases)
        favorites = self.create_favorites(users, releases)
        concerts = self.create_concerts()
        tickets = self.create_tickets(concerts, users)
        discount_codes = self.create_discount_codes(tickets)
        products = self.create_products()
        skus = self.create_skus(products)
        carts = self.create_carts(users)
        cart_items = self.create_cart_items(carts, skus)
        orders = self.create_orders(users)
        order_items = self.create_order_items(orders, skus)
        order_discounts = self.create_order_discounts(orders, discount_codes)
        
        self.stdout.write(self.style.SUCCESS('✅ Все тестовые данные успешно созданы!'))
    
    def clean_data(self):
        """Очистка всех данных (в правильном порядке из-за зависимостей)"""
        self.stdout.write('Очищаем существующие данные...')
        
        OrderDiscount.objects.all().delete()
        OrderItem.objects.all().delete()
        Order.objects.all().delete()
        CartItem.objects.all().delete()
        Cart.objects.all().delete()
        DiscountCode.objects.all().delete()
        Ticket.objects.all().delete()
        Concert.objects.all().delete()
        Favorite.objects.all().delete()
        Track.objects.all().delete()
        Release.objects.all().delete()
        SKU.objects.all().delete()
        Product.objects.all().delete()
        ProductImage.objects.all().delete()
        Subscriber.objects.all().delete()
        # Не удаляем пользователей, но можно создать новых
        
        self.stdout.write('✅ Данные очищены')
    
    def create_users(self, count=5):
        """Создание тестовых пользователей"""
        self.stdout.write('Создаем пользователей...')
        users = []
        
        # Админ
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
        
        # Обычные пользователи
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
        
        self.stdout.write(f'✅ Создано {len(users)} пользователей')
        return users
    
    def create_subscribers(self, users):
        """Создание подписчиков"""
        self.stdout.write('Создаем подписчиков...')
        subscribers = []
        
        # Подписчики из пользователей
        for user in users[:3]:
            sub, created = Subscriber.objects.get_or_create(
                email=user.email,
                defaults={
                    'is_active': True,
                    'subscribed_at': timezone.now() - timedelta(days=random.randint(1, 100))
                }
            )
            subscribers.append(sub)
        
        # Дополнительные email-подписчики
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
        
        self.stdout.write(f'✅ Создано {len(subscribers)} подписчиков')
        return subscribers
    
    def create_releases(self, count=5):
        """Создание музыкальных релизов"""
        self.stdout.write('Создаем релизы...')
        releases = []
        
        release_data = [
            {
                'title': 'Ночной полет',
                'artist': 'Электрофорез',
                'type': 'album',
                'description': 'Дебютный альбом в жанре синти-поп',
                'is_featured': True
            },
            {
                'title': 'Первая любовь',
                'artist': 'Молчат дома',
                'type': 'single',
                'description': 'Новый сингл',
                'is_featured': True
            },
            {
                'title': 'Круги на воде',
                'artist': 'Sirotkin',
                'type': 'ep',
                'description': 'Акустический EP',
                'is_featured': False
            },
            {
                'title': 'Без названия',
                'artist': 'Перемотка',
                'type': 'album',
                'description': 'Студийный альбом',
                'is_featured': True
            },
            {
                'title': 'Зима в сердце',
                'artist': 'ГШ',
                'type': 'single',
                'description': 'Зимний сингл',
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
                cover_url=f"https://example.com/covers/release_{i+1}.jpg"
            )
            releases.append(release)
        
        self.stdout.write(f'✅ Создано {len(releases)} релизов')
        return releases
    
    def create_tracks(self, releases):
        """Создание треков для релизов"""
        self.stdout.write('Создаем треки...')
        tracks = []
        
        for release in releases:
            track_count = random.randint(3, 8) if release.type == 'album' else random.randint(1, 2)
            
            for j in range(1, track_count + 1):
                track = Track.objects.create(
                    release=release,
                    title=f'Трек {j}',
                    duration_seconds=random.randint(120, 300),
                    track_number=j,
                    audio_url=f"https://example.com/audio/{release.id}/track_{j}.mp3"
                )
                tracks.append(track)
        
        self.stdout.write(f'✅ Создано {len(tracks)} треков')
        return tracks
    
    def create_favorites(self, users, releases):
        """Создание избранных релизов"""
        self.stdout.write('Создаем избранное...')
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
        
        self.stdout.write(f'✅ Создано {len(favorites)} избранных')
        return favorites
    
    def create_concerts(self, count=4):
        """Создание концертов"""
        self.stdout.write('Создаем концерты...')
        concerts = []
        
        concert_data = [
            {
                'venue': 'ГлавClub',
                'city': 'Москва',
                'status': 'upcoming',
                'total_tickets': 300
            },
            {
                'venue': 'А2',
                'city': 'Санкт-Петербург',
                'status': 'soldout',
                'total_tickets': 500
            },
            {
                'venue': '16 тонн',
                'city': 'Москва',
                'status': 'upcoming',
                'total_tickets': 200
            },
            {
                'venue': 'Космонавт',
                'city': 'Санкт-Петербург',
                'status': 'completed',
                'total_tickets': 400
            }
        ]
        
        for i, data in enumerate(concert_data[:count]):
            concert = Concert.objects.create(
                venue=data['venue'],
                city=data['city'],
                country='Россия',
                date=timezone.now() + timedelta(days=random.randint(10, 90)),
                price=random.randint(1000, 3000),
                ticket_url=f"https://tickets.example.com/concert_{i+1}",
                status=data['status'],
                total_tickets=data['total_tickets'],
                sold_tickets=random.randint(50, data['total_tickets'])
            )
            concerts.append(concert)
        
        self.stdout.write(f'✅ Создано {len(concerts)} концертов')
        return concerts
    
    def create_tickets(self, concerts, users):
        """Создание билетов на концерты"""
        self.stdout.write('Создаем билеты...')
        tickets = []
        
        for concert in concerts[:2]:
            for user in users[:3]:
                ticket = Ticket.objects.create(
                    concert=concert,
                    user=user,
                    price_paid=concert.price,
                    purchase_date=timezone.now() - timedelta(days=random.randint(1, 30)),
                    is_used_for_discount=random.choice([True, False])
                )
                tickets.append(ticket)
        
        self.stdout.write(f'✅ Создано {len(tickets)} билетов')
        return tickets
    
    def create_discount_codes(self, tickets):
        """Создание промо-кодов из билетов"""
        self.stdout.write('Создаем промо-коды...')
        codes = []
        
        for ticket in tickets:
            if random.choice([True, False]):
                code = DiscountCode.objects.create(
                    ticket=ticket,
                    discount_percent=15,
                    valid_until=date.today() + timedelta(days=365),
                    is_active=True
                )
                codes.append(code)
        
        self.stdout.write(f'✅ Создано {len(codes)} промо-кодов')
        return codes
    
    def create_products(self):
        """Создание товаров (Product)"""
        self.stdout.write('Создаем товары...')
        products = []
        
        # Одежда
        tshirt = Product.objects.create(
            name='Футболка с логотипом',
            category='clothing',
            description='Хлопковая футболка с принтом',
            main_image='https://example.com/images/tshirt.jpg',
            artist='w1lq',
            is_active=True
        )
        products.append(tshirt)
        
        hoodie = Product.objects.create(
            name='Худи оверсайз',
            category='clothing',
            description='Теплое худи с капюшоном',
            main_image='https://example.com/images/hoodie.jpg',
            artist='w1lq',
            is_active=True
        )
        products.append(hoodie)
        
        # Аксессуары
        pin = Product.objects.create(
            name='Значок',
            category='accessories',
            description='Металлический значок 3см',
            main_image='https://example.com/images/pin.jpg',
            is_active=True
        )
        products.append(pin)
        
        tote = Product.objects.create(
            name='Шопер',
            category='accessories',
            description='Экосумка из хлопка',
            main_image='https://example.com/images/tote.jpg',
            is_active=True
        )
        products.append(tote)
        
        # Музыка
        vinyl = Product.objects.create(
            name='Винил "Ночной полет"',
            category='vinyl',
            description='Виниловая пластинка 12"',
            main_image='https://example.com/images/vinyl.jpg',
            artist='Электрофорез',
            release_date=date.today() - timedelta(days=30),
            is_active=True
        )
        products.append(vinyl)
        
        cd = Product.objects.create(
            name='CD "Первая любовь"',
            category='cd',
            description='Компакт-диск в диджипаке',
            main_image='https://example.com/images/cd.jpg',
            artist='Молчат дома',
            release_date=date.today() - timedelta(days=60),
            is_active=True
        )
        products.append(cd)
        
        self.stdout.write(f'✅ Создано {len(products)} товаров')
        return products
    
    def create_skus(self, products):
        """Создание SKU для товаров"""
        self.stdout.write('Создаем SKU...')
        skus = []
        
        # SKU для футболки
        tshirt = products[0]
        for size, color in [('S', 'Black'), ('M', 'Black'), ('L', 'White'), ('XL', 'White')]:
            sku = SKU.objects.create(
                product=tshirt,
                attributes={'size': size, 'color': color, 'material': 'cotton'},
                price=2500,
                compare_at_price=3000 if random.choice([True, False]) else None,
                stock=random.randint(5, 20),
                image=''  # используем main_image из product
            )
            skus.append(sku)
        
        # SKU для худи
        hoodie = products[1]
        for size, color in [('S', 'Black'), ('M', 'Gray'), ('L', 'Black')]:
            sku = SKU.objects.create(
                product=hoodie,
                attributes={'size': size, 'color': color, 'material': 'fleece'},
                price=4500,
                stock=random.randint(3, 10)
            )
            skus.append(sku)
        
        # SKU для значка (без вариантов)
        pin = products[2]
        sku = SKU.objects.create(
            product=pin,
            attributes={'type': 'metal', 'size': '3cm'},
            price=300,
            stock=50
        )
        skus.append(sku)
        
        # SKU для шопера (с вариантами цвета)
        tote = products[3]
        for color in ['Black', 'Natural']:
            sku = SKU.objects.create(
                product=tote,
                attributes={'color': color, 'material': 'cotton'},
                price=1200,
                stock=random.randint(10, 15)
            )
            skus.append(sku)
        
        # SKU для винила (без вариантов)
        vinyl = products[4]
        sku = SKU.objects.create(
            product=vinyl,
            attributes={'format': '12"', 'weight': '180g'},
            price=3500,
            compare_at_price=4000,
            stock=7
        )
        skus.append(sku)
        
        # SKU для CD (без вариантов)
        cd = products[5]
        sku = SKU.objects.create(
            product=cd,
            attributes={'format': 'CD', 'type': 'digipack'},
            price=1500,
            stock=12
        )
        skus.append(sku)
        
        self.stdout.write(f'✅ Создано {len(skus)} SKU')
        return skus
    
    def create_carts(self, users):
        """Создание корзин для пользователей"""
        self.stdout.write('Создаем корзины...')
        carts = []
        
        for user in users:
            cart, created = Cart.objects.get_or_create(
                user=user,
                defaults={
                    'session_id': f"session_{user.id}" if not user else None
                }
            )
            carts.append(cart)
        
        # Гостевая корзина
        guest_cart = Cart.objects.create(
            session_id=f"guest_{random.randint(1000, 9999)}"
        )
        carts.append(guest_cart)
        
        self.stdout.write(f'✅ Создано {len(carts)} корзин')
        return carts
    
    def create_cart_items(self, carts, skus):
        """Создание позиций в корзинах"""
        self.stdout.write('Создаем позиции в корзинах...')
        cart_items = []
        
        for cart in carts[:2]:
            for sku in random.sample(skus, min(3, len(skus))):
                cart_item = CartItem.objects.create(
                    cart=cart,
                    sku=sku,
                    quantity=random.randint(1, 2)
                )
                cart_items.append(cart_item)
        
        self.stdout.write(f'✅ Создано {len(cart_items)} позиций в корзинах')
        return cart_items
    
    def create_orders(self, users, count=10):
        """Создание заказов"""
        self.stdout.write('Создаем заказы...')
        orders = []
        
        statuses = ['pending', 'paid', 'shipped', 'delivered', 'cancelled']
        
        for i in range(count):
            user = random.choice(users)
            days_ago = random.randint(0, 60)
            status = random.choice(statuses)
            
            order = Order.objects.create(
                user=user,
                shipping_cost=random.choice([0, 300, 500]),
                discount_total=random.choice([0, 100, 200, 500]),
                status=status,
                discount_data={},
                created_at=timezone.now() - timedelta(days=days_ago),
                completed_at=timezone.now() - timedelta(days=days_ago-1) if status in ['delivered', 'paid'] else None
            )
            orders.append(order)
        
        self.stdout.write(f'✅ Создано {len(orders)} заказов')
        return orders
    
    def create_order_items(self, orders, skus):
        """Создание позиций в заказах"""
        self.stdout.write('Создаем позиции в заказах...')
        order_items = []
        
        for order in orders:
            for sku in random.sample(skus, random.randint(1, 4)):
                # Данные автоматически заполнятся в save()
                order_item = OrderItem(
                    order=order,
                    sku=sku,
                    quantity=random.randint(1, 3)
                )
                order_item.save()  # вызовет заполнение снэпшота
                order_items.append(order_item)
        
        self.stdout.write(f'✅ Создано {len(order_items)} позиций в заказах')
        return order_items
    
    def create_order_discounts(self, orders, discount_codes):
        """Создание скидок на заказы"""
        self.stdout.write('Создаем скидки на заказы...')
        order_discounts = []
        
        for order in orders[:3]:
            for code in discount_codes[:2]:
                if random.choice([True, False]):
                    discount = OrderDiscount.objects.create(
                        order=order,
                        discount_code=code,
                        discount_amount=random.choice([100, 200, 300])
                    )
                    order_discounts.append(discount)
        
        self.stdout.write(f'✅ Создано {len(order_discounts)} скидок на заказы')
        return order_discounts