// src/widgets/header/ui/Header.tsx
import { useState } from 'react';
import { Container } from '@/shared/ui/Container';
import { LogoLink } from '@/widgets/header/ui/LogoLink';
import { navLinks } from '@/widgets/header/config/navLinks';
import { DesktopNav } from '@/widgets/header/ui/DesktopNav';
import { HeaderActions } from '@/widgets/header/ui/HeaderActions';
import { MobileMenu } from '@/widgets/header/ui/MobileMenu';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="bg-primary-black-500 py-4 fixed w-full left-0 right-0 top-0 z-50 print:hidden">
      <Container className="flex items-center justify-between relative h-full">
        <LogoLink onClose={closeMenu} />

        <DesktopNav navLinks={navLinks} onLinkClick={closeMenu} />

        <HeaderActions
          isMenuOpen={isMenuOpen}
          onToggleMenu={toggleMenu}
          onCloseMenu={closeMenu}
        />

        <MobileMenu
          isOpen={isMenuOpen}
          onClose={closeMenu}
          navLinks={navLinks}
          onLinkClick={closeMenu}
        />
      </Container>
    </header>
  );
};