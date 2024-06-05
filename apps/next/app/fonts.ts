import { La_Belle_Aurore, Noto_Sans_TC, Orbitron, Outfit, Play, Roboto, Roboto_Condensed, Russo_One } from 'next/font/google';

const belle = La_Belle_Aurore({ weight: '400', variable: '--font-belle', subsets: ['latin'], display: 'swap' });
const russon = Russo_One({ weight: '400', variable: '--font-russon', subsets: ['latin'], display: 'swap' });
const orbitron = Orbitron({ weight: '400', variable: '--font-orbitron', subsets: ['latin'], display: 'swap' });
const play = Play({ weight: '400', variable: '--font-play', subsets: ['latin'], display: 'swap' });
const outfit = Outfit({ weight: '400', variable: '--font-outfit', subsets: ['latin'], display: 'swap' });
const roboto = Roboto({ weight: '400', variable: '--font-roboto', subsets: ['latin'], display: 'swap' });
const robotoCondensed = Roboto_Condensed({ weight: '400', variable: '--font-roboto-condensed', subsets: ['latin'], display: 'swap' });
const notoSansTC = Noto_Sans_TC({ weight: ['400', '700'], variable: '--font-notosans-tc', subsets: ['latin'], display: 'swap' });

export const fontVariables = [belle, russon, orbitron, play, outfit, notoSansTC, roboto, robotoCondensed].map((x) => x.variable).join(' ');
