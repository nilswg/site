import { $args } from './args';

type Config = {
    mode: 'DEV' | 'PROD';
    apiUrl: string;
};

const _config = (function () {
    const args = $args();
    return {
        DEV: {
            ...args,
            apiUrl: 'http://localhost:5000/api',
        },
        PROD: {
            ...args,
            apiUrl: 'https://example.com.tw/api',
        },
    }[args.mode] as Config;
})();

export const $config = () => _config;
