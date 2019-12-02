import fs from 'fs'

function loadModuleMasses(path: string): number[] {
    return fs.readFileSync(path, 'utf8')
        .split('\n')
        .filter(x => x)
        .map(x => parseInt(x))
}

/**
 *
 * Fuel required to launch a given module is based on its mass. Specifically, to
 * find the fuel required for a module, take its mass, divide by three, round
 * down, and subtract 2.
 *
 * @param mass
 */
export function calculateFuel(mass: number, withFuel = false): number {
    const fuelForModule = Math.floor(mass / 3.0) - 2;

    if (!withFuel) { return fuelForModule; }
    if (fuelForModule < 0) { return 0; }
    return fuelForModule + calculateFuel(fuelForModule, true);
}

export function part1(path: string): number {
    return loadModuleMasses(path)
        .map(x => calculateFuel(x))
        .reduce((a, b) => a + b);
}

export function part2(path: string): number {
    return loadModuleMasses(path)
        .map(x => calculateFuel(x, true))
        .reduce((a, b) => a + b);
}
