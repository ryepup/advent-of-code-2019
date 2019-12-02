import { calculateFuel, part1, part2 } from './day1'

describe('day1', () => {
    describe('part1', () => {

        const examples = [
            [12, 2],
            [14, 2],
            [1969, 654],
            [100756, 33583]
        ];

        for (const [mass, expected] of examples) {
            it(`gets the right answer for ${mass}`, () => {
                expect(calculateFuel(mass)).toBe(expected)
            })
        }

        it('gets the right answer', () => {
            expect(part1('./src/day1.txt')).toBe(3297909);
        })

    })

    describe('part2', () => {
        const examples = [
            [14, 2],
            [1969, 966],
            [100756, 50346]
        ];

        for (const [mass, expected] of examples) {
            it(`gets the right answer for ${mass}`, () => {
                expect(calculateFuel(mass, true)).toBe(expected)
            })
        }

        it('gets the right answer', () => {
            expect(part2('./src/day1.txt')).toBe(4943994);
        })


    })


})
