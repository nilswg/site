import { SocialLinks } from '@nilswg-site/ui';
import logo from '../../public/nilswg-blue-noblack-min.svg';
import { Image } from './Image';

export const Footer = () => (
    <footer className="h-footer flex flex-col items-center justify-center gap-6 text-white">
        <Image src={logo} alt="nilson weng logo for footer" height={64} />
        <SocialLinks className="flex flex-row gap-4 text-4xl" />
        <p className="font-zhtw text-sm tracking-wide text-gray-400">
            © <span className="text-sky-500">Nilson Weng</span> | All rights reserved 2023.
        </p>
    </footer>
);
