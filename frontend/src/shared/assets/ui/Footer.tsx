function SpotifyFillSvgrepoCom() {
  return (
    <div className="relative shrink-0 size-[36px]" data-name="spotify-fill-svgrepo-com 1">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36 36">
        <g id="spotify-fill-svgrepo-com 1">
        </g>
      </svg>
    </div>
  );
}

function TiktokFillSvgrepoCom() {
  return (
    <div className="relative shrink-0 size-[36px]" data-name="tiktok-fill-svgrepo-com 1">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36 36">
        <g id="tiktok-fill-svgrepo-com 1">
        </g>
      </svg>
    </div>
  );
}

function InstagramIcon() {
  return (
    <div className="overflow-clip relative shrink-0 size-[36px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36 36">
        <g id="social-instagram">
        </g>
      </svg>
    </div>
  );
}

function YoutubeIcon() {
  return (
    <div className="overflow-clip relative shrink-0 size-[36px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36 36">
        <g id="Group">
        </g>
      </svg>
    </div>
  );
}

function YandexMusicIcon() {
  return (
    <div className="relative shrink-0 size-[36px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36 36">
        <g clipPath="url(#clip0_1_3110)">
        </g>
        <defs>
          <clipPath id="clip0_1_3110">
            <rect fill="white" height="36" width="36" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function ArrowRight() {
  return (
    <div className="overflow-clip relative shrink-0 size-[14px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g>
        </g>
      </svg>
    </div>
  );
}

function ArrowUpIcon() {
  return (
    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.8485 13.3485">
    </svg>
  );
}

export function SocialContainer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full">
      <div className="bg-[#27292c] content-stretch flex h-[120px] items-center justify-between py-[60px] relative shrink-0 w-full">
        <div className="content-stretch flex items-center justify-between max-w-[1280px] mx-auto w-full px-[80px]">
          <div className="flex flex-col font-['TT_Fors_Display_Trl:Bold',sans-serif] h-[41px] justify-center leading-[0] not-italic relative shrink-0 text-[#f2f2f2] text-[48px] uppercase">
            <p className="leading-[1.4] whitespace-pre-wrap">СОЦСЕТИ</p>
          </div>
          <div className="content-stretch flex items-center gap-4">
            <a href="https://spotify.com" target="_blank" rel="noopener noreferrer" className="bg-[#a33e44] hover:bg-[#8a3439] transition-colors content-stretch flex flex-col items-center justify-center overflow-clip px-[9px] py-[10px] relative rounded-[28px] shrink-0">
              <SpotifyFillSvgrepoCom />
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="bg-[#a33e44] hover:bg-[#8a3439] transition-colors content-stretch flex flex-col items-center justify-center overflow-clip px-[9px] py-[10px] relative rounded-[28px] shrink-0">
              <TiktokFillSvgrepoCom />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="bg-[#a33e44] hover:bg-[#8a3439] transition-colors content-stretch flex flex-col items-center justify-center overflow-clip px-[9px] py-[10px] relative rounded-[28px] shrink-0">
              <InstagramIcon />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="bg-[#a33e44] hover:bg-[#8a3439] transition-colors content-stretch flex flex-col items-center justify-center overflow-clip px-[9px] py-[10px] relative rounded-[28px] shrink-0">
              <YoutubeIcon />
            </a>
            <a href="https://music.yandex.ru" target="_blank" rel="noopener noreferrer" className="bg-[#a33e44] hover:bg-[#8a3439] transition-colors content-stretch flex flex-col items-center justify-center overflow-clip p-[10px] relative rounded-[28px] shrink-0">
              <YandexMusicIcon />
            </a>
          </div>
        </div>
      </div>

      <div className="bg-[#0a0b0d] h-[432px] relative shrink-0 w-full">
        <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex flex-col items-center justify-center px-[405px] py-[119px] relative size-full">
            <div className="content-stretch flex flex-col h-[194px] items-center justify-between relative shrink-0 w-[630px]">
              <p className="font-['TT_Fors_Trial:Bold',sans-serif] leading-[40px] not-italic relative shrink-0 text-[#f2f2f2] text-[36px] text-center">ОСТАВАЙТЕСЬ НА СВЯЗИ</p>
              <p className="font-['TT_Fors_Trial_Variable:Regular',sans-serif] font-normal leading-[28px] not-italic relative shrink-0 text-[#e1e2e3] text-[18px] text-center w-[606px] whitespace-pre-wrap">Подпишитесь на нашу рассылку новостей, чтобы получать эксклюзивные обновления, ранний доступ к музыке и анонсы туров.</p>
              
              <div className="content-stretch flex items-center justify-between relative shrink-0 w-[466px]">
                <div className="bg-[#27292c] h-[39px] relative rounded-[20px] shrink-0 w-[222px]">
                  <div aria-hidden="true" className="absolute border border-[#e1e2e3] border-solid inset-[-0.5px] pointer-events-none rounded-[20.5px]" />
                  <input 
                    type="email" 
                    placeholder="Email"
                    className="absolute font-['TT_Fors_Trial_Variable:Regular',sans-serif] font-normal leading-[22px] left-[16px] not-italic text-[#9ca1a6] text-[14px] top-[calc(50%-11px)] w-[190px] bg-transparent border-none outline-none placeholder:text-[#9ca1a6]"
                  />
                </div>
                
                <button className="bg-[#a33e44] hover:bg-[#8a3439] transition-colors content-stretch flex items-center justify-between overflow-clip px-[29px] py-[9px] relative rounded-[20px] shrink-0 w-[221px]">
                  <span className="font-['Outfit:Medium',sans-serif] font-medium leading-[22px] relative shrink-0 text-[#f2f2f2] text-[14px] text-center">Подписаться</span>
                  <ArrowRight />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div aria-hidden="true" className="absolute border-0 border-[#27292c] border-solid inset-0 pointer-events-none" />
      </div>
    </div>
  );
}

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-[#27292c] h-[120px] relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-0 border-[#f3f4f6] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[80px] relative size-full max-w-[1440px] mx-auto">
          <div className="content-stretch flex flex-[1_0_0] items-center justify-between min-h-px min-w-px relative max-w-[1280px]">
            <div className="font-['TT_Fors_Trial_Variable:Regular',sans-serif] font-normal h-[40px] leading-[20px] not-italic relative shrink-0 text-[#f2f2f2] text-[14px] w-[253px]">
              <p>© 2025 ẃ1lq. Все права защищены.</p>
              <p>Contact: info@artistname.com</p>
            </div>
            
            <button 
              onClick={scrollToTop}
              className="bg-[#a33e44] hover:bg-[#8a3439] transition-colors overflow-clip relative rounded-[1000px] shrink-0 size-[40px] flex items-center justify-center"
            >
              <div className="size-[25px] overflow-clip">
                <ArrowUpIcon />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
