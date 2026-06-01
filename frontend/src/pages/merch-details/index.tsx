// src/pages/merch-details/index.tsx
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from '@/shared/ui/Container';
import { Header } from '@/widgets/header/ui/Header';
import { Footer } from '@/widgets/footer/ui/Footer';
import { QueryStateWrapper } from '@/shared/ui/feedback/QueryStateWrapper/QueryStateWrapper';
import { useProductDetails, useRelatedProducts } from '@/entities/merch/hooks/useMerchQueries';
import { ImageGallery } from '@/pages/merch-details/ui/ImageGallery';
import { ProductInfo } from '@/pages/merch-details/ui/ProductInfo';
import { SizeSelector } from '@/pages/merch-details/ui/SizeSelector';
import { QuantitySelector } from '@/pages/merch-details/ui/QuantitySelector';
import { AddToCartButton } from '@/pages/merch-details/ui/AddToCartButton';
import { AccordionSection } from '@/pages/merch-details/ui/AccordionSection';
import { RelatedProducts } from '@/pages/merch-details/ui/RelatedProducts';


export default function MerchDetailsPage() {
    const { id } = useParams<{ id: string }>();
    const [selectedSize, setSelectedSize] = useState('');
    const [quantity, setQuantity] = useState(1);

    const { data: product, isLoading, isError, error, refetch } = useProductDetails(id!);
    const {
        data: related,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useRelatedProducts(product?.category || '', id!, 4);

    const handleAddToCart = () => {
        // TODO: реализовать добавление в корзину
        console.log('Add to cart:', { productId: id, size: selectedSize, quantity });
    };

    const features = [
        'Secure checkout with encrypted payment options.',
        'Free shipping on all orders over $75.',
        '30-day hassle-free return policy.',
    ];

    return (
        <div className="min-h-screen bg-primary-black-500">
            <Header />

            <main>
                <section className="bg-primary-black-500 py-12 tablet:py-20">
                    <Container>
                        <QueryStateWrapper
                            loading={{
                                isLoading,
                                config: { message: 'Загрузка товара...' },
                            }}
                            error={{
                                isError,
                                raw: error,
                                config: {
                                    fallbackMessage: 'Не удалось загрузить товар',
                                    actionLabel: 'Повторить',
                                    onClick: () => refetch(),
                                },
                            }}
                            empty={{
                                isEmpty: !product,
                                config: { message: 'Товар не найден' },
                            }}
                        >
                            {product && (
                                <div className="grid grid-cols-1 tablet:grid-cols-16 gap-8 tablet:gap-5">
                                    <div className="tablet:col-span-9">
                                        <ImageGallery mainImage={product.mainImage} images={product.images} />
                                    </div>

                                    <div className="tablet:col-start-11 tablet:col-span-6 space-y-6">
                                        <ProductInfo
                                            name={product.name}
                                            price={product.price}
                                            description={product.description}
                                            artist={product.artist}
                                        />

                                        <SizeSelector
                                            sizes={product.sizes}
                                            selectedSize={selectedSize}
                                            onSizeChange={setSelectedSize}
                                        />

                                        <QuantitySelector
                                            quantity={quantity}
                                            onQuantityChange={setQuantity}
                                        />

                                        <AddToCartButton onClick={handleAddToCart} />

                                        <div className="space-y-3 text-caption-regular text-primary-white-400 pt-4 border-t border-primary-black-300">
                                            {features.map((text, i) => (
                                                <p key={i} className="flex items-start gap-2">
                                                    <span className="text-accent-1">✓</span> {text}
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </QueryStateWrapper>
                    </Container>
                </section>

                <section className="bg-primary-black-500 border-t border-primary-black-300 py-10">
                    <Container>
                        <div className="max-w-[1116px] mx-auto space-y-px bg-primary-black-300">
                            <AccordionSection title="ДЕТАЛИ И УХОД" defaultOpen>
                                <p>Material: 100% Organic Combed Cotton</p>
                                <p>Print: Eco-friendly water-based ink</p>
                                <p>Weight: 180 GSM</p>
                            </AccordionSection>

                            <AccordionSection title="ТАБЛИЦА РАЗМЕРОВ">
                                <p>Размерная сетка для товара.</p>
                            </AccordionSection>
                        </div>
                    </Container>
                </section>

                <section className="bg-primary-black-600 py-16 tablet:py-24">
                    <Container>
                        <RelatedProducts
                            items={related?.items || []}
                            hasMore={hasNextPage || false}
                            isLoadingMore={isFetchingNextPage}
                            onLoadMore={() => fetchNextPage()}
                        />
                    </Container>
                </section>
            </main>

            <Footer />
        </div>
    );
}