// src/pages/merch-details/ui/ImageGallery.tsx
import { useState } from 'react';
import clsx from 'clsx';

interface ImageGalleryProps {
    mainImage: string;
    images: string[];
}

export const ImageGallery = ({ mainImage, images }: ImageGalleryProps) => {
    const [selectedImage, setSelectedImage] = useState(mainImage);
    const allImages = [mainImage, ...images.filter(img => img !== mainImage)].slice(0, 5);

    return (
        <div className="space-y-4 tablet:space-y-6">
            <div className="aspect-square tablet:aspect-[710/534] bg-primary-black-600 overflow-hidden">
                <img
                    src={selectedImage}
                    alt="Product"
                    className="w-full h-full object-cover"
                />
            </div>
            {allImages.length > 1 && (
                <div className="grid grid-cols-4 gap-2 tablet:gap-4">
                    {allImages.map((img, index) => (
                        <button
                            type='button'
                            key={index}
                            onClick={() => setSelectedImage(img)}
                            className={clsx(
                                'aspect-square border-2 overflow-hidden transition-all',
                                selectedImage === img
                                    ? 'border-accent-1'
                                    : 'border-transparent hover:border-primary-black-300'
                            )}
                            aria-label={`Фото ${index + 1}`}
                        >
                            <img src={img} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};