export const star1 = (data: string) => {
    const ranges = data.split(',').map(r => r.split('-'))
    let sum = 0;
    for (const range of ranges) {
        const max = range[1]
        let min = range[0].padStart(max.length, '0')

        let a;
        let b;

        do {
            a = min.substring(0, Math.floor(min.length / 2));
            b = min.substring(Math.floor(min.length / 2));
            if (a === b) {
                sum += +`${a}${b}`;
            }
            min = `${(+min)+1}`
        } while (+min <= +max)
    }
    console.log(sum);
}

const isRepeating = (str: string) => {
    for (let i = 1; i < str.length; i++) {
        let clone = str
        const arr = []
        while (clone.length) {
            arr.push(clone.substring(0, i));
            clone = clone.substring(i);
        }
        if (arr.length <= 1) continue;
        const set = new Set(arr)
        if (set.size === 1) return true
    }
    return false
}

export const star2 = (data: string) => {
    const ranges = data.split(',').map(r => r.split('-').map(Number))
    let sum = 0;
    for (const range of ranges) {
        for (let i = range[0]; i <= range[1]; i++) {
            if (isRepeating(`${i}`)) {
                sum += i
            }
        }
    }
    console.log(sum);
}

