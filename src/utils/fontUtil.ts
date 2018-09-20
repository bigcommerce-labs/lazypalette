export function parseFont(font: string) {
    const provider = font.split('_')[0];
    switch (provider) {
        case 'Google':
            return parseGoogleFont(font);
        default:
            return null;
    }
}

function parseGoogleFont(font: string) {
    const split = font.split('_');
    const family = split[1];
    let formattedFont = '';
    let weight = split[2];

    if (split.length === 2) {
        formattedFont += `${family}|`;
    } else if (split.length > 2) {
        weight = weight.split(',')[0];
        formattedFont += `${family}:${weight}|`;
    }

    return `//fonts.googleapis.com/css?family=${formattedFont}`;
}
