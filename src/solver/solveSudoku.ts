const checkInput = (list: number[][], row: number, col: number, num: number): boolean => {
    //行と列のチェック
    for (let i = 0; i < 9; i++) {
        if ((i !== col && list[row][i] === num) || (i !== row && list[i][col] === num)) {
            return false;
        }
    }
    //ブロックのチェック
    const blockRow = Math.floor(row / 3) * 3;
    const blockCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if ((blockRow + i !== row || blockCol + j !== col) && list[blockRow + i][blockCol + j] === num) {
                return false;
            }
        }
    }
    //ここまでのチェックを抜けたものは入力可能
    return true;
};

//メモを作成する関数
const createMemo = (list: number[][]): Set<number>[][] => {
    const memo = Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => new Set<number>()));
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (list[row][col] === 0) {
                for (let num = 1; num <= 9; num++) {
                    if (checkInput(list, row, col, num)) {
                        memo[row][col].add(num);
                    }
                }
            }
        }
    }
    return memo;
};

//問題が解けているか確認する関数
const isComplete = (list: number[][]): boolean => {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (list[row][col] === 0) {
                return false;
            }
        }
    }
    return true;
};

//再帰的に候補を試す関数
const trial = (list: number[][], memo: Set<number>[][]): boolean => {
    if (isComplete(list)) {
        return true; //全てのセルが埋まっている場合終了
    }
    //最小の候補数を持つセルを見つける
    let minLength = 10;
    let cell: { row: number; col: number } | null = null;
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (memo[row][col].size > 0 && memo[row][col].size < minLength) {
                minLength = memo[row][col].size;
                cell = { row, col };
            }
        }
    }
    //埋められるセルがない場合間違い
    if (cell === null) {
        return false;
    }
    //埋められるセルが存在すればそのセルを対象とする
    const { row, col } = cell;
    //再帰的に処理
    for (const candidate of memo[row][col]) {
        if (checkInput(list, row, col, candidate)) {
            list[row][col] = candidate; //セルに候補を入力
            const newMemo = createMemo(list); //新しいメモを作成
            if (trial(list, newMemo)) {
                return true;
            }
            //仮入力を元に戻す
            list[row][col] = 0;
        }
    }
    return false;
};

//初期盤面が不正でないことの確認をする関数
const isValidInput = (list: number[][]): boolean => {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            const num = list[row][col];
            if (num !== 0) {
                if (!checkInput(list, row, col, num)) {
                    return false; //不正な入力があればfalseを返す
                }
            }
        }
    }
    return true;
};

export const solveSudoku = (cells: number[]): { solved: number[], filledCells: number[] } | false => {
    //一次元配列で渡されたcellsを二次元配列のlistに変換
    const list: number[][] = [];
    for (let i = 0; i < 9; i++) {
        list.push(cells.slice(i * 9, (i + 1) * 9));
    }

    //初期盤面が不正ならfalseを返す
    if (!isValidInput(list)) {
        return false;
    }

    //最初のメモを作成しtrialを実行する
    const memo = createMemo(list);
    const filledCells: number[] = []; //埋められたセルのインデックスを保持
    if (trial(list, memo)) {
        const solved = list.flat(); //一次元配列に戻す
        //埋められたセルのインデックスを収集
        solved.forEach((value, index) => {
            if (cells[index] === 0 && value !== 0) {
                filledCells.push(index);
            }
        })
        return { solved, filledCells };
    } else {
        return false;
    }
};
