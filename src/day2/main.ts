import fs from 'fs'

/*
An Intcode program is a list of integers separated by commas (like 1,0,0,3,99).
To run one, start by looking at the first integer (called position 0). Here, you
will find an opcode - either 1, 2, or 99. The opcode indicates what to do; for
example, 99 means that the program is finished and should immediately halt.
Encountering an unknown opcode means something went wrong.

Opcode 1 adds together numbers read from two positions and stores the result in
a third position. The three integers immediately after the opcode tell you these
three positions - the first two indicate the positions from which you should
read the input values, and the third indicates the position at which the output
should be stored.

For example, if your Intcode computer encounters 1,10,20,30, it should read the
values at positions 10 and 20, add those values, and then overwrite the value at
position 30 with their sum.

Opcode 2 works exactly like opcode 1, except it multiplies the two inputs
instead of adding them. Again, the three integers after the opcode indicate
where the inputs and outputs are, not their values.

Once you're done processing an opcode, move to the next one by stepping forward
4 positions.
*/
export function run(ram: number[]): number[] {
    for (const op of parse(ram)) {
        op(ram)
    }
    return ram;
}

export function readTape(path: string): number[] {
    return fs.readFileSync(path, 'utf8')
        .split(',')
        .filter(x => x)
        .map(x => parseInt(x));
}

function* parse(ram: number[]) {
    let pc = 0;
    const next = () => ram[pc++];
    while (pc < ram.length) {
        switch (next()) {
            case OpCode.Add:
                yield add.bind(null, next(), next(), next())
                break
            case OpCode.Mult:
                yield mult.bind(null, next(), next(), next())
                break;
            case OpCode.Halt:
                return;
        }
    }
}

enum OpCode { Add = 1, Mult = 2, Halt = 99 }

function add(a: number, b: number, dst: number, ram: number[]): void {
    ram[dst] = ram[a] + ram[b];
}

function mult(a: number, b: number, dst: number, ram: number[]): void {
    ram[dst] = ram[a] * ram[b];
}

export function patch1202(ram: number[]): number[] {
    // replace position 1 with the value 12 and replace position 2 with the value 2
    ram[1] = 12
    ram[2] = 2
    return ram
}
