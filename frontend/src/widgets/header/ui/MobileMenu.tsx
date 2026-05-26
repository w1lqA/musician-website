// src/widgets/header/ui/MobileMenu.tsx
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthButtons } from './AuthButtons';

interface NavLink {
    to: string;
    label: string;
    hash: string;
}

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
    navLinks: NavLink[];
    onLinkClick: () => void;
}

const handleHashClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string, onClose: () => void) => {
    e.preventDefault();
    if (hash) {
        const element = document.getElementById(hash);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }
    onClose();
};

export const MobileMenu = ({ isOpen, onClose, navLinks, onLinkClick }: MobileMenuProps) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm tablet:hidden z-40"
                        onClick={onClose}
                    />

                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-64 bg-primary-black-500 shadow-xl z-40 tablet:hidden"
                    >
                        <div className="flex flex-col h-full">
                            <nav className="flex flex-col items-end justify-center flex-1 px-8 space-y-8">
                                {navLinks.map((link) => (
                                    link.hash ? (
                                        <a
                                            key={link.label}
                                            href={link.to}
                                            onClick={(e) => handleHashClick(e, link.hash, onClose)}
                                            className="text-h5-display-bold text-primary-white-600 hover:text-accent-1 transition-colors text-right"
                                        >
                                            {link.label}
                                        </a>
                                    ) : (
                                        <Link
                                            key={link.label}
                                            to={link.to}
                                            onClick={onLinkClick}
                                            className="text-h5-display-bold text-primary-white-600 hover:text-accent-1 transition-colors text-right"
                                        >
                                            {link.label}
                                        </Link>
                                    )
                                ))}
                            </nav>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};