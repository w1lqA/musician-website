import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Header } from '@/widgets/header/ui/Header';
import { Container } from '@/shared/ui/Container';
import { Button } from '@/shared/ui/Button';
import { MerchCard } from '@/entities/merch/ui/MerchCard';
import { Footer } from '@/widgets/footer/ui/Footer';

// Import images from Figma
import merchImg1 from '@/imports/MerchDetails/3d0dfb10b7156fea1d41e8479796f269150b6986.png';
import merchImg2 from '@/imports/MerchDetails/3d0dfb10b7156fea1d41e8479796f269150b6986.png';
import merchImg3 from '@/imports/MerchDetails/3d0dfb10b7156fea1d41e8479796f269150b6986.png';
import merchImg4 from '@/imports/MerchDetails/3d0dfb10b7156fea1d41e8479796f269150b6986.png';
import merchImg5 from '@/imports/MainDark/27a4daf36bfdd614356b7a96d454d85a6cebbd87.png';
import merchImg6 from '@/imports/MainDark/27a4daf36bfdd614356b7a96d454d85a6cebbd87.png';
import merchImg7 from '@/imports/MainDark/27a4daf36bfdd614356b7a96d454d85a6cebbd87.png';
import type { MerchItem } from '@/entities/merch/model/types';

const sizes = ['XS', 'S', 'M', 'L', 'XL', '2XL'];

const relatedItems: MerchItem[] = [
    { id: '2', name: 'Джинсы', price: '$25.00', image: merchImg5 },
    { id: '3', name: 'Ботинки', price: '$25.00', image: merchImg6 },
    { id: '4', name: 'Свитер', price: '$25.00', image: merchImg7 },
    { id: '1', name: 'Кожаная Куртка', price: '$25.00', image: merchImg1 },
];
const MerchDetailsPage = () => {
    const [selectedSize, setSelectedSize] = useState('M');
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(merchImg1);

    const productImages = [merchImg1, merchImg2, merchImg3, merchImg4];

    return (
        <div className="min-h-screen bg-primary-black-500">
            <Header />

            <main>
                <section className="bg-primary-black-500 py-12 tablet:py-20">
                    <Container>
                        {/* Использование сетки 16 колонок как в HomeHero */}
                        <div className="grid grid-cols-1 tablet:grid-cols-16 gap-8 tablet:gap-5">

                            {/* Левая часть: Изображения (9 колонок) */}
                            <div className="tablet:col-span-9 space-y-4 tablet:space-y-6">
                                <div className="aspect-square tablet:aspect-[710/534] bg-primary-black-600 overflow-hidden">
                                    <img
                                        src={selectedImage}
                                        alt="Product"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                {/* Миниатюры */}
                                <div className="grid grid-cols-4 gap-2 tablet:gap-4">
                                    {productImages.map((img, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setSelectedImage(img)}
                                            className={`aspect-square border-2 overflow-hidden transition-all ${selectedImage === img
                                                ? 'border-accent-1'
                                                : 'border-transparent hover:border-primary-black-300'
                                                }`}
                                        >
                                            <img src={img} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Правая часть: Инфо (6 колонок, начинаем с 11-й) */}
                            <div className="tablet:col-start-11 tablet:col-span-6 space-y-6">
                                <div className="space-y-2">
                                    <h1 className="text-h3-display-bold text-primary-white-600 uppercase">
                                        Кожаная Куртка
                                    </h1>
                                    <p className="text-h4-display-bold text-primary-white-600">
                                        $39.99
                                    </p>
                                </div>

                                <p className="text-body-regular text-primary-white-400">
                                    Embark on a cosmic journey with our AstroExplorer Graphic Tee. Crafted from premium organic cotton,
                                    this tee features a unique, vintage-inspired astronaut graphic that blends retro charm with modern
                                    space exploration.
                                </p>

                                {/* Size Selector */}
                                <div className="space-y-3">
                                    <p className="text-title1-medium text-primary-white-600 uppercase">Select Size</p>
                                    <div className="flex flex-wrap gap-2">
                                        {sizes.map((size) => (
                                            <button
                                                key={size}
                                                onClick={() => setSelectedSize(size)}
                                                className={`flex-1 min-w-[56px] aspect-square tablet:aspect-auto tablet:h-12 text-body-medium transition-all ${selectedSize === size
                                                    ? 'bg-accent-1 text-primary-white-600'
                                                    : 'bg-primary-white-600 text-primary-black-600 hover:bg-primary-white-400'
                                                    }`}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Quantity Selector */}
                                <div className="space-y-3">
                                    <p className="text-title1-medium text-primary-white-600 uppercase">Quantity</p>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className="w-12 h-12 bg-primary-white-600 text-primary-black-600 hover:bg-primary-white-400 transition-all flex items-center justify-center text-xl"
                                        >
                                            -
                                        </button>
                                        <div className="flex-1 max-w-[120px] h-12 bg-primary-white-600 flex items-center justify-center text-body-medium text-primary-black-600">
                                            {quantity}
                                        </div>
                                        <button
                                            onClick={() => setQuantity(quantity + 1)}
                                            className="w-12 h-12 bg-primary-white-600 text-primary-black-600 hover:bg-primary-white-400 transition-all flex items-center justify-center text-xl"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                <Button size="medium" className="w-full">
                                    Добавить в корзину
                                </Button>

                                {/* Features */}
                                <div className="space-y-3 text-caption-regular text-primary-white-400 pt-4 border-t border-primary-black-300">
                                    {[
                                        'Secure checkout with encrypted payment options.',
                                        'Free shipping on all orders over $75.',
                                        '30-day hassle-free return policy.'
                                    ].map((text, i) => (
                                        <p key={i} className="flex items-start gap-2">
                                            <span className="text-accent-1">✓</span> {text}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Container>
                </section>

                {/* Accordion Section */}
                <section className="bg-primary-black-500 border-t border-primary-black-300 py-10">
                    <Container>
                        <div className="max-w-[1116px] mx-auto space-y-px bg-primary-black-300">
                            <details className="bg-primary-black-500 py-6 group">
                                <summary className="flex items-center justify-between text-title2-medium text-primary-white-600 cursor-pointer transition-colors hover:text-accent-1 list-none">
                                    DETAILS & CARE
                                    <span className="transition-transform group-open:rotate-180">↓</span>
                                </summary>
                                <div className="mt-4 space-y-2 text-caption-regular text-primary-white-400">
                                    <p>Material: 100% Organic Combed Cotton</p>
                                    <p>Print: Eco-friendly water-based ink</p>
                                    <p>Weight: 180 GSM</p>
                                </div>
                            </details>

                            <details className="bg-primary-black-500 py-6 group border-t border-primary-black-300">
                                <summary className="flex items-center justify-between text-title2-medium text-primary-white-600 cursor-pointer transition-colors hover:text-accent-1 list-none">
                                    SIZE GUIDE
                                    <span className="transition-transform group-open:rotate-180">↓</span>
                                </summary>
                                <div className="mt-4 text-caption-regular text-primary-white-400">
                                    <p>Detailed size chart information for all categories.</p>
                                </div>
                            </details>
                        </div>
                    </Container>
                </section>

                {/* Related Merch */}
                <section className="bg-primary-black-600 py-16 tablet:py-24">
                    <Container>
                        <div className="flex flex-col tablet:flex-row items-center justify-between gap-6 mb-12">
                            <h2 className="text-h2-display-bold text-primary-white-600 uppercase">
                                Другой мерч
                            </h2>
                            <Link to="/" className="w-full tablet:w-auto">
                                <Button size="small" className="w-full uppercase px-10">
                                    Смотреть все
                                </Button>
                            </Link>
                        </div>

                        <div className="grid grid-cols-2 tablet:grid-cols-4 gap-5">
                            {relatedItems.map((item) => (
                                <MerchCard key={item.id} item={item} />
                            ))}
                        </div>
                    </Container>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default MerchDetailsPage;