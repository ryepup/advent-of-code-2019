import { part1, part2, intersects, LineDirection, parsePaths } from './main'

describe('day3', () => {
    describe('intersects', () => {
        it('handles negative numbers', () => {
            const a = {
                dir: LineDirection.Vertical,
                p1: { x: -1932, y: 2301, step: 0 },
                p2: { x: -1932, y: 3105, step: 0 }
            }
            const b = {
                dir: LineDirection.Horizontal,
                p1: { x: -2093, y: 3049, step: 0 },
                p2: { x: -1251, y: 3049, step: 0 }
            }
            expect(intersects(a, b)).toBe(true);
        })
    })
    describe('part1', () => {

        const examples = [
            {
                a: 'R75,D30,R83,U83,L12,D49,R71,U7,L72',
                b: 'U62,R66,U55,R34,D71,R55,D58,R83',
                expected: 159
            },
            {
                a: 'R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51',
                b: 'U98,R91,D20,R16,D67,R40,U7,R15,U6,R7',
                expected: 135
            }
        ]
        for (const { a, b, expected } of examples) {
            it(`calculates the right distance for ${a}, ${b}`, () => {
                const actual = part1(a, b)
                expect(actual).toBe(expected);
            })
        }

        it('finds the answer', () => {
            const [path1, path2] = parsePaths('./src/day3/input.txt');
            expect(part1(path1, path2)).toBe(4981)
            // asSvg('./src/day3/map.svg', path1, path2)
        })
    })

    describe('part2', () => {
        const examples = [
            {
                a: 'R75,D30,R83,U83,L12,D49,R71,U7,L72',
                b: 'U62,R66,U55,R34,D71,R55,D58,R83',
                expected: 610
            },
            {
                a: 'R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51',
                b: 'U98,R91,D20,R16,D67,R40,U7,R15,U6,R7',
                expected: 410
            }
        ]
        for (const { a, b, expected } of examples) {
            it(`calculates the right steps for ${a}, ${b}`, () => {
                const actual = part2(a, b)
                expect(actual).toBe(expected);
            })
        }

        it('finds the answer', () => {
            const [path1, path2] = parsePaths('./src/day3/input.txt');
            expect(part2(path1, path2)).toBe(164012)
        })
    })
})
