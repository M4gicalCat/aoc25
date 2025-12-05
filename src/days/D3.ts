export const star1 = (data: string) => {
  const banks = data.split('\n').map((bank) => bank.split('').map(Number));
  let sum = 0;
  for (const bank of banks) {
    const highest = Math.max(...bank.slice(0, -1));
    const indexes = bank.reduce<number[]>(
      (a, b, i) => (b === highest ? [...a, i] : a),
      [],
    );
    const secondHighest = Math.max(...bank.slice(indexes[0] + 1));
    sum += +`${highest}${secondHighest}`;
  }
  console.log(sum);
};

const getHighest = (arr: number[], n: number) => {
  const highest = Math.max(...(n > 0 ? arr.slice(0, -n) : arr));
  return arr.indexOf(highest);
};

export const star2 = (data: string) => {
  const banks = data.split('\n').map((bank) => bank.split('').map(Number));
  let sum = 0;
  for (const bank of banks) {
    let inner = '';
    let b = [...bank];
    for (let i = 11; i >= 0; i--) {
      const index = getHighest(b, i);
      inner += b[index].toString();
      b = b.slice(index + 1);
    }
    sum += +inner;
  }
  console.log(sum);
};
