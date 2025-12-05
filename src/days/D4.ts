export const star1 = (data: string) => {
    const grid = data.split('\n').map(line => line.split('').map(x => x === '@'))
    let sum = 0;
    for (let x = 0; x < grid.length; x++) {
        for (let y = 0; y < grid[x].length; y++) {
            if (!grid[x][y]) continue;
            let n = 0;
            if (grid[x-1]?.[y-1]) n++;
            if (grid[x-1]?.[y]) n++;
            if (grid[x-1]?.[y+1]) n++;
            if (grid[x]?.[y-1]) n++;
            if (grid[x]?.[y+1]) n++;
            if (grid[x+1]?.[y-1]) n++;
            if (grid[x+1]?.[y]) n++;
            if (grid[x+1]?.[y+1]) n++;
            if (n < 4) sum ++
        }
    }
    console.log(sum);
}

export const star2 = (data: string) => {
    const grid = data.split('\n').map(line => line.split('').map(x => x === '@'))
    let sum = 0;
    let innerSum = 0;
    do {
        innerSum = 0;
        for (let x = 0; x < grid.length; x++) {
            for (let y = 0; y < grid[x].length; y++) {
                if (!grid[x][y]) continue;
                let n = 0;
                if (grid[x-1]?.[y-1]) n++;
                if (grid[x-1]?.[y]) n++;
                if (grid[x-1]?.[y+1]) n++;
                if (grid[x]?.[y-1]) n++;
                if (grid[x]?.[y+1]) n++;
                if (grid[x+1]?.[y-1]) n++;
                if (grid[x+1]?.[y]) n++;
                if (grid[x+1]?.[y+1]) n++;
                if (n < 4) {
                    grid[x][y] = false;
                    innerSum++
                }
            }
        }
        sum += innerSum;
    } while (innerSum > 0)
    console.log(sum);
}

