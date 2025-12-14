export const star1 = (data: string) => {
  const lines = data.split('\n').map((line) => line.split(''));
  const index = lines[0].findIndex((x) => x === 'S');
  lines[1][index] = '|';
  let sum = 0;
  for (let i = 2; i < lines.length; i++) {
    for (let j = 0; j < lines[i].length; j++) {
      if (lines[i][j] === '^' && lines[i - 1][j] === '|') {
        sum++;
        if (typeof lines[i][j - 1] === 'string') lines[i][j - 1] = '|';
        if (typeof lines[i][j + 1] === 'string') lines[i][j + 1] = '|';
      } else if (lines[i - 1][j] === '|') lines[i][j] = '|';
    }
  }
  console.log(sum);
};

export const star2 = (data: string) => {
  const lines: (string | number)[][] = data
    .split('\n')
    .map((line) => line.split(''));
  const index = lines[0].findIndex((x) => x === 'S');
  lines[1][index] = 1;
  let sum = 0;
  for (let i = 2; i < lines.length; i++) {
    for (let j = 0; j < lines[i].length; j++) {
      if (typeof lines[i - 1][j] === 'number' && lines[i][j] !== '^') {
        lines[i][j] =
          (typeof lines[i][j] === 'string' ? 0 : (lines[i][j] as number)) +
          (lines[i - 1][j] as number);
      }

      if (lines[i][j] === '^' && typeof lines[i - 1][j] === 'number') {
        if (lines[i][j - 1] !== undefined) {
          lines[i][j - 1] =
            (typeof lines[i][j - 1] === 'string'
              ? 0
              : (lines[i][j - 1] as number)) + (lines[i - 1][j] as number);
        }
        if (lines[i][j + 1] !== undefined) {
          lines[i][j + 1] =
            (typeof lines[i][j + 1] === 'string'
              ? 0
              : (lines[i][j + 1] as number)) + (lines[i - 1][j] as number);
        }
      }
    }
  }
  for (const i of lines.at(-1)!) if (typeof i === 'number') sum += i;
  console.log(sum);
};
