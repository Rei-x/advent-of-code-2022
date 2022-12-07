import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const getLetterValue = (letter: string) => {
  const isUpperCase = letter === letter.toUpperCase();

  return isUpperCase ? letter.charCodeAt(0) - 38 : letter.charCodeAt(0) - 96;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const rucksacks = input.split("\n");

  const sharedItems = rucksacks.map((rucksack) => {
    const firstCompartment = rucksack.slice(0, rucksack.length / 2).split("");
    const secondCompartment = rucksack.slice(rucksack.length / 2).split("");

    const intersection = firstCompartment.filter((item) =>
      secondCompartment.includes(item),
    );

    return intersection.at(0);
  });

  return sharedItems.reduce((acc, item) => {
    if (typeof item === "undefined") {
      throw new Error("empty item");
    }

    return acc + getLetterValue(item);
  }, 0);

  return;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const rucksacks = input.split("\n");

  const ruckSacksGroupsOfThree = rucksacks.reduce((acc, rucksack, index) => {
    if (index % 3 === 0) {
      acc.push([rucksack]);
    } else {
      acc[acc.length - 1].push(rucksack);
    }

    return acc;
  }, [] as string[][]);

  const sharedItems = ruckSacksGroupsOfThree.map((rucksacksGroup) => {
    const firstCompartment = rucksacksGroup[0].split("");
    const secondCompartment = rucksacksGroup[1].split("");
    const thirdCompartment = rucksacksGroup[2].split("");

    const intersection = firstCompartment
      .filter((item) => secondCompartment.includes(item))
      .filter((item) => thirdCompartment.includes(item));

    return intersection.at(0);
  });

  return sharedItems.reduce((acc, item) => {
    if (typeof item === "undefined") {
      throw new Error("empty item");
    }

    return acc + getLetterValue(item);
  }, 0);
};

const testInput = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`;

run({
  part1: {
    tests: [
      {
        input: testInput,
        expected: 157,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: testInput,
        expected: 70,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
