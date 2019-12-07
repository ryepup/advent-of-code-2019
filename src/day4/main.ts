// puzzle input
const min = 248345
const max = 746315

export function countPasswords(predicate: ((input: number) => boolean)) {
    return [...generatePassword(
        predicate,
        0,
        parseInt(min.toString()[0]),
        parseInt(max.toString()[0])
    )].length
}

function* generatePassword(predicate: ((input: number) => boolean), input: number, min: number, max = 9)
    : Generator<number, any, undefined> {
    for (let i = min; i <= max; i++) {
        const next = input * 10 + i;
        if (next > 100000) {
            if (isValid(next) && predicate(next)) { yield next; }
        }
        else { yield* [...generatePassword(predicate, next, i)]; }
    }
}

function isValid(input: number): boolean {
    return input > min
        && input < max
}

export function hasSequentialDigits(input: number): boolean {
    const digits = input.toString().split('');
    return new Set(digits).size < digits.length;
}


export function hasTwoSequentialDigits(input: number): boolean {
    const digits = input.toString().split('');
    const counts = digits.reduce((map, d) => {
        const n = 1 + (map.get(d) || 0);
        return map.set(d, n);
    }, new Map<string, number>())
    return [...counts.values()]
        .includes(2);
}
