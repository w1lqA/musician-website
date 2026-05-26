import ArrowRightIcon from '@/shared/assets/icons/ArrowRightIcon';
import { useScrollToTop } from '@/shared/hooks/useScrollToTop';
import { Button } from '@/shared/ui/Button';
import { Container } from '@/shared/ui/Container';

export const Footer = () => {

  const scrollToTop = useScrollToTop()

  return (
    <footer className="bg-primary-black-500 py-8 mt-auto tablet:py-10">
      <Container>
        <div className="flex flex-col tablet:flex-row justify-between items-center gap-6">
          <div className="text-caption-regular text-primary-white-400">
            <p>© 2025 ẃ1lq. Все права защищены.</p>
            <p>Contact: info@artistname.com</p>
          </div>
          <div className="flex gap-6">
            <Button
              onClick={scrollToTop}
              className="rounded-full flex items-center justify-center p-0! h-10 w-10"
              hoverVariant='primaryWhiteBorder'
            >
              <ArrowRightIcon className='-rotate-90 w-5 h-5' />
            </Button>
          </div>
        </div>
      </Container>

    </footer>
  );
};