import { useEffect, useState } from "react";
import styles from "./Cell.module.scss";
import { Letter } from "../../containers/Grid/Grid";
import { checkWin } from "../../utils/logic-utils";

export interface ICellProps {
    letter: string | null;
    x: number;
    y: number;
    turn: Letter;
    setLetterTurn: (data: Letter) => unknown;
    grid: ICell[][];
    setGrid: (data: ICell[][]) => unknown;
    turns: number;
    setTurns: (data: number) => unknown;
    hasWon: boolean;
    setHasWon: (data: boolean) => unknown;
}
export interface ICell {
    letter: string | null;
    x: number;
    y: number;
    id: number;
}

export const Cell = ({
    x,
    y,
    turn,
    setLetterTurn,
    grid,
    setGrid,
    turns,
    setTurns,
    hasWon,
    setHasWon,
}: ICellProps) => {
    const styleNames: string[] = [styles.Cell];
    const [letterToShow, setLetterToShow] = useState<string>("");
    const [placed, setPlaced] = useState<number | null>(null);

    if (x === 0 || x === 1) {
        styleNames.push(styles.Cell_Bottom);
    }

    if (y === 0 || y === 1) {
        styleNames.push(styles.Cell_Side);
    }

    const handleClick = () => {
        if (!hasWon) {
            if (turn === Letter.X) {
                setLetterTurn(Letter.O);
            } else {
                setLetterTurn(Letter.X);
            }
            const tempGrid = [...grid];
            tempGrid[x][y].letter = turn;
            setGrid(tempGrid);
            setLetterToShow(turn);
            setTurns(turns + 1);
            setPlaced(x);
        }
    };

    useEffect(() => {
        if (turns >= 5 && placed !== null) {
            const won = checkWin(grid, placed, y);
            if (won) {
                setHasWon(true);
            }
            console.log(won, "won from cell");
        }
    }, [placed]);

    return (
        <div className={styleNames.join(" ")} onClick={handleClick}>
            {letterToShow && <p>{letterToShow}</p>}
            <small className={styles.Cell_Small}>
                x: {x}, y: {y}
            </small>
        </div>
    );
};

export default Cell;
