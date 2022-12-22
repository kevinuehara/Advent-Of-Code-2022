import { readFile } from "fs/promises";

// Reading Items
const readItems = () => {
  return readFile(`input.txt`, {
    encoding: "utf8",
  });
};

// Sum elements
const sum = (items) => {
  let total = 0;
  const arrayTotals = [];
  for (let item of items) {
    if (item !== "") {
      total += parseInt(item);
    } else {
      arrayTotals.push(total);
      total = 0;
    }
  }
  return arrayTotals;
};

const read = await readItems();

// Splitting elements by empty line
const split = read.split("\n");

const arrayTotal = sum(split);

// Sorting
arrayTotal.sort((a, b) => a - b);
console.log(arrayTotal[arrayTotal.length - 1]);
