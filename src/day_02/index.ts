import { readFile } from "fs/promises";

enum ScoreEnum {
  WON = 6,
  DRAW = 3,
  LOSE = 0,
}

enum GameEnum {
  ROCK = "ROCK",
  SCISSOR = "SCISSOR",
  PAPER = "PAPER",
}

type GameTypes = GameEnum.ROCK | GameEnum.PAPER | GameEnum.SCISSOR;

interface ICodeValueGame {
  id: GameEnum;
  score: number;
  codes: [string, string];
  wonOf: GameEnum;
}

const gameRecord: Record<GameTypes, ICodeValueGame> = {
  ROCK: {
    id: GameEnum.ROCK,
    score: 1,
    codes: ["A", "X"],
    wonOf: GameEnum.SCISSOR,
  },
  PAPER: {
    id: GameEnum.PAPER,
    score: 2,
    codes: ["B", "Y"],
    wonOf: GameEnum.ROCK,
  },
  SCISSOR: {
    id: GameEnum.SCISSOR,
    score: 3,
    codes: ["C", "Z"],
    wonOf: GameEnum.PAPER,
  },
};

// Reading Items
const readItems = () => {
  return readFile(`src/day_02/input.txt`, {
    encoding: "utf8",
  });
};

const parseCodeToGameRecord = (code: string): ICodeValueGame | undefined => {
  return Object.values(gameRecord).find((game) =>
    game.codes.find((gameCode) => gameCode === code)
  );
};

let totalScore = 0;

export const main = async () => {
  const items = await readItems();
  const splitItems = items.split("\n");
  const mapItems = splitItems.map((item) => item.split(" "));

  mapItems.forEach((item) => {
    const [opponent, myMatch] = item;

    const opponentObj = parseCodeToGameRecord(opponent);
    const myMatchObj = parseCodeToGameRecord(myMatch);

    if (opponentObj?.id !== myMatchObj?.id) {
      const lost = opponentObj?.wonOf === myMatchObj?.id;
      const won = myMatchObj?.wonOf === opponentObj?.id;

      if (won) {
        totalScore += ScoreEnum.WON + (myMatchObj?.score || 0);
      }

      if (lost) {
        totalScore += ScoreEnum.LOSE + (myMatchObj?.score || 0);
      }
    } else {
      totalScore += ScoreEnum.DRAW + (myMatchObj?.score || 0);
    }
  });

  console.log(totalScore);
};
