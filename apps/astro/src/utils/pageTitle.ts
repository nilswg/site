/**
 * 透過 pathname 取得對應的網站 title
 * 
 * @example 
 * ```
 *  const pageName = getParsedPathName(pathname);
 *  const title = `Nilswg | ${pageName}`; // Home
 * ```
 * 
 * 
 * @param pathname 
 * @returns 
 */
export const $pageTitle = (pathname: string) => {
    let res = '';
    if (pathname === '/') {
        return 'Home';
    } else {
        let paths = pathname.split('/');
        // res = JSON.stringify(paths)
        res += getFirstCharUpperCase(paths[1]);

        for (let i = 2; i < paths.length; i++) {
            res += ` : ${paths[i]}`;
        }
    }
    return res;
};

const getFirstCharUpperCase = (s: string) => {
    return s.charAt(0).toUpperCase() + s.slice(1);
};
