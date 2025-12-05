export const star1 = (data: string) => {
  const tmp = data.split('\n\n').map((block) => block.split('\n'));
  const ranges = tmp[0].map((l) => l.split('-').map(Number));
  const ids = tmp[1].map(Number);
  let sum = 0;

  for (const id of ids) {
    if (ranges.some((r) => r[0] <= id && id <= r[1])) sum++;
  }

  console.log(sum);
};

export const star2 = (data: string) => {
  let ranges = data
    .split('\n\n')[0]
    .split('\n')
    .map((l) => l.split('-').map(Number))
    .sort((a, b) => a[0] - b[0]) as [number, number][];

  const valid: [number, number][] = [];
  while (ranges.length > 0) {
    let range;
    [range, ...ranges] = ranges;
    const arr = valid.find((v) => v[1] >= range[0]);
    if (!arr) {
      valid.push(range);
      continue;
    }
    arr[1] = Math.max(arr[1], range[1]);
  }

  const sum = valid.reduce((acc, v) => acc + (v[1] - v[0]), valid.length);

  console.log(sum);
};
