import { readFile } from "fs/promises";

const readItems = () => {
  return readFile(`src/day_03/input.txt`, {
    encoding: "utf8",
  });
};

const calculatePriority = (char: string) => {
  const priority = parseInt(char, 36) - 9;
  if (char === char.toUpperCase()) {
    return 26 + priority;
  }

  return priority;
};

let sumPriorities = 0;

export const main = async () => {
  const items = (await readItems()).split("\n");
  const halfSplitArray = items.map((item) => {
    const half = Math.floor(item.length / 2);
    return [item.slice(0, half), item.slice(half, item.length)];
  });

  halfSplitArray.forEach((item) => {
    const [firstCompartment, secondCompartment] = item;
    const setFirstCompartment = new Set(firstCompartment);
    const setSecondCompartment = [...new Set(secondCompartment)];

    for (let letter of setSecondCompartment) {
      if (setFirstCompartment.has(letter)) {
        sumPriorities += calculatePriority(letter);
      }
    }
  });

  console.log(sumPriorities);
};
