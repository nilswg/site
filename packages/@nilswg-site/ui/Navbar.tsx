'use client';

import type { FC, ReactNode } from 'react';
import { Fragment, memo } from 'react';
import { useStore } from '@nanostores/react';
import { cn } from '@nilswg/utils';
import { atom } from 'nanostores';
import { HiMenuAlt2, HiOutlineX } from 'react-icons/hi';
import { EnChButton } from './EnChButton';
import { Link } from './Link';
import { SocialLinks } from './SocialLinks';

export type NavItem = {
    href: string;
    text: string;
};

const $isMenuOpen = atom(false);

const useNavContext = () => {
    const isMenuOpen = useStore($isMenuOpen); //
    return {
        isMenuOpen: () => isMenuOpen,
        switchMenuOpen: () => $isMenuOpen.set(!isMenuOpen),
    };
};

type NavCompoundComponent = FC<{ children: ReactNode }> & {
    Horizontal: FC<{ logo: ReactNode; button: ReactNode; items: ReactNode }>;
    HorizontalItems: FC<{ lang: string; navItems: NavItem[]; useDefault?:boolean }>;
    Vertical: FC<{ children: ReactNode }>;
    VerticalItems: FC<{ lang: string; navItems: NavItem[]; useDefault?:boolean }>;
    MenuButton: FC;
    SocialLinks: FC;
};

export const Nav: NavCompoundComponent = ({ children }) => {
    return (
        <header className="h-navbar bg-myblack fixed top-0 z-20 w-full justify-between border-b-[1px] border-b-gray-600 text-white md:flex md:items-center">
            {children}
        </header>
    );
};

Nav.Horizontal = ({ logo, button, items }) => {
    return (
        <Fragment>
            <div className="bg-myblack flex h-full flex-row items-center justify-between px-4">
                <Link href="/" className="flex w-28 items-center md:w-32">
                    {logo}
                </Link>
                {button}
            </div>
            <nav className={`hidden md:flex md:h-auto md:w-auto md:flex-row`}>{items}</nav>
        </Fragment>
    );
};

Nav.HorizontalItems = memo(({ lang, navItems, useDefault=false }) => {
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
                <EnChButton lang={lang} className="text-lg">
                    <EnChButton.CheckBox lang={lang} useDefault={useDefault} className=""/>
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
          ${isMenuOpen() ? 'translate-x-0' : '-translate-x-[120vw] md:translate-x-0'}
        `}>
            {children}
        </nav>
    );
};

Nav.VerticalItems = memo(({ lang, navItems, useDefault=false }) => {
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
                <EnChButton lang={lang} className="text-3xl">
                    <EnChButton.CheckBox lang={lang} useDefault={useDefault} className="h-[2.5rem] w-[5rem] before:h-[2.5rem] before:w-[2.5rem]" />
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
            {isMenuOpen() ? <HiOutlineX /> : <HiMenuAlt2 />}
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
