import { Link } from 'react-router-dom';
import { Container } from '@/shared/ui/Container';
import Logo from '@/widgets/header/ui/assets/icons/Logo';

export const Header = () => {
  return (
    <header className="bg-primary-black-500 h-20 md:h-[120px] sticky top-0 z-50">
      <Container className="h-full flex items-center justify-between">
        <Link to="/" className="flex-shrink-0">
          <div className="relative w-7 h-11 md:w-9 md:h-14">
            <Logo className='text-primary-white-600'/>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-12">
          <Link to="/" className="text-title2-regular text-primary-white-600 hover:text-accent-1 transition-colors">
            ГЛАВНАЯ
          </Link>
          <a href="#music" className="text-title2-regular text-primary-white-600 hover:text-accent-1 transition-colors">
            МУЗЫКА
          </a>
          <a href="#tours" className="text-title2-regular text-primary-white-600 hover:text-accent-1 transition-colors">
            КОНЦЕРТЫ
          </a>
          <a href="#merch" className="text-title2-regular text-primary-white-600 hover:text-accent-1 transition-colors">
            МЕРЧ
          </a>
          <a href="#cart" className="text-title2-regular text-primary-white-600 hover:text-accent-1 transition-colors">
            КОРЗИНА
          </a>
        </nav>

        <button className="md:hidden p-2" aria-label="Toggle menu">
          <svg className="w-4 h-3.5" viewBox="0 0 16 15" fill="none">
            <path d="M0 7.5H16" stroke="#F2F2F2" />
            <path d="M0 0.5H16" stroke="#F2F2F2" />
            <path d="M0 14.5H16" stroke="#F2F2F2" />
          </svg>
        </button>
      </Container>
    </header>
  );
};