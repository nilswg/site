'use client';

import type { FC } from 'react';
import { useMemo } from 'react';
import { Nav } from '@nilswg-site/ui';
import { useTranslation } from 'next-i18next';
import logo from 'public/nilswg-blue-noblack-min.svg';
import Image from 'next/image';

export const Navbar: FC = () => {
    const { t, i18n } = useTranslation();
    const props = useMemo(
        () => ({
            lang: i18n.language,
            navItems: [
                { href: '/', text: t('common:nav.home') },
                { href: '/#projects', text: t('common:nav.projects') },
                { href: '/#contact', text: t('common:nav.contact') },
                { href: '/blog', text: t('common:nav.blog') },
            ],
        }),
        [i18n.language],
    );
    return (
        <Nav>
            <Nav.Horizontal
                logo={<Image src={logo} alt="nilswg logo" priority />} //
                button={<Nav.MenuButton />}
                items={<Nav.HorizontalItems {...props} useDefault/>}
            />
            <Nav.Vertical>
                <Nav.VerticalItems {...props} useDefault/>
                <Nav.SocialLinks />
            </Nav.Vertical>
        </Nav>
    );
};
