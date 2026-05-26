// src/widgets/header/ui/DesktopNav.tsx
import { Link } from 'react-router-dom';

interface NavLink {
    to: string;
    label: string;
    hash: string;
}

interface DesktopNavProps {
    navLinks: NavLink[];
    onLinkClick: () => void;
}

const handleHashClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string, onLinkClick: () => void) => {
    e.preventDefault();
    if (hash) {
        const element = document.getElementById(hash);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }
    onLinkClick();
};

export const DesktopNav = ({ navLinks, onLinkClick }: DesktopNavProps) => {
    return (
        <nav className="hidden tablet:flex items-center gap-12 absolute mx-auto left-0 right-0 w-full max-w-max">
            {navLinks.map((link) => (
                link.hash ? (
                    <a
                        key={link.label}
                        href={link.to}
                        onClick={(e) => handleHashClick(e, link.hash, onLinkClick)}
                        className="text-title2-regular text-primary-white-600 hover:text-accent-1 transition-colors"
                    >
                        {link.label}
                    </a>
                ) : (
                    <Link
                        key={link.label}
                        to={link.to}
                        onClick={onLinkClick}
                        className="text-title2-regular text-primary-white-600 hover:text-accent-1 transition-colors"
                    >
                        {link.label}
                    </Link>
                )
            ))}
        </nav>
    );
};