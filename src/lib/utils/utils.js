export const palette = [
    {
        name: 'red',
        color: 'var(--color-palette-red)',
        text: '#222',
        border: '#222'
    },
    {
        name: 'blue',
        color: 'var(--color-palette-blue)',
        text: '#fff',
        border: '#222'
    },
    {
        name: 'yellow',
        color: 'var(--color-palette-yellow)',
        text: '#222',
        border: '#222'
    },
    {
        name: 'orange',
        color: 'var(--color-palette-orange)',
        text: '#222',
        border: '#222'
    },
    {
        name: 'cream',
        color: 'var(--color-palette-cream)',
        text: '#222',
        border: '#222'
    }
]

export const aspectRatio = 435 / 500;

export const cardLayouts = ["regular", "regular-text", 'swoosh', 'journal', 'ticket']

function mulberry32(seed) {
    return function () {
        let t = seed += 0x6D2B79F5;
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

function hashString(str) {
    let h = 0;
    for (let i = 0; i < str.length; i++) {
        h = Math.imul(31, h) + str.charCodeAt(i);
    }
    return h >>> 0;
}

export function dailyRandom(date, key) {
    const baseSeed = new Date(date).getTime() / (1000 * 60 * 60 * 24);
    const seed = baseSeed + hashString(key);
    return +mulberry32(seed)().toFixed(4);
}

export function weightedChoice(date, key, options) {
    const r = dailyRandom(date, key);
    let acc = 0;

    for (const option of options) {
        acc += option.weight;
        if (r < acc) return option.value;
    }

    // Fallback if weights don't sum to 1
    return options[options.length - 1].value;
}