import { Link } from 'react-router';
import { releases, concerts, merchItems } from '@shared/data/mockData';
import { Header } from '@/shared/assets/ui/Header';
import { Footer } from '@/shared/assets/ui/Footer';

export default function MainPage() {
  return (
    <div className="bg-[#0a0b0d] content-stretch flex flex-col items-center relative shadow-[0px_3px_6px_0px_rgba(18,15,40,0.12)] min-h-screen w-full">
      <Header />
      
      {/* Hero Section */}
      <div className="h-[732px] relative shrink-0 w-full">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-full left-0 max-w-none object-cover top-0 w-full" />
        </div>
        <div className="absolute flex flex-col items-center justify-center left-[80px] max-w-[579px] top-[228px]">
          <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full">
            <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
              <p className="font-['TT_Fors_Display_Trl:Bold',sans-serif] leading-[1.4] not-italic relative shrink-0 text-[#f2f2f2] text-[64px] uppercase">НОВЫЙ РЕЛИЗ</p>
              <p className="font-['TT_Fors_Trial:Regular',sans-serif] leading-[30px] not-italic relative shrink-0 text-[#f2f2f2] text-[18px]">
                Погрузитесь в мир звуков последнего альбома от ẃ1lq, где каждая композиция — это путешествие между тьмой и светом. Слушайте на всех платформах.
              </p>
            </div>
            <Link to="/music" className="bg-[#a33e44] hover:bg-[#8a3439] transition-colors content-stretch flex flex-col items-center justify-center overflow-clip px-[32px] py-[16px] relative rounded-[30px] shrink-0">
              <p className="font-['TT_Fors_Trial:Medium',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#f2f2f2] text-[16px] text-center">Слушать</p>
            </Link>
          </div>
        </div>

        {/* Music Player UI */}
        <div className="absolute bottom-[42px] left-[80px] right-[80px] bg-[#27292c]/80 backdrop-blur-sm rounded-[16px] p-[20px]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-[16px]">
              <img alt="Album cover" className="size-[60px] rounded-[8px]" />
              <div>
                <p className="font-['TT_Fors_Trial:Medium',sans-serif] text-[#f2f2f2] text-[14px]">BOUNDS OF SILENCE</p>
                <p className="font-['TT_Fors_Trial:Regular',sans-serif] text-[#9ca1a6] text-[12px]">ẃ1lq</p>
              </div>
            </div>
            <div className="flex items-center gap-[24px]">
              <button className="text-[#f2f2f2] hover:text-[#a33e44] transition-colors">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M4 3L16 10L4 17V3Z" />
                </svg>
              </button>
              <button className="text-[#f2f2f2] hover:text-[#a33e44] transition-colors">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <rect x="6" y="4" width="3" height="12" />
                  <rect x="11" y="4" width="3" height="12" />
                </svg>
              </button>
              <button className="text-[#f2f2f2] hover:text-[#a33e44] transition-colors">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M16 3L4 10L16 17V3Z" />
                </svg>
              </button>
            </div>
            <div className="flex-1 mx-[32px]">
              <div className="h-[4px] bg-[#4a4c50] rounded-full">
                <div className="h-full w-[40%] bg-[#a33e44] rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Releases Carousel */}
      <div className="bg-[#0a0b0d] h-[692px] relative shrink-0 w-full">
        <div className="flex flex-col items-center size-full">
          <div className="content-stretch flex flex-col gap-[56px] items-center px-[80px] py-[56px] relative size-full max-w-[1440px]">
            <div className="content-stretch flex items-center justify-between relative shrink-0 w-full max-w-[1280px]">
              <p className="font-['TT_Fors_Display_Trl:Bold',sans-serif] leading-[1.4] not-italic relative shrink-0 text-[#f2f2f2] text-[64px] text-center uppercase">НЕДАВНИЕ РЕЛИЗЫ</p>
              <Link to="/music" className="bg-[#a33e44] hover:bg-[#8a3439] transition-colors content-stretch flex flex-col items-center justify-center overflow-clip px-[32px] py-[16px] relative rounded-[30px] shrink-0">
                <p className="font-['TT_Fors_Trial:Medium',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#f2f2f2] text-[16px] text-center">Слушать все</p>
              </Link>
            </div>

            <div className="flex gap-[24px] overflow-x-auto w-full max-w-[1280px]">
              {releases.slice(0, 3).map(release => (
                <div key={release.id} className="min-w-[400px] group cursor-pointer">
                  <div className="relative rounded-[6px] overflow-hidden shadow-lg">
                    <img alt={release.title} className="w-full h-[260px] object-cover" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button className="bg-[#a33e44] rounded-full p-4">
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="white">
                          <path d="M10 8L24 16L10 24V8Z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Concerts */}
      <div className="bg-[#0a0b0d] relative shrink-0 w-full py-[56px]">
        <div className="flex flex-col items-center mx-auto max-w-[1440px] px-[80px]">
          <div className="content-stretch flex flex-col gap-[56px] items-start relative w-full max-w-[1280px]">
            <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
              <p className="font-['TT_Fors_Display_Trl:Bold',sans-serif] leading-[1.4] not-italic text-[#f2f2f2] text-[64px] uppercase">БЛИЖАЙШИЕ КОНЦЕРТЫ</p>
              <Link to="/concerts" className="bg-[#a33e44] hover:bg-[#8a3439] transition-colors content-stretch flex flex-col items-center justify-center overflow-clip px-[32px] py-[16px] relative rounded-[30px] shrink-0">
                <p className="font-['TT_Fors_Trial:Medium',sans-serif] leading-[22px] not-italic text-[#f2f2f2] text-[16px] text-center">Все концерты</p>
              </Link>
            </div>

            <div className="flex flex-col gap-[16px] w-full">
              {concerts.slice(0, 4).map(concert => (
                <div key={concert.id} className="bg-[#27292c] hover:bg-[#2f3135] transition-colors rounded-[12px] p-[24px] flex items-center justify-between">
                  <div className="flex flex-col gap-[8px]">
                    <p className="font-['TT_Fors_Trial:Bold',sans-serif] text-[#f2f2f2] text-[24px]">{concert.city} – {concert.venue}</p>
                    <p className="font-['TT_Fors_Trial:Regular',sans-serif] text-[#9ca1a6] text-[16px]">{new Date(concert.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                  </div>
                  <button className="bg-[#a33e44] hover:bg-[#8a3439] transition-colors px-[24px] py-[12px] rounded-[20px] font-['TT_Fors_Trial:Medium',sans-serif] text-[#f2f2f2] text-[14px]">
                    Билеты
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Exclusive Merch */}
      <div className="bg-[#0a0b0d] relative shrink-0 w-full py-[56px]">
        <div className="flex flex-col items-center mx-auto max-w-[1440px] px-[80px]">
          <div className="content-stretch flex flex-col gap-[56px] items-start relative w-full max-w-[1280px]">
            <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
              <p className="font-['TT_Fors_Display_Trl:Bold',sans-serif] leading-[1.4] not-italic text-[#f2f2f2] text-[64px] uppercase">ЭКСКЛЮЗИВНЫЙ МЕРЧ</p>
              <Link to="/merch" className="bg-[#a33e44] hover:bg-[#8a3439] transition-colors content-stretch flex flex-col items-center justify-center overflow-clip px-[32px] py-[16px] relative rounded-[30px] shrink-0">
                <p className="font-['TT_Fors_Trial:Medium',sans-serif] leading-[22px] not-italic text-[#f2f2f2] text-[16px] text-center">Весь мерч</p>
              </Link>
            </div>

            <div className="grid grid-cols-4 gap-[24px] w-full">
              {merchItems.slice(0, 4).map(item => (
                <Link key={item.id} to={`/merch/${item.id}`} className="group">
                  <div className="bg-[#27292c] rounded-[12px] overflow-hidden">
                    <div className="aspect-square bg-[#1a1b1e] flex items-center justify-center">
                      <img  alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-[16px]">
                      <p className="font-['TT_Fors_Trial:Bold',sans-serif] text-[#f2f2f2] text-[18px] mb-[8px]">{item.name}</p>
                      <div className="flex items-center justify-between">
                        <p className="font-['TT_Fors_Trial:Medium',sans-serif] text-[#a33e44] text-[20px]">${item.price}</p>
                        <button className="bg-[#a33e44] group-hover:bg-[#8a3439] transition-colors px-[16px] py-[8px] rounded-[20px] font-['TT_Fors_Trial:Medium',sans-serif] text-[#f2f2f2] text-[12px]">
                          Подробнее
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
