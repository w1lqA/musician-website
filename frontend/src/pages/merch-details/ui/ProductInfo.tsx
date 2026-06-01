// src/pages/merch-details/ui/ProductInfo.tsx

interface ProductInfoProps {
    name: string;
    price: string;
    description: string;
    artist?: string;
}

export const ProductInfo = ({ name, price, description, artist }: ProductInfoProps) => {
    return (
        <div className="space-y-6">
            <div className="space-y-2">
                {artist && (
                    <p className="text-caption-regular text-primary-white-400">
                        {artist}
                    </p>
                )}
                <h1 className="text-h3-display-bold text-primary-white-600 uppercase">
                    {name}
                </h1>
                <p className="text-h4-bold text-primary-white-600">
                    {price}
                </p>
            </div>

            <p className="text-body-regular text-primary-white-400">
                {description}
            </p>
        </div>
    );
};