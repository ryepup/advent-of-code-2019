import fs from 'fs'

interface Point {
    x: number,
    y: number
}
interface Line {
    p1: Point,
    p2: Point,
    dir: LineDirection
}
type Path = Line[]

export enum LineDirection { Vertical, Horizontal }

function parsePath(path: string): Path {
    const origin = { x: 0, y: 0 }
    return path.split(',')
        .map(parseMove)
        .reduce((path: Path, move, idx) => {
            const p1 = idx == 0 ? origin : path[idx - 1].p2;
            const p2 = add(p1, move);
            const dir = move.x === 0
                ? LineDirection.Vertical
                : LineDirection.Horizontal
            return [...path, { p1, p2, dir }]
        }, [])
}

function parseMove(move: string): Point {
    const length = parseInt(move.substring(1))
    switch (move[0]) {
        case 'R': return { x: length, y: 0 }
        case 'L': return { x: -length, y: 0 }
        case 'U': return { x: 0, y: length }
        case 'D': return { x: 0, y: -length }
    }
    throw new Error(`unknown move ${move[0]}`)
}

function add(p1: Point, p2: Point): Point {
    return {
        x: p1.x + p2.x,
        y: p1.y + p2.y
    }
}

export function intersects(a: Line, b: Line) {
    // parallel lines
    if (a.dir === b.dir) { return false; }

    const [vert, horiz] = a.dir === LineDirection.Vertical
        ? [a, b] : [b, a];

    const x = vert.p1.x;
    const [xmin, xmax] = [horiz.p1.x, horiz.p2.x].sort((a, b) => a - b)
    const y = horiz.p1.y;
    const [ymin, ymax] = [vert.p1.y, vert.p2.y].sort((a, b) => a - b)

    return xmin <= x && xmax >= x
        && ymin <= y && ymax >= y
}

function intersection(a: Line, b: Line): Point {
    const [vert, horiz] = a.dir === LineDirection.Vertical
        ? [a, b] : [b, a];
    return { x: vert.p1.x, y: horiz.p1.y }
}

function* crossings(p1: Path, p2: Path) {
    for (const a of p1)
        for (const b of p2) {
            if (intersects(a, b)) {
                yield intersection(a, b)
            }
        }
}

function manhattanDistance(p: Point) {
    return Math.abs(p.x) + Math.abs(p.y);
}

export function parsePaths(file: string) {
    const lines = fs.readFileSync(file, 'utf8')
        .split('\n');
    return [lines[0], lines[1]];
}

export function part1(pathDef1: string, pathdef2: string): number {
    const path1 = parsePath(pathDef1);
    const path2 = parsePath(pathdef2);
    const intersects = [...crossings(path1, path2)];
    const distances = intersects.map(manhattanDistance);
    return distances
        .filter(x => x !== 0) // skip origin
        .reduce((a, b) => a < b ? a : b);
}

export function asSvg(outfile: string, p1: string, p2: string) {

    const p1Lines = parsePath(p1).map(asSvgLine).join(' ')
    const p2Lines = parsePath(p2).map(asSvgLine).join(' ')
    // TODO: determine good width/height/transforms to make this usable
    const svg = `<?xml version="1.0" standalone="no"?>
    <svg width="50000" height="50000" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <g stroke-width="10" transform="translate(25000, 25000)">
            <g stroke="red">${p1Lines}</g>
            <g stroke="blue">${p2Lines}</g>
        </g>
    </svg>`

    fs.writeFileSync(outfile, svg)

    function asSvgLine(l: Line) {
        return `<line x1="${l.p1.x}" x2="${l.p2.x}" y1="${l.p1.y}" y2="${l.p2.y}"/>`
    }
}

//<line  x1="-2093" x2="-2093" y1="3382" y2="3049"/>
