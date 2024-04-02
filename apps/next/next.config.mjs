// import { i18n } from './next-i18next.config.mjs'

/** @type {import('next').NextConfig} */
const nextConfig = {
    pageExtensions: allowDevPage(['mdx', 'md', 'jsx', 'js', 'tsx', 'ts'])
};

export default nextConfig;

function allowDevPage(config) {
    /**
     * 僅在 development 階段中使用；在 production 階段時，會被剔除掉。
     */
    if (process.env.NODE_ENV === 'production') {
        return config
    }

    /**
     * 建立新的擴展名規則，允許 [檔案名].dev.[擴展名]
     * 如 js -> [js, dev.js]； tsx -> [tsx, dev.tsx]
     */
    let res = []
    config.forEach((ext) => {
        res.push(ext)
        res.push(`dev.${ext}`)
    })

    return res
}
