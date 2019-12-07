import { countPasswords, hasSequentialDigits, hasTwoSequentialDigits } from './main'
describe('day4', () => {
    describe('part1', () => {
        expect(countPasswords(hasSequentialDigits)).toBe(1019);
    })

    describe('part2', () => {
        expect(countPasswords(hasTwoSequentialDigits)).toBe(660);
    })
})
