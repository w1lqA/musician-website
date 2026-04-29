import clsx from 'clsx';
import type { SVGProps } from 'react';

const ArrowRightIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => {
    return (
        <svg
            className={clsx(className, '')}
            width={14} height={14} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M11.0594 6.41992C11.3797 6.41992 11.6394 6.67959 11.6394 6.99992C11.6394 7.32026 11.3797 7.57992 11.0594 7.57992L2.93937 7.57992C2.61905 7.57992 2.35937 7.32026 2.35937 6.99992C2.35938 6.67959 2.61905 6.41992 2.93937 6.41992L11.0594 6.41992Z" fill="currentColor" />
            <path d="M6.59955 2.53014C6.81189 2.31779 7.14771 2.30469 7.37554 2.49049L7.41973 2.53014L11.4797 6.59016C11.7062 6.81665 11.7062 7.18379 11.4797 7.41028L7.41973 11.4703C7.19324 11.6968 6.82604 11.6968 6.59955 11.4703C6.37306 11.2438 6.37306 10.8766 6.59955 10.6502L10.2495 7.00022L6.59955 3.35029L6.55994 3.30611C6.37411 3.07831 6.38722 2.74249 6.59955 2.53014Z" fill="currentColor" />
        </svg>
    );
};

export default ArrowRightIcon;