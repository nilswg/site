import moment from 'moment';

const chMonthssDict = {
    '01': '一',
    '02': '二',
    '03': '三',
    '04': '四',
    '05': '五',
    '06': '六',
    '07': '七',
    '08': '八',
    '09': '九',
    '10': '十',
    '11': '十一',
    '12': '十二',
} as Record<string, string>;

/**
 * 範例:
 *
 * [2019, 8] -> Oct 2019
 */
export const getJobDate = (date: number[] = [], lang: string = 'en') => {
    if (!date?.length) return '';
    if (lang !== 'en') {
        const m = moment(date, 'YYYY-MM');
        const yy = m.format('YYYY');
        const mm = m.format('MM');
        return `${chMonthssDict[mm]}月 ${yy}`;
    } else {
        const m = moment(date, 'YYYY-MM');
        const yy = m.format('YYYY');
        const mm = m.format('MMMM').substring(0, 3);
        return `${mm} ${yy}`;
    }
};
