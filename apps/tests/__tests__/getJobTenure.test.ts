import { getJobTenure } from '@nilswg-site/ui/utils/getJobTenure';

describe('Testing getJobTenure', () => {
    test.each([
        [undefined, [2020, 1]],
        [null, [2020, 1]],
        [[], [2020, 1]],
        [{}, [2020, 1]],
        ['', [2020, 1]],
        [1, [2020, 1]],
        [true, [2020, 1]],
    ])('對於不合法的日期，應返回空字符串', (start, end) => {
        expect(getJobTenure(start as any, end as any)).toBe('');
    });

    test.each([
        [[2020, 1], [2020, 1], '1 month'],
        [[2020, 1], [2020, 2], '2 months'],
        [[2020, 2], [2020, 3], '2 months'],
        [[2020, 3], [2020, 4], '2 months'],
        [[2020, 1], [2020, 4], '4 months'],
        [[2020, 2], [2020, 5], '4 months'],
        [[2020, 3], [2020, 6], '4 months'],
        [[2020, 1], [2020, 11], '11 months'],
        [[2020, 1], [2020, 12], '1 year'],
        [[2020, 1], [2021, 1], '1 year and 1 month'],
        [[2020, 1], [2021, 2], '1 year and 2 months'],
        [[2019, 10], [2021, 3], '1 year and 6 months'],
        [[2021, 12], [2022, 9], '10 months'],
    ])('當語系是 en 時，應能正確回傳日期', (start, end, expected) => {
        expect(getJobTenure(start, end, 'en')).toBe(expected);
    });

    test.each([
        [[2020, 1], [2020, 1], '1 個月'],
        [[2020, 1], [2020, 2], '2 個月'],
        [[2020, 2], [2020, 3], '2 個月'],
        [[2020, 3], [2020, 4], '2 個月'],
        [[2020, 1], [2020, 4], '4 個月'],
        [[2020, 2], [2020, 5], '4 個月'],
        [[2020, 3], [2020, 6], '4 個月'],
        [[2020, 1], [2020, 11], '11 個月'],
        [[2020, 1], [2020, 12], '1 年'],
        [[2020, 1], [2021, 1], '1 年 1 個月'],
        [[2020, 1], [2021, 2], '1 年 2 個月'],
        [[2019, 10], [2021, 3], '1 年 6 個月'],
        [[2021, 12], [2022, 9], '10 個月'],
    ])(`當語系是 ch 時，應能正確回傳日期`, (start, end, expected) => {
        expect(getJobTenure(start, end, 'ch')).toBe(expected);
    });
});
