import run from "aocrunner";
import _ from "lodash";

const parseInput = (rawInput: string) => rawInput;

type Disk = {
  [key: string]: Disk | number;
};

const getDisk = (input: string) => {
  const lines = input.split("$").slice(1);
  const disk: Disk = {};
  let path: string[] = [];

  lines.forEach((command) => {
    const [realCommand, ...args] = command.split("\n");
    if (realCommand.trim().startsWith("cd")) {
      const newDirectory = realCommand.split(" ").at(-1)?.trim();
      switch (newDirectory) {
        case "..":
          path.pop();
          break;
        case "/":
          path.length = 0;
          break;
        default:
          path.push(newDirectory ?? "");
      }
    }

    if (realCommand.trim().startsWith("ls")) {
      args.filter(Boolean).forEach((dirOrFile) => {
        const [typeOrSize, name] = dirOrFile.split(" ");

        if (typeOrSize !== "dir") {
          _.set(disk, [...path, name], Number(typeOrSize));
        }
      });
    }
  });

  return disk;
};

const getDirectoriesValues = (input: Disk) => {
  const dirSizes: number[] = [];

  const getDirSizes = (disk: Disk) => {
    let directorySize = 0;

    Object.values(disk).forEach((value) => {
      directorySize += typeof value === "number" ? value : getDirSizes(value);
    });

    dirSizes.push(directorySize);
    return directorySize;
  };

  getDirSizes(input);
  return dirSizes;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const disk = getDisk(input);

  const diskValues = getDirectoriesValues(disk);

  return diskValues
    .filter((value) => value <= 100000)
    .reduce((acc, value) => acc + value, 0);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const disk = getDisk(input);

  const diskValues = getDirectoriesValues(disk);

  const freeSpace = 70000000 - Math.max(...diskValues);
  const spaceDeficit = 30000000 - freeSpace;

  const theSmallestDirToDelete = Math.min(
    ...diskValues.filter((value) => value > spaceDeficit),
  );

  return theSmallestDirToDelete;
};

const testInput = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`;

run({
  part1: {
    tests: [
      {
        input: testInput,
        expected: 95437,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: testInput,
        expected: 24933642,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
