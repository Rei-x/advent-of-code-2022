import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const pairsOfElves = input.split("\n");

  const numberOfFullyContainedSections = pairsOfElves.reduce(
    (acc, pairOfElves) => {
      const [firstElf, secondElf] = pairOfElves.split(",");

      const [firstElfStart, firstElfEnd] = firstElf.split("-").map(Number);
      const [secondElfStart, secondElfEnd] = secondElf.split("-").map(Number);

      const isFullyContainedSecondElf =
        firstElfStart <= secondElfStart && secondElfEnd <= firstElfEnd;
      const isFullyContainedFirstElf =
        secondElfStart <= firstElfStart && firstElfEnd <= secondElfEnd;

      const isFullyContained =
        isFullyContainedFirstElf || isFullyContainedSecondElf;

      return acc + (isFullyContained ? 1 : 0);
    },
    0,
  );

  return numberOfFullyContainedSections;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const pairsOfElves = input.split("\n");

  const numberOfOverlappingPairs = pairsOfElves.reduce((acc, pairOfElves) => {
    const [firstElf, secondElf] = pairOfElves.split(",");

    const [firstElfStart, firstElfEnd] = firstElf.split("-").map(Number);
    const [secondElfStart, secondElfEnd] = secondElf.split("-").map(Number);

    const arrayOfFirstElfSections = Array.from(
      { length: firstElfEnd - firstElfStart + 1 },
      (_, index) => firstElfStart + index,
    );

    const arrayOfSecondElfSections = Array.from(
      { length: secondElfEnd - secondElfStart + 1 },
      (_, index) => secondElfStart + index,
    );

    const doesOverlap = arrayOfFirstElfSections.some((item) =>
      arrayOfSecondElfSections.includes(item),
    );

    return acc + (doesOverlap ? 1 : 0);
  }, 0);

  return numberOfOverlappingPairs;
};

const testInput = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`;

run({
  part1: {
    tests: [
      {
        input: testInput,
        expected: 2,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: testInput,
        expected: 4,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
