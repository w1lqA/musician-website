import clsx from 'clsx';
import type { SVGProps } from 'react';

const Logo = ({ className, ...props }: SVGProps<SVGSVGElement>) => {
    return (
        <svg
            className={clsx(className, '')}
            width={36} height={57} viewBox="0 0 36 57" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
              <path
                d="M25.3064 31.9167V23.1306L10.6906 37.6157V37.6189L0 48.2108V57L10.6906 46.4049L25.3064 31.9167Z"
                fill="currentColor"
              />
              <path
                d="M25.3064 0L0 25.0833V35.744L25.3064 10.6638V0Z"
                fill="currentColor"
              />
              <path
                d="M10.6914 26.6458V35.7412V35.7443L25.3071 21.2623L36.0009 10.6641V1.5625L25.3071 12.1607L10.6914 26.6458Z"
                fill="currentColor"
              />
              <path
                d="M36.0009 22.8184L25.3071 33.4169L10.6914 47.8986V57.0002L36.0009 31.9168V22.8184Z"
                fill="currentColor"
              />
            </svg>
    );
};

export default Logo;