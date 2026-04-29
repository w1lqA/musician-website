import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';

// Import images from Figma
import merchImg1 from '@/imports/MerchDetails/3d0dfb10b7156fea1d41e8479796f269150b6986.png';
import merchImg2 from '@/imports/MerchDetails/3d0dfb10b7156fea1d41e8479796f269150b6986.png';
import merchImg3 from '@/imports/MerchDetails/3d0dfb10b7156fea1d41e8479796f269150b6986.png';
import merchImg4 from '@/imports/MerchDetails/3d0dfb10b7156fea1d41e8479796f269150b6986.png';
import merchImg5 from '@/imports/MainDark/27a4daf36bfdd614356b7a96d454d85a6cebbd87.png';
import merchImg6 from '@/imports/MainDark/27a4daf36bfdd614356b7a96d454d85a6cebbd87.png';
import merchImg7 from '@/imports/MainDark/27a4daf36bfdd614356b7a96d454d85a6cebbd87.png';
import type { MerchItem } from '@/entities/merch/model/types';
import { Header } from '@/widgets/header/ui/Header';
import { Container } from '@/shared/ui/Container';
import { Button } from '@/shared/ui/Button';
import { MerchCard } from '@/entities/merch/ui/MerchCard';
import { Footer } from '@/widgets/footer/ui/Footer';

const sizes = ['XS', 'S', 'M', 'L', 'XL', '2XL'];

const relatedItems: MerchItem[] = [
  { id: '2', name: 'Джинсы', price: '$25.00', image: merchImg5 },
  { id: '3', name: 'Ботинки', price: '$25.00', image: merchImg6 },
  { id: '4', name: 'Свитер', price: '$25.00', image: merchImg7 },
  { id: '1', name: 'Кожаная Куртка', price: '$25.00', image: merchImg1 },
];

export const MerchDetailsPage = () => {
  const { id } = useParams();
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(merchImg1);

  const productImages = [merchImg1, merchImg2, merchImg3, merchImg4];

  return (
    <div className="min-h-screen bg-[#27292c]">
      <Header />

      <main>
        {/* Product Details Section */}
        <section className="bg-[#27292c] py-12 md:py-20">
          <Container>
            <div className="flex flex-col md:flex-row gap-8 md:gap-[101px]">
              {/* Product Images */}
              <div className="w-full md:w-[705px] space-y-6 md:space-y-[42px]">
                <div className="h-[402px] md:h-[534px] bg-[#0d0d0d] overflow-hidden">
                  <img
                    src={selectedImage}
                    alt="Product"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex gap-2 md:gap-4">
                  {productImages.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(img)}
                      className={`w-[120px] h-[96px] border-2 ${
                        selectedImage === img ? 'border-[#a33e44]' : 'border-transparent'
                      }`}
                    >
                      <img src={img} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Info */}
              <div className="w-full md:w-[464px] space-y-6 md:space-y-[26px]">
                <h1 className="font-['TT_Fors_Display_Trl'] font-bold text-[28px] md:text-[36px] leading-[1.4] text-[#f2f2f2] uppercase">
                  Кожаная Куртка
                </h1>
                <p className="font-['TT_Fors_Trial'] font-bold text-[24px] md:text-[28px] leading-[1.4] text-[#f2f2f2] uppercase">
                  $39.99
                </p>
                <p className="font-['Inter'] text-[16px] leading-[26px] text-[#d0d2d4]">
                  Embark on a cosmic journey with our AstroExplorer Graphic Tee. Crafted from premium organic cotton, this tee features a unique, vintage-inspired astronaut graphic that blends retro charm with modern space exploration.
                </p>

                {/* Size Selector */}
                <div className="space-y-3">
                  <p className="font-['Inter'] font-medium text-[18px] leading-[28px] text-[#f2f2f2]">
                    Select Size
                  </p>
                  <div className="flex gap-2">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`w-12 h-12 border ${
                          selectedSize === size
                            ? 'bg-[#a33e44] border-transparent text-white'
                            : 'bg-white border-[#dee1e6] text-[#0a0b0d]'
                        } font-['Inter'] font-medium text-[16px]`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity Selector */}
                <div className="space-y-3">
                  <p className="font-['Inter'] font-medium text-[18px] leading-[28px] text-[#f2f2f2]">
                    Quantity
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 bg-white border border-[#dee1e6] font-['Inter'] font-medium text-[14px] text-[#0a0b0d]"
                    >
                      -
                    </button>
                    <div className="w-[95px] h-[39px] bg-white border border-[#dee1e6] flex items-center justify-center font-['Inter'] font-medium text-[14px] text-[#0a0b0d]">
                      {quantity}
                    </div>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 bg-white border border-[#dee1e6] font-['Inter'] font-medium text-[14px] text-[#0a0b0d]"
                    >
                      +
                    </button>
                  </div>
                </div>

                <Button size="medium" className="w-full">
                  Добавить в корзину
                </Button>

                {/* Product Features */}
                <div className="space-y-4 text-[14px] leading-[20px] text-[#d0d2d4] font-['Inter']">
                  <p className="flex items-start gap-2">
                    <span>✓</span> Secure checkout with encrypted payment options.
                  </p>
                  <p className="flex items-start gap-2">
                    <span>✓</span> Free shipping on all orders over $75.
                  </p>
                  <p className="flex items-start gap-2">
                    <span>✓</span> 30-day hassle-free return policy.
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Product Details Accordion */}
        <section className="bg-[#27292c] border-t border-[#dee1e6] py-10">
          <Container>
            <div className="max-w-[1116px] mx-auto">
              <details className="border-t border-[#dee1e6] py-6">
                <summary className="font-['TT_Fors_Trial'] font-medium text-[18px] leading-[28px] text-[#f2f2f2] cursor-pointer">
                  Details & Care
                </summary>
                <div className="mt-4 space-y-4 text-[14px] leading-[20px] text-[#9ca1a6] font-['Inter']">
                  <p>Material: 100% Organic Combed Cotton</p>
                  <p>Print: Eco-friendly water-based ink</p>
                  <p>Weight: 180 GSM</p>
                </div>
              </details>
              <details className="border-t border-[#dee1e6] py-6">
                <summary className="font-['TT_Fors_Trial'] font-medium text-[18px] leading-[28px] text-[#f2f2f2] cursor-pointer">
                  Size Guide
                </summary>
                <div className="mt-4 text-[14px] leading-[20px] text-[#9ca1a6] font-['Inter']">
                  <p>Size chart information here...</p>
                </div>
              </details>
            </div>
          </Container>
        </section>

        {/* Related Products */}
        <section className="bg-[#0a0b0d] py-16 md:py-24">
          <Container>
            <div className="flex items-center justify-between mb-12">
              <h2 className="font-['TT_Fors_Display_Trl'] font-bold text-[36px] leading-[1.4] text-[#f2f2f2] uppercase">
                ДРУГОЙ МЕРЧ
              </h2>
              <Link to="/">
                <Button size="small">Смотреть все</Button>
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
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
