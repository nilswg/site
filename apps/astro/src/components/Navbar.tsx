'use client';

import type { FC, ReactNode } from 'react';
import { createContext, Fragment, memo, useCallback, useContext, useState } from 'react';
import { cn } from '@nilswg/utils';
import { t } from 'i18next';
import logo from 'public/nilswg-blue-noblack-opt.svg';
import { HiMenuAlt2, HiOutlineX } from 'react-icons/hi';
import { EnChButton } from './EnChButton';
import { $assets, Image } from './Image';
import { Link } from './Link';
import { SocialLinks } from './SocialLinks';

const assets = await $assets({
    logo: { src: logo, alt: 'nilswg logo', width: 128, height: 45 },
});

export const Navbar = () => {
    return (
        <Nav>
            <Nav.Horizontal>
                <Nav.HorizontalItems />
            </Nav.Horizontal>
            <Nav.Vertical>
                <Nav.VerticalItems />
                <Nav.SocialLinks />
            </Nav.Vertical>
        </Nav>
    );
};

type Props_NavContext = {
    isMenuOpen: boolean;
    switchMenuOpen: () => void;
};

const NavContext = createContext<Props_NavContext | null>(null);

const useNavContext = () => {
    const ctx = useContext(NavContext);
    if (!ctx) {
        throw new Error('useNavContext must be used within a NavProvider');
    }
    return ctx;
};

type NavCompoundComponent = FC<{ children: ReactNode }> & {
    Horizontal: FC<{ children: ReactNode }>;
    HorizontalItems: FC;
    Vertical: FC<{ children: ReactNode }>;
    VerticalItems: FC;
    MenuButton: FC;
    SocialLinks: FC;
};

export const Nav: NavCompoundComponent = ({ children }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const switchMenuOpen = useCallback(() => setIsMenuOpen((s) => !s), []);
    return (
        <header className="h-navbar bg-myblack fixed top-0 z-20 w-full border-b-[1px] border-b-gray-600 text-white md:flex md:items-center md:justify-between">
            <NavContext.Provider value={{ isMenuOpen, switchMenuOpen }}>{children}</NavContext.Provider>
        </header>
    );
};

Nav.Horizontal = ({ children }) => {
    return (
        <Fragment>
            <div className="bg-myblack flex h-full flex-row items-center justify-between px-4">
                <Link href="/" className="flex w-28 items-center md:w-32">
                    <Image {...assets.logo} />
                </Link>
                <Nav.MenuButton />
            </div>
            <nav className={`hidden md:flex md:h-auto md:w-auto md:flex-row`}>{children}</nav>
        </Fragment>
    );
};

Nav.HorizontalItems = memo(() => {
    return (
        <ul className="mr-5 flex flex-row items-center justify-center">
            {navItems.map((item, i) => (
                <HorizontalItem key={i}>
                    <Link key={i} href={item.href} className="font-russon text-lg">
                        {item.text}
                    </Link>
                </HorizontalItem>
            ))}
            <HorizontalItem>
                <EnChButton className="text-lg">
                    <EnChButton.CheckBox className="h-[16px] w-[32px] before:h-[16px] before:w-[16px]" />
                </EnChButton>
            </HorizontalItem>
        </ul>
    );
});

Nav.Vertical = ({ children }) => {
    const { isMenuOpen } = useNavContext();
    return (
        <nav
            className={`
          from-myblack flex h-[calc(100vh-var(--navbar-height))] w-full flex-col bg-gradient-to-b to-gray-700 transition-all duration-500 md:hidden
          ${isMenuOpen ? 'translate-x-0' : '-translate-x-[120vw] md:translate-x-0'}
        `}>
            {children}
        </nav>
    );
};

Nav.VerticalItems = memo(() => {
    return (
        <ul className="flex h-full flex-col items-center justify-center gap-3">
            {navItems.map((item, i) => (
                <VerticalItem key={i}>
                    <Link key={i} href={item.href} className="font-russon w-[12rem] px-2 py-2 text-justify text-3xl">
                        {item.text}
                    </Link>
                </VerticalItem>
            ))}
            <VerticalItem>
                <EnChButton className="text-3xl">
                    <EnChButton.CheckBox className="h-[2.5rem] w-[5rem] before:h-[2.5rem] before:w-[2.5rem]" />
                </EnChButton>
            </VerticalItem>
        </ul>
    );
});

Nav.MenuButton = () => {
    const { isMenuOpen, switchMenuOpen } = useNavContext();
    return (
        <button
            aria-label="menu button"
            className={cn('block md:hidden', 'align-top text-[2.75rem] transition-all md:text-[3rem]')}
            onClick={switchMenuOpen}>
            {isMenuOpen ? <HiOutlineX /> : <HiMenuAlt2 />}
        </button>
    );
};

Nav.SocialLinks = () => {
    return <SocialLinks className="mt-auto flex justify-center gap-5 py-2 pb-8" />;
};

const HorizontalItem = ({ children }: { children: ReactNode }) => {
    return <li className="group px-4 py-5 hover:rounded hover:bg-gray-800 hover:text-sky-400">{children}</li>;
};

const VerticalItem = ({ children }: { children: ReactNode }) => {
    const { switchMenuOpen } = useNavContext();
    return (
        <li className="flex w-full items-center justify-center py-2" onClick={switchMenuOpen}>
            {children}
        </li>
    );
};

const navItems = [
    { href: '/', text: t('nav.home') },
    { href: '/#projects', text: t('nav.projects') },
    { href: '/#contact', text: t('nav.contact') },
    { href: '/blog', text: t('nav.blog') },
];
