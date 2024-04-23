import { getJobDate } from '@nilswg-site/ui/utils/getJobDate';

describe('Testing getJobDate', () => {
    test.each([undefined, null, [], {}, '', 1, true])('對於不合法的日期，應返回空字符串', (date) => {
        expect(getJobDate(date as any)).toBe('');
    });

    test.each([
        [[2020, 1], 'Jan 2020'],
        [[2020, 2], 'Feb 2020'],
        [[2020, 3], 'Mar 2020'],
        [[2020, 4], 'Apr 2020'],
        [[2020, 5], 'May 2020'],
        [[2020, 6], 'Jun 2020'],
        [[2020, 7], 'Jul 2020'],
        [[2020, 8], 'Aug 2020'],
        [[2020, 9], 'Sep 2020'],
        [[2020, 10], 'Oct 2020'],
        [[2020, 11], 'Nov 2020'],
        [[2020, 12], 'Dec 2020'],
    ])(`當語系是 en 時，應能正確回傳日期`, (date, expected) => {
        expect(getJobDate(date)).toBe(expected);
    });

    test.each([
        [[2020, 1], '一月 2020'],
        [[2020, 2], '二月 2020'],
        [[2020, 3], '三月 2020'],
        [[2020, 4], '四月 2020'],
        [[2020, 5], '五月 2020'],
        [[2020, 6], '六月 2020'],
        [[2020, 7], '七月 2020'],
        [[2020, 8], '八月 2020'],
        [[2020, 9], '九月 2020'],
        [[2020, 10], '十月 2020'],
        [[2020, 11], '十一月 2020'],
        [[2020, 12], '十二月 2020'],
    ])(`當語系是 ch 時，應能正確回傳日期`, (date, expected) => {
        expect(getJobDate(date, 'ch')).toBe(expected);
    });
});
