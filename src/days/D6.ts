export const star1 = (data: string) => {
  const tmp = data.split('\n').map((line) => line.trim().split(/\s+/));
  const columns: number[][] = [];
  const [operations] = tmp.splice(-1);
  for (const row of tmp) {
    for (let i = 0; i < row.length; i++) {
      columns[i] ??= [];
      columns[i].push(+row[i]);
    }
  }
  let sum = 0;
  for (let i = 0; i < columns.length; i++) {
    const column = columns[i];
    const cb: (a: number, b: number) => number =
      operations[i] === '+' ? (a, b) => a + b : (a, b) => a * b;
    sum += column.reduce(cb);
  }
  console.log(sum);
};

export const star2 = (data: string) => {
  const lines = data.split('\n');
  const operations = lines.splice(-1)[0].padEnd(lines[0].length, ' ').split('');
  let sum = 0;
  let lastIndex = operations.length;

  while (operations.length > 1) {
    const index = operations.findLastIndex((x) => x !== ' ');
    const arr = lines.map((line) => line.substring(index, lastIndex));
    const numbers: number[] = [];

    for (let i = 0; i < lastIndex - index; i++) {
      numbers.push(
        +arr
          .map((a) => a.charAt(i))
          .filter((i) => i !== ' ')
          .join(''),
      );
    }

    const cb: (a: number, b: number) => number =
      operations[index] === '+' ? (a, b) => a + b : (a, b) => a * b;

    sum += numbers.reduce(cb);
    operations.splice(index);
    lastIndex = index - 1;
  }
  console.log(sum);
};
