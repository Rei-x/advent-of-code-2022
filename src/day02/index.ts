import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const movesValues = {
  X: 1,
  Y: 2,
  Z: 3,
} as const;

const getScoreBasedOnMove = (myMove: MyMove) => {
  return movesValues[myMove];
};

const winningCombations = {
  A: "Y",
  B: "Z",
  C: "X",
} as const;

const drawCombinations = {
  A: "X",
  B: "Y",
  C: "Z",
} as const;

const loseCombinations = {
  A: "Z",
  B: "X",
  C: "Y",
} as const;

type OponnentMove = "A" | "B" | "C";
type MyMove = "X" | "Y" | "Z";

const isWin = (myMove: MyMove, oponnetMove: OponnentMove) => {
  return winningCombations[oponnetMove] === myMove;
};

const isDraw = (myMove: MyMove, oponnetMove: OponnentMove) => {
  return drawCombinations[oponnetMove] === myMove;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const moves = input.split("\n");

  const score = moves.reduce((currentScore, move) => {
    const [oponnetMove, myMove] = move.split(" ") as [OponnentMove, MyMove];

    const moveScore = getScoreBasedOnMove(myMove);

    if (isWin(myMove, oponnetMove)) {
      return currentScore + moveScore + 6;
    }

    if (isDraw(myMove, oponnetMove)) {
      return currentScore + moveScore + 3;
    }

    return currentScore + moveScore;
  }, 0);

  return score;
};

const getStrategy = (myMove: MyMove) => {
  const strategy = {
    win: myMove === "Z",
    draw: myMove === "Y",
    lose: myMove === "X",
  };

  return strategy;
};

const getMoveBasedOnStrategy = ({
  oponnentMove,
  strategy,
}: {
  oponnentMove: OponnentMove;
  strategy: ReturnType<typeof getStrategy>;
}): MyMove => {
  if (strategy.win) {
    return winningCombations[oponnentMove];
  }

  if (strategy.draw) {
    return drawCombinations[oponnentMove];
  }

  if (strategy.lose) {
    return loseCombinations[oponnentMove];
  }

  return "X";
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const moves = input.split("\n");

  const score = moves.reduce((currentScore, moveString) => {
    const [oponnentMove, strategyString] = moveString.split(" ") as [
      OponnentMove,
      MyMove,
    ];

    const strategy = getStrategy(strategyString);
    const move = getMoveBasedOnStrategy({ oponnentMove, strategy });
    const moveScore = getScoreBasedOnMove(move);

    if (strategy.win) {
      return currentScore + moveScore + 6;
    }

    if (strategy.draw) {
      return currentScore + moveScore + 3;
    }

    return currentScore + moveScore;
  }, 0);

  return score;
};

const testInput = `
A Y
B X
C Z`;

run({
  part1: {
    tests: [
      {
        input: testInput,
        expected: 15,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: testInput,
        expected: 12,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
