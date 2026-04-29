import clsx from 'clsx';
import type { SVGProps } from 'react';

const ArrowIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => {
    return (
        <svg
            className={clsx(className, '')}
            width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props} stroke="currentColor"
        >

            <path d="M9 18L15 12L9 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
};

export default ArrowIcon;