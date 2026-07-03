import './globals.css';
import NavigationBar from '../components/Navigation/NavigationBar';
import BackButton from '../components/Navigation/BackButton';
import { IntroProvider } from '../context/IntroContext';

export const metadata = {
  title: 'Formula 1 | The Pinnacle of Motorsport',
  description: 'An ultra-premium, cinematic Formula 1 web ecosystem.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <IntroProvider>
          <NavigationBar />
          <BackButton />
          {children}
        </IntroProvider>
      </body>
    </html>
  );
}
