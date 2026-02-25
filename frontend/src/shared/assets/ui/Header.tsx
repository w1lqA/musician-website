import { Link } from 'react-router';

function Logo() {
  return (
    <Link to="/" className="relative shrink-0 size-[60px]" data-name="Logo">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 60 60">
        <g id="Logo">
          <g id="Frame 369">
          </g>
        </g>
      </svg>
    </Link>
  );
}

export function Header() {
  return (
    <div className="bg-[#27292c] h-[120px] relative shrink-0 w-full" data-name="Header">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[80px] py-[20px] relative size-full max-w-[1440px] mx-auto">
          <div className="content-stretch flex items-center justify-between relative shrink-0 w-full max-w-[1280px]">
            <Logo />
            <nav className="content-stretch flex items-center justify-between relative shrink-0 gap-8">
              <Link to="/" className="font-['TT_Fors_Trial:Regular',sans-serif] leading-[1.4] not-italic text-[#f2f2f2] text-[18px] hover:text-[#a33e44] transition-colors">
                ГЛАВНАЯ
              </Link>
              <Link to="/music" className="font-['TT_Fors_Trial:Regular',sans-serif] leading-[1.4] not-italic text-[#f2f2f2] text-[18px] hover:text-[#a33e44] transition-colors">
                МУЗЫКА
              </Link>
              <Link to="/concerts" className="font-['TT_Fors_Trial:Regular',sans-serif] leading-[1.4] not-italic text-[#f2f2f2] text-[18px] hover:text-[#a33e44] transition-colors">
                КОНЦЕРТЫ
              </Link>
              <Link to="/merch" className="font-['TT_Fors_Trial:Regular',sans-serif] leading-[1.4] not-italic text-[#f2f2f2] text-[18px] hover:text-[#a33e44] transition-colors">
                МЕРЧ
              </Link>
              <Link to="/cart" className="font-['TT_Fors_Trial:Regular',sans-serif] leading-[1.4] not-italic text-[#f2f2f2] text-[18px] hover:text-[#a33e44] transition-colors relative">
                КОРЗИНА
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
