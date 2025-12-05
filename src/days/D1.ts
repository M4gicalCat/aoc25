export const star1 = (data: string) => {
  let dial = 50;
  let sum = 0;
  for (const l of data.split('\n')) {
    const rotation = l[0] === 'L' ? -1 : 1;
    const n = +l.slice(1);
    dial = (dial + n * rotation + 100) % 100;
    if (dial === 0) sum++;
  }
  console.log(`RESULT:: `, sum);
};

export const star2 = (data: string) => {
  let dial = 50;
  let sum = 0;
  let direction = 'R';
  for (const l of data.split('\n')) {
    if (l[0] !== direction) {
      dial = 100 - (dial || 100);
      direction = l[0];
    }
    let n = +l.slice(1);
    dial += n;
    sum += Math.floor(dial / 100);
    dial %= 100;
  }
  console.log(`RESULT:: `, sum);
};
