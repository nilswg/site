import { memo, type FCX } from 'react';
import { cn } from '@nilswg/utils';
import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai';
import { Link } from './Link';

/**
 * "NavBar"與"首頁Opening區段"使用的社交連結(Social Links)
 * "NavBar"開啟Menu面板為水平排列靠下；"首頁Opening區段"是重直排列靠最右
 */
export const SocialLinks: FCX = memo(({ className }) => {
    return (
        <ul className={cn('text-5xl text-white', className)}>
            {myLinks.map((item) => (
                <li key={`mylink_${item.name}`} data-cy={item.name}>
                    <Link href={item.href}>
                        <item.Icon />
                    </Link>
                </li>
            ))}
        </ul>
    );
});

const myLinks = [
    {
        name: 'LinkedIn',
        href: 'https://www.linkedin.com/in/nilson-weng-470672218/',
        Icon: AiFillLinkedin,
    },
    { name: 'Github', href: 'https://github.com/nilswg', Icon: AiFillGithub },
];
