type Box = { x: number; y: number; z: number; hash: string; i: number };

const distance = (a: Box, b: Box) =>
  Math.sqrt(
    Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2) + Math.pow(a.z - b.z, 2),
  );

const findOrderedIndex = (
  arr: { hi: string; hj: string; n: number }[],
  item: { hi: string; hj: string; n: number },
): number => {
  if (arr.length === 0) return 0;
  if (arr.length === 1) return item.n > arr[0].n ? 1 : 0;

  const midIndex = Math.floor(arr.length / 2);
  const midItem = arr[midIndex];
  const nextArr =
    item.n > midItem.n ? arr.slice(midIndex + 1) : arr.slice(0, midIndex);
  return (
    findOrderedIndex(nextArr, item) + (item.n > midItem.n ? midIndex + 1 : 0)
  );
};

const pushOrdered = (
  arr: { hi: string; hj: string; n: number }[],
  item: { hi: string; hj: string; n: number },
) => {
  const index = findOrderedIndex(arr, item);
  arr.splice(index, 0, item);
};

export const star1 = (data: string) => {
  const boxes: Box[] = data
    .split('\n')
    .map((line) => line.split(',').map(Number))
    .map(([x, y, z]) => ({ x, y, z, hash: `${x}_${y}_${z}` }))
    .sort((a, b) => a.hash.localeCompare(b.hash))
    .map((x, i) => ({ ...x, i }));
  const orderedDistances: { hi: string; hj: string; n: number }[] = [];
  for (let i = 0; i < boxes.length; i++) {
    const bi = boxes[i];
    for (let j = i + 1; j < boxes.length; j++) {
      const bj = boxes[j];
      const dist = distance(bi, bj);
      pushOrdered(orderedDistances, { n: dist, hi: bi.hash, hj: bj.hash });
    }
    orderedDistances.splice(boxes.length * 20, orderedDistances.length);
  }
  const circuitByBox = new Map<string, Set<string>>();
  let circuits: Set<string>[] = [];
  // test is 10 lines, real is 1000
  let nbLines = boxes.length === 20 ? 10 : 1000;
  for (const dist of orderedDistances) {
    if (nbLines <= 0) break;
    nbLines--;
    const si = circuitByBox.get(dist.hi);
    const sj = circuitByBox.get(dist.hj);
    if (si && sj) {
      if (si === sj) continue;
      for (const hash of sj) {
        si.add(hash);
        circuitByBox.set(hash, si);
      }
      circuits = circuits.filter((c) => c !== sj);
    } else if (si) {
      si.add(dist.hj);
      circuitByBox.set(dist.hj, si);
    } else if (sj) {
      sj.add(dist.hi);
      circuitByBox.set(dist.hi, sj);
    } else {
      const set = new Set<string>();
      set.add(dist.hj);
      set.add(dist.hi);
      circuitByBox.set(dist.hi, set);
      circuitByBox.set(dist.hj, set);
      circuits.push(set);
    }
  }
  console.log(
    circuits
      .sort((a, b) => b.size - a.size)
      .slice(0, 3)
      .reduce((a, b) => a * b.size, 1),
  );
};

export const star2 = (data: string) => {
  const boxes: Box[] = data
    .split('\n')
    .map((line) => line.split(',').map(Number))
    .map(([x, y, z]) => ({ x, y, z, hash: `${x}_${y}_${z}` }))
    .sort((a, b) => a.hash.localeCompare(b.hash))
    .map((x, i) => ({ ...x, i }));
  const orderedDistances: { hi: string; hj: string; n: number }[] = [];
  for (let i = 0; i < boxes.length; i++) {
    const bi = boxes[i];
    for (let j = i + 1; j < boxes.length; j++) {
      const bj = boxes[j];
      const dist = distance(bi, bj);
      pushOrdered(orderedDistances, { n: dist, hi: bi.hash, hj: bj.hash });
    }
    orderedDistances.splice(boxes.length * 20, orderedDistances.length);
  }
  const seen = new Set<string>();
  const circuitByBox = new Map<string, Set<string>>();
  let circuits: Set<string>[] = [];
  let lastDist;
  for (const dist of orderedDistances) {
    if (seen.size === boxes.length) break;
    lastDist = dist;
    const si = circuitByBox.get(dist.hi);
    const sj = circuitByBox.get(dist.hj);
    if (si && sj) {
      if (si === sj) continue;
      for (const hash of sj) {
        si.add(hash);
        circuitByBox.set(hash, si);
      }
      circuits = circuits.filter((c) => c !== sj);
    } else if (si) {
      si.add(dist.hj);
      circuitByBox.set(dist.hj, si);
    } else if (sj) {
      sj.add(dist.hi);
      circuitByBox.set(dist.hi, sj);
    } else {
      const set = new Set<string>();
      set.add(dist.hj);
      set.add(dist.hi);
      circuitByBox.set(dist.hi, set);
      circuitByBox.set(dist.hj, set);
      circuits.push(set);
    }
    seen.add(dist.hj);
    seen.add(dist.hi);
  }
  console.log(+lastDist!.hj.split('_')[0] * +lastDist!.hi.split('_')[0]);
};
