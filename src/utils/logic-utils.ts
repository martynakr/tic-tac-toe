export const checkWin = (arr: any[], x: number, y: number) => {
    // check column
    let hasWinner = true;

    const won = arr[x][y].letter;
    console.log(won, "won");

    for (let i = 0; i < 3; i++) {
        if (arr[x][i].letter !== won) {
            hasWinner = false;
            break;
        }
    }

    if (hasWinner) {
        return hasWinner;
    }

    hasWinner = true;

    // check column
    for (let i = 0; i < 3; i++) {
        // console.log(arr[i][y].letter === won);
        if (arr[i][y].letter !== won) {
            hasWinner = false;
            break;
        }
    }

    if (hasWinner) {
        return hasWinner;
    }

    hasWinner = true;
    // check diagonal - doesnt need to happen every time, improve
    for (let i = 0; i < 3; i++) {
        if (arr[i][i].letter !== won) {
            hasWinner = false;
            break;
        }
    }

    if (hasWinner) {
        return hasWinner;
    }
    hasWinner = true;
    for (let i = 0; i < 3; i++) {
        console.log(Math.abs(i - 2), "abs");
        console.log(arr[i][Math.abs(i - 2)].letter);
        if (arr[i][Math.abs(i - 2)].letter !== won) {
            hasWinner = false;
            break;
        }
    }
    if (hasWinner) {
        return hasWinner;
    }

    hasWinner = false;
    return hasWinner;
};
