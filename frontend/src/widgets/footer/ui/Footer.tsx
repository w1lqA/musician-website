import { Container } from '@/shared/ui/Container';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-primary-black-500 py-12 md:py-16">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-caption-regular text-primary-white-400">
          <p>© 2025 ẃ1lq. Все права защищены.</p>
          <p>Contact: info@artistname.com</p>
          </div>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-caption-regular text-primary-white-400 hover:text-accent-1 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-caption-regular text-primary-white-400 hover:text-accent-1 transition-colors">
              Terms of Use
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};