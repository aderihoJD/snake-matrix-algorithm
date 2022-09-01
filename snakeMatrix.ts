export default class SnakeMatrix {

    public static startMatrixBuilding(data: { size: number, phrase: string }): { success: boolean, error?: any } {

        const { size, phrase } = data;

        // let's reate a matrix with empty cells
        const matrix: Array<Array<string>> = Array(size).fill(null).map(() => Array(size).fill(null));
        // let's make a decision about matrix center
        const centerCellNumber: number = Math.ceil(size / 2) - 1;
        // make an array from the phrase
        const phraseArray: string[] = phrase.split('');
        // set up center cell
        matrix[centerCellNumber][centerCellNumber] = phraseArray.shift();

        const filledMatrix: Array<Array<string>> = SnakeMatrix.fillMatrix(matrix, centerCellNumber, phraseArray, size);

        console.table(filledMatrix);
        return { success: true };
    }

    private static fillMatrix(matrix: Array<Array<string>>, centerCellNumber: number, phraseArray: string[], size: number): Array<Array<string>> {

        const startX: number = centerCellNumber;
        const startY: number = centerCellNumber;
        var currentX: number = startX;
        var currentY: number = startY + 1;
        var filledCellsNumber: number = 1;
        const allCellsNumber: number = Math.pow(size, 2);
        var currentMove: string = PossibleSides.RIGHT;

        while (filledCellsNumber !== allCellsNumber) {

            if (matrix[currentX][currentY] === null) {
                matrix[currentX][currentY] = !phraseArray.length ? '+' : phraseArray.shift();
                console.table(matrix);
                filledCellsNumber++;
                switch (currentMove) {
                    case PossibleSides.RIGHT:
                        currentMove = PossibleSides.DOWN;
                        currentX++;
                        break;
                    case PossibleSides.DOWN:
                        currentMove = PossibleSides.LEFT;
                        currentY--;
                        break;
                    case PossibleSides.LEFT:
                        currentMove = PossibleSides.TOP;
                        currentX--;
                        break;
                    case PossibleSides.TOP:
                        currentMove = PossibleSides.RIGHT;
                        currentY++;
                        break;
                }
            } else {
                switch (currentMove) {
                    case PossibleSides.RIGHT:
                        currentY++;
                        // currentX--;
                        break;
                    case PossibleSides.DOWN:
                        currentX++;
                        // currentY--;
                        break;
                    case PossibleSides.LEFT:
                        currentY--;
                        // currentX++;
                        break;
                    case PossibleSides.TOP:
                        currentX--;
                        // currentY++;
                        break;
                }
            }
        }

        return matrix;
    }
}

enum PossibleSides {
    RIGHT = 'right',
    DOWN = 'down',
    LEFT = 'left',
    TOP = 'top',
}

enum AppropriateSide {
    RIGHT = PossibleSides.DOWN,
    DOWN = PossibleSides.LEFT,
    LEFT = PossibleSides.TOP,
    TOP = PossibleSides.RIGHT,
}