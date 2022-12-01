import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const elves = input.split("\n\n");
  const elvesCalories = elves.map((elf) => {
    const calories = elf.split("\n");
    const caloriesSum = calories.reduce((acc, curr) => {
      return acc + parseInt(curr);
    }, 0);
    return caloriesSum;
  });

  return Math.max(...elvesCalories);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const elves = input.split("\n\n");
  const elvesCalories = elves.map((elf) => {
    const calories = elf.split("\n");
    const caloriesSum = calories.reduce((acc, curr) => {
      return acc + parseInt(curr);
    }, 0);
    return caloriesSum;
  });

  const topThreeElves = elvesCalories.sort((a, b) => b - a).slice(0, 3);
  const topThreeElvesSum = topThreeElves.reduce((acc, curr) => {
    return acc + curr;
  }, 0);

  return topThreeElvesSum;
};

const testInput = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`;

run({
  part1: {
    tests: [
      {
        input: testInput,
        expected: 24000,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: testInput,
        expected: 45000,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
