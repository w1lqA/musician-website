import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container } from '@/shared/ui/Container';
import Logo from '@/widgets/header/ui/assets/icons/Logo';
import BurgerMenuIcon from '@/widgets/header/ui/assets/BurgerMenuIcon';
import { motion, AnimatePresence } from 'framer-motion';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const navLinks = [
    { to: '/', label: 'ГЛАВНАЯ', hash: '' },
    { to: '#music', label: 'МУЗЫКА', hash: 'music' },
    { to: '#tours', label: 'КОНЦЕРТЫ', hash: 'tours' },
    { to: '#merch', label: 'МЕРЧ', hash: 'merch' },
    { to: '#cart', label: 'КОРЗИНА', hash: 'cart' },
  ];

  const handleLinkClick = (hash: string) => {
    closeMenu();
    if (hash) {
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="bg-primary-black-500 py-4 fixed w-full left-0 right-0 top-0 z-50">
      <Container className="h-full flex items-center justify-between">
        <Link to="/" className='relative w-full max-w-5 tablet:max-w-7' onClick={closeMenu}>
          <Logo className='w-full h-full object-contain text-primary-white-600' />
        </Link>

        <nav className="hidden tablet:flex items-center gap-12">
          {navLinks.map((link) => (
            link.hash ? (
              <a
                key={link.label}
                href={link.to}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.hash);
                }}
                className="text-title2-regular text-primary-white-600 hover:text-accent-1 transition-colors"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                to={link.to}
                className="text-title2-regular text-primary-white-600 hover:text-accent-1 transition-colors"
              >
                {link.label}
              </Link>
            )
          ))}
        </nav>

        <button
          type='button'
          className="tablet:hidden p-2 z-50 relative"
          aria-label="Toggle menu"
          onClick={toggleMenu}
        >
          <BurgerMenuIcon isOpen={isMenuOpen} className="w-7 h-7" />
        </button>

        <AnimatePresence>
          {isMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black/80 backdrop-blur-sm tablet:hidden z-40"
                onClick={closeMenu}
              />

              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed top-0 right-0 h-full w-64 bg-primary-black-500 shadow-xl z-40 tablet:hidden"
              >
                <nav className="flex flex-col items-end justify-center h-full px-8 space-y-8">
                  {navLinks.map((link) => (
                    link.hash ? (
                      <a
                        key={link.label}
                        href={link.to}
                        onClick={(e) => {
                          e.preventDefault();
                          handleLinkClick(link.hash);
                        }}
                        className="text-h5-display-bold text-primary-white-600 hover:text-accent-1 transition-colors text-right"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        key={link.label}
                        to={link.to}
                        onClick={closeMenu}
                        className="text-h5-display-bold text-primary-white-600 hover:text-accent-1 transition-colors text-right"
                      >
                        {link.label}
                      </Link>
                    )
                  ))}
                </nav>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </Container>
    </header>
  );
};