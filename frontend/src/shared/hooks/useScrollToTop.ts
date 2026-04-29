import { useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

export const useScrollToTop = () => {
    const { pathname, hash } = useLocation();

    const handleScroll = useCallback(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }, []);

    useEffect(() => {
        if (!hash) {
            handleScroll();
        } else {
            const element = document.getElementById(hash.replace('#', ''));
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [pathname, hash, handleScroll]);

    return handleScroll;
};