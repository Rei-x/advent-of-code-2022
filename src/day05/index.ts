import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const [initialArrangement, moves] = input.split("\n\n");

  const initialArrangementAsArray = initialArrangement.split("\n").slice(1);
  const arrangement = {} as Record<number, string[]>;

  initialArrangementAsArray.forEach((line) => {
    const items = line.matchAll(/\[(\D)\]/gm);
    const itemsArray = Array.from(items).map((item) => ({
      index: item.index ?? 0,
      value: item[1],
    }));
    itemsArray.forEach((item) => {
      const index = item.index / 4 + 1;

      if (typeof item.value === "undefined") {
        throw new Error("Invalid value!");
      }

      if (!arrangement[index]) {
        arrangement[index] = [];
      }
      arrangement[index].unshift(item.value);
    });
  });

  moves.split("\n").forEach((move, index) => {
    const [numberOfItems, from, to] = Array.from(move.matchAll(/[0-9]+/gm)).map(
      (item) => Number(item[0]),
    );

    for (let i = 0; i < numberOfItems; i++) {
      const item = arrangement[from].pop();
      if (typeof item === "undefined") {
        throw new Error(`Invalid item! nr: ${index} ${move}`);
      }
      arrangement[to].push(item as string);
    }
  });

  const lastElementsOfArrangement = Object.values(arrangement).map(
    (arr) => arr[arr.length - 1],
  );

  return lastElementsOfArrangement.join("");
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const [initialArrangement, moves] = input.split("\n\n");

  const initialArrangementAsArray = initialArrangement.split("\n").slice(1);
  const arrangement = {} as Record<number, string[]>;

  initialArrangementAsArray.forEach((line) => {
    const items = line.matchAll(/\[(\D)\]/gm);
    const itemsArray = Array.from(items).map((item) => ({
      index: item.index ?? 0,
      value: item[1],
    }));
    itemsArray.forEach((item) => {
      const index = item.index / 4 + 1;

      if (typeof item.value === "undefined") {
        throw new Error("Invalid value!");
      }

      if (!arrangement[index]) {
        arrangement[index] = [];
      }
      arrangement[index].unshift(item.value);
    });
  });

  moves.split("\n").forEach((move) => {
    const [numberOfItems, from, to] = Array.from(move.matchAll(/[0-9]+/gm)).map(
      (item) => Number(item[0]),
    );
    const items = arrangement[from].splice(-numberOfItems);
    arrangement[to].push(...items);
  });

  const lastElementsOfArrangement = Object.values(arrangement).map(
    (arr) => arr[arr.length - 1],
  );

  return lastElementsOfArrangement.join("");
};

const testInput = `
    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`;

run({
  part1: {
    tests: [
      {
        input: testInput,
        expected: "CMZ",
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: testInput,
        expected: "MCD",
      },
    ],
    solution: part2,
  },
  trimTestInputs: false,
  onlyTests: false,
});
