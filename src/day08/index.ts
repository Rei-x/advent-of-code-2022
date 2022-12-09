import run from "aocrunner";
import _ from "lodash";

const parseInput = (rawInput: string) => rawInput;

const offset = {
  top: {
    row: -1,
    column: 0,
  } as const,
  bottom: {
    row: 1,
    column: 0,
  } as const,
  left: {
    row: 0,
    column: -1,
  },
  right: {
    row: 0,
    column: 1,
  },
} as const;

const getOffest = (from: "top" | "bottom" | "left" | "right") => {
  return offset[from];
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const grid = input.split("\n").map((row) => row.split("").map(Number));

  const numberOfRows = grid.length;
  const numberOfColumns = grid[0].length;

  let numberOfVisibleTrees = 0;

  const isVisibleFrom = ({
    initialTreeHeight,
    rowIndex,
    columnIndex,
    from,
  }: {
    rowIndex: number;
    columnIndex: number;
    initialTreeHeight?: number;
    from: "top" | "bottom" | "left" | "right";
  }): boolean => {
    const offset = getOffest(from);

    const newRowIndex = rowIndex + offset.row;
    const newColumnIndex = columnIndex + offset.column;

    const treeHeight =
      initialTreeHeight ?? _.get(grid, [rowIndex, columnIndex]);
    const nextTreeHeight = _.get(grid, [newRowIndex, newColumnIndex]);

    if (nextTreeHeight === undefined) {
      return true;
    }

    if (nextTreeHeight >= treeHeight) {
      return false;
    } else {
      return isVisibleFrom({
        initialTreeHeight: treeHeight,
        rowIndex: newRowIndex,
        columnIndex: newColumnIndex,
        from,
      });
    }
  };

  grid.forEach((row, rowIndex) =>
    row.forEach((_value, columnIndex) => {
      if (
        rowIndex == 0 ||
        rowIndex == numberOfRows - 1 ||
        columnIndex == 0 ||
        columnIndex == numberOfColumns - 1
      ) {
        numberOfVisibleTrees++;
        return;
      }

      if (
        Object.keys(offset).some((from) =>
          isVisibleFrom({
            rowIndex,
            columnIndex,
            from: from as keyof typeof offset,
          }),
        )
      ) {
        numberOfVisibleTrees++;
        return;
      }
    }),
  );
  return numberOfVisibleTrees;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const grid = input.split("\n").map((row) => row.split("").map(Number));

  const getNumberOfTrees = ({
    currentNumberOfTrees,
    initialTreeHeight,
    rowIndex,
    columnIndex,
    from,
  }: {
    currentNumberOfTrees: number;
    rowIndex: number;
    columnIndex: number;
    initialTreeHeight?: number;
    from: "top" | "bottom" | "left" | "right";
  }): number => {
    const offset = getOffest(from);

    const newRowIndex = rowIndex + offset.row;
    const newColumnIndex = columnIndex + offset.column;

    const treeHeight =
      initialTreeHeight ?? _.get(grid, [rowIndex, columnIndex]);
    const nextTreeHeight = _.get(grid, [newRowIndex, newColumnIndex]);

    if (nextTreeHeight === undefined) {
      return currentNumberOfTrees;
    }

    if (nextTreeHeight >= treeHeight) {
      return currentNumberOfTrees + 1;
    } else {
      return getNumberOfTrees({
        currentNumberOfTrees: currentNumberOfTrees + 1,
        initialTreeHeight: treeHeight,
        rowIndex: newRowIndex,
        columnIndex: newColumnIndex,
        from,
      });
    }
  };

  const trees: number[] = [];

  grid.forEach((row, rowIndex) =>
    row.forEach((_value, columnIndex) => {
      const score = Object.keys(offset).reduce((acc, cur) => {
        return (
          acc *
          getNumberOfTrees({
            currentNumberOfTrees: 0,
            columnIndex,
            rowIndex,
            from: cur as keyof typeof offset,
          })
        );
      }, 1);

      trees.push(score);
    }),
  );

  return Math.max(...trees);
};

const testInput = `30373
25512
65332
33549
35390`;

run({
  part1: {
    tests: [
      {
        input: testInput,
        expected: 21,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: testInput,
        expected: 8,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
