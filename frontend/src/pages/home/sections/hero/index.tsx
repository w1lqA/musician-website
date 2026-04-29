import { Button } from '@/shared/ui/Button'
import { Container } from '@/shared/ui/Container'
import heroImage from '@/imports/MainDark/27a4daf36bfdd614356b7a96d454d85a6cebbd87.png';

type Props = {
  className?: string
}

const HomeHero = ({ className }: Props) => {
    return (
        <div className={`${className} py-24 md:py-36`}>
        <Container>
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24">
            <div className="w-full md:w-[468px] space-y-8 text-center md:text-left">
              <h2 className="text-h1-display-bold text-primary-white-600 uppercase">
                Новый релиз
              </h2>
              <p className="text-title2-regular text-primary-white-500">
                Погрузитесь в мир нашего последнего релиза! Вас ждет путешествие сквозь ритм и эмоции.
              </p>
              <Button size="small" variant='primary' className="w-full md:w-auto">
                Слушать
              </Button>
            </div>

            <div className="relative w-full md:w-[710px] h-96 md:h-[549px] bg-primary-black-500 overflow-hidden flex items-center justify-center">
              <img
                src={heroImage}
                alt="New Release"
                className="absolute w-full h-full object-cover transform rotate-180 scale-y-[-1]"
              />
              <button className="relative z-10 w-24 h-24 rounded-full bg-accent-1 flex items-center justify-center transition-opacity hover:opacity-90">
                <svg className="w-8 h-9 ml-2" viewBox="0 0 32 37" fill="none">
                  <path d="M0 36.75L32.1562 18.375L0 0V36.75Z" fill="#F2F2F2" />
                </svg>
              </button>
            </div>
          </div>
        </Container>
        </div>
    )
}

export default HomeHero