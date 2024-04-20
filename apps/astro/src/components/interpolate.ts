/**
 * Adapted from astro-i18next/src/utils.ts
 *
 * @see https://github.com/yassinedoghri/astro-i18next/blob/beta/src/utils.ts
 */

/**
 * Interpolates a localized string (loaded with the i18nKey) to a given reference string.
 */
export const interpolate = (localizedString: string, referenceString: string): string => {
    const tagsRegex = /<([\w\d]+)([^>]*)>/gi;
    const referenceStringMatches = referenceString.match(tagsRegex);

    if (!referenceStringMatches) {
        console.warn(
            'WARNING(astro-i18next): default slot does not include any HTML tag to interpolate! You should use the `t` function directly.',
        );
        return localizedString;
    }

    const referenceTags = [] as { name: string; attributes: string }[];
    referenceStringMatches.forEach((tagNode) => {
        const [, name, attributes] = tagsRegex.exec(tagNode) as RegExpExecArray;
        referenceTags.push({ name, attributes });

        // reset regex state
        tagsRegex.exec('');
    });

    let interpolatedString = localizedString;
    for (let index = 0; index < referenceTags.length; index++) {
        const referencedTag = referenceTags[index];
        // Replace opening tags
        interpolatedString = interpolatedString.replaceAll(`<${referencedTag.name}>`, `<${referencedTag.name}${referencedTag.attributes}>`);
        // Replace closing tags
        interpolatedString = interpolatedString.replaceAll(`</${referencedTag.name}>`, `</${referencedTag.name}>`);
    }

    return interpolatedString;
};
