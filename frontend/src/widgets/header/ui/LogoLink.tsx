// src/widgets/header/ui/LogoLink.tsx
import { Link } from 'react-router-dom';
import Logo from '@/widgets/header/assets/icons/Logo';

interface LogoLinkProps {
    onClose: () => void;
}

export const LogoLink = ({ onClose }: LogoLinkProps) => {
    return (
        <Link to="/" className='w-full max-w-5 tablet:max-w-7' onClick={onClose}>
            <Logo className='w-full h-full object-contain text-primary-white-600' />
        </Link>
    );
};