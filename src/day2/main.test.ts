import { run, readTape, patch1202 } from './main'

describe('day2', () => {
    const examples = [
        [[1, 0, 0, 0, 99], [2, 0, 0, 0, 99]],
        [[2, 3, 0, 3, 99], [2, 3, 0, 6, 99]],
        [[2, 4, 4, 5, 99, 0], [2, 4, 4, 5, 99, 9801]],
        [[1, 1, 1, 4, 99, 5, 6, 0, 99], [30, 1, 1, 4, 2, 5, 6, 0, 99]]
    ]

    for (const [input, expected] of examples) {
        it(`iterprets the test program ${input}`, () => {
            const result = run(input);

            expect(result).toEqual(expected)
        })
    }

    it('finds the answer', () => {
        const ram = readTape('./src/day2/input.txt');

        const result = run(patch1202(ram))
        expect(result[0]).toBe(0);
    })
})
