import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput).split("");
  const numberOfDistinctCharacters = 4;

  const indexOfFirstDuplicate = input.reduce((acc, _char, index, characters) => {
    if (acc !== -1) return acc;

    const charactersCopy = [...characters];

    const charactersAfterCurrent = charactersCopy.splice(
      index,
      numberOfDistinctCharacters,
    );

    const distinctCharacters = Array.from(new Set(charactersAfterCurrent));

    const isDuplicate =
      distinctCharacters.length !== charactersAfterCurrent.length;

    return !isDuplicate ? index + numberOfDistinctCharacters : acc;
  }, -1);

  return indexOfFirstDuplicate;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput).split("");
  const numberOfDistinctCharacters = 14;

  const indexOfFirstDuplicate = input.reduce((acc, _char, index, characters) => {
    if (acc !== -1) return acc;

    const charactersCopy = [...characters];

    const charactersAfterCurrent = charactersCopy.splice(
      index,
      numberOfDistinctCharacters,
    );

    const distinctCharacters = Array.from(new Set(charactersAfterCurrent));

    const isDuplicate =
      distinctCharacters.length !== charactersAfterCurrent.length;

    return !isDuplicate ? index + numberOfDistinctCharacters : acc;
  }, -1);

  return indexOfFirstDuplicate;
};

const testInput = `mjqjpqmgbljsphdztnvjfqwrcgsmlb`;

run({
  part1: {
    tests: [
      {
        input: testInput,
        expected: 7,
      },
      {
        input: "bvwbjplbgvbhsrlpgdmjqwftvncz",
        expected: 5,
      },
      {
        input: "nppdvjthqldpwncqszvftbrmjlhg",
        expected: 6,
      },
      {
        input: "nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg",
        expected: 10,
      },
      {
        input: "zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw",
        expected: 11,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: testInput,
        expected: 19,
      },
      {
        input: "bvwbjplbgvbhsrlpgdmjqwftvncz",
        expected: 23,
      },
      {
        input: "nppdvjthqldpwncqszvftbrmjlhg",
        expected: 23,
      },
      {
        input: "nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg",
        expected: 29,
      },
      {
        input: "zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw",
        expected: 26,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
