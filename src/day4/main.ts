// puzzle input
const min = 248345
const max = 746315

export function countPasswords() {
    return [...generatePassword(
        0,
        parseInt(min.toString()[0]),
        parseInt(max.toString()[0]),
    )].length
}

function* generatePassword(input: number, min: number, max = 9)
    : Generator<number, any, undefined> {
    for (let i = min; i <= max; i++) {
        const next = input * 10 + i;
        if (next > 100000) {
            if (isValid(next)) { yield next; }
        }
        else { yield* [...generatePassword(next, i)]; }
    }
}

function isValid(input: number): boolean {
    return input > min
        && input < max
        && hasSequentialDigits(input)
}

function hasSequentialDigits(input: number): boolean {
    const digits = input.toString().split('');
    return new Set(digits).size < digits.length;
}
