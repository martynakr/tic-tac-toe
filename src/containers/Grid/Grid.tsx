import { useEffect, useState } from "react";
import { ICell } from "../../components/Cell/Cell";
import Cell from "../../components/Cell/Cell";
import styles from "./Grid.module.scss";

export enum Letter {
    X = "X",
    O = "O",
}

const Grid = () => {
    const [grid, setGrid] = useState<ICell[][] | null>(null);
    let forKey = 0;
    const [letterTurn, setLetterTurn] = useState<Letter>(Letter.X);
    const [turns, setTurns] = useState<number>(0);
    const [hasWon, setHasWon] = useState<boolean>(false);
    const [playAgain, setPlayAgain] = useState<number>(0);
    useEffect(() => {
        let setUpGrid: ICell[][] = [[], [], []];
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                setUpGrid[i][j] = { x: i, y: j, letter: null, id: forKey };
                forKey++;
            }
        }
        setGrid(setUpGrid);
    }, [playAgain]);

    useEffect(() => {
        console.log(grid);
    }, [grid]);

    const handleClick = () => {
        setPlayAgain(playAgain + 1);
        setHasWon(false);
        setTurns(0);
    };

    return (
        <div>
            <p>{turns}</p>
            <h2>{letterTurn}'s turn</h2>
            {grid &&
                grid.map((cell: ICell[], i: number) => {
                    return (
                        <div className={styles.Grid_Row} key={i}>
                            {cell &&
                                cell.map((c: ICell) => {
                                    return (
                                        <Cell
                                            key={c.id}
                                            letter={null}
                                            x={c.x}
                                            y={c.y}
                                            turn={letterTurn}
                                            setLetterTurn={setLetterTurn}
                                            grid={grid}
                                            setGrid={setGrid}
                                            turns={turns}
                                            setTurns={setTurns}
                                            hasWon={hasWon}
                                            setHasWon={setHasWon}
                                        />
                                    );
                                })}
                        </div>
                    );
                })}
            {hasWon && (
                <>
                    <h2>
                        {letterTurn === Letter.O ? Letter.X : Letter.O} is the
                        winner!
                    </h2>
                    <button onClick={handleClick}>PLAY AGAIN</button>
                </>
            )}
            {turns === 9 && !hasWon && (
                <>
                    <h2>It's a draw</h2>
                    <button onClick={handleClick}>PLAY AGAIN</button>
                </>
            )}
        </div>
    );
};

export default Grid;
