import clsx from 'clsx';
import type { SVGProps } from 'react';

interface BurgerMenuIconProps extends SVGProps<SVGSVGElement> {
    isOpen: boolean;
}

const BurgerMenuIcon = ({ className, isOpen, ...props }: BurgerMenuIconProps) => {
    return isOpen ? (
        <svg
            className={clsx(className, '')}
            width={18}
            height={24}
            viewBox="0 0 18 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path d="M1.09375 5L16.4062 19" stroke="#F2F2F2" />
            <path d="M1.28125 19.001L16.4063 5" stroke="#F2F2F2" />
        </svg>

    ) : (
        <svg
            className={clsx(className, '')}
            width={18}
            height={24}
            viewBox="0 0 18 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path d="M0.75 12H16.75" stroke="#F2F2F2" />
            <path d="M0.75 5H16.75" stroke="#F2F2F2" />
            <path d="M0.75 19H16.75" stroke="#F2F2F2" />
        </svg>

    );
};

export default BurgerMenuIcon;