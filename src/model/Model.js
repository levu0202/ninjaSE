

export class Room
{
    constructor(rowNum, colNum, keysNum)
    {
        this.rowNum = rowNum;
        this.colNum = colNum;
        this.keysNum = keysNum;
        this.cells = []
        for (let rowIndex = 0; rowIndex < rowNum; rowIndex ++)
        {
            this.cells[rowIndex] = [];
            for (let colIndex = 0; colIndex < colNum; colIndex ++)
            {
                this.cells[rowIndex][colIndex] = new Cell(rowIndex, colIndex)
            }
        }


    }
}


export class Ninja
{
    constructor(rowPos, colPos)
    {
        this.rowPos = rowPos;
        this.colPos = colPos;
        this.key = null;
    }
    move(direction)
    {
        this.rowPos += direction.ur;
        this.colPos += direction.uc;
    }   
}

export class Cell
{
    constructor(rowPos, colPos)
    {
        this.rowPos = rowPos
        this.colPos = colPos
        this.isWall = false;
        this.door = null
        this.key = null;
    }
}

export class Door
{
    constructor(color)
    {
        this.color = color
    }
}



export class Key
{
    constructor(rowPos, colPos, color)
    {
        this.rowPos = rowPos;
        this.colPos = colPos;
        this.color = color;
    }

}


export class Movement
{
    constructor(ur, uc)
    {
        this.ur = ur;
        this.uc = uc;
    }
    parse(s)
    {
        if ((s === "Down") || (s === "down")) { return Down; }
        if ((s === "Up") || (s === "up")) { return Up; }
        if ((s === "Left") || (s === "left" )) { return Left; }
        if ((s === "Right") || (s === "right")) { return Right;}
        return noMovement;
    }

}

export const Down = new Movement(1, 0, 'down');
export const Up = new Movement(-1 , 0, 'up');
export const Left = new Movement(0, -1, 'left');
export const Right = new Movement(0, 1, 'right');
export const noMovement = new Movement(0, 0, '*');

export class Model
{
    constructor(info)
    {
        this.initialize(info);
        this.info = info;
        this.win = false;
    }
    initialize(info)
    {
        let rowNum = parseInt(info.rows);
        let colNum = parseInt(info.columns);
        let keysNum = parseInt(info.keys.length);
        this.Room = new Room(rowNum, colNum, keysNum);
        for (let rowIndex = 0; rowIndex < this.Room.rowNum; rowIndex ++)
        {
            for (let colIndex = 0; colIndex < this.Room.colNum; colIndex ++)
            {
                for (let wallsIndex = 0; wallsIndex < info.walls.length; wallsIndex ++)
                {
                    if (rowIndex === info.walls[wallsIndex].row && colIndex === info.walls[wallsIndex].column)
                    {
                        this.Room.cells[rowIndex][colIndex].isWall = true;
                    }
                }
                for (let keyIndex = 0; keyIndex < info.keys.length; keyIndex ++)
                {
                    if (rowIndex === info.keys[keyIndex].row && colIndex === info.keys[keyIndex].column)
                    {
                        this.Room.cells[rowIndex][colIndex].key = new Key(rowIndex, colIndex, info.keys[keyIndex].color);
                    }
                }
                for (let doorIndex = 0; doorIndex < info.doors.length; doorIndex ++)
                {
                    if (rowIndex === info.doors[doorIndex].row && colIndex === info.doors[doorIndex].column)
                    {
                        this.Room.cells[rowIndex][colIndex].isWall = true;
                        this.Room.cells[rowIndex][colIndex].door = new Door(info.doors[doorIndex].color)
                    }
                }
                
            }
        }


        this.Ninja = new Ninja(info.ninjase.row, info.ninjase.column)
        this.moveCount = 0;
        this.won = false
        
    }


    getMoveNum()
    {
        return this.moveCount;
    }

    canChangeNinjaPos(direction)
    {
        if (this.Ninja.rowPos + direction.ur === this.Room.rowNum || this.Ninja.rowPos + direction.ur < 0 ) {return false;}
        if (this.Ninja.colPos + direction.uc === this.Room.colNum || this.Ninja.colPos + direction.uc < 0 ) {return false;}
        if (this.Room.cells[this.Ninja.rowPos + direction.ur][this.Ninja.colPos + direction.uc].isWall) {
            if (this.Room.cells[this.Ninja.rowPos + direction.ur][this.Ninja.colPos + direction.uc].door !== null &&
                this.Ninja.key !== null &&
                this.Room.cells[this.Ninja.rowPos + direction.ur][this.Ninja.colPos + direction.uc].door.color ===
                this.Ninja.key.color)
                {
                    this.unlockWall(direction)
                }
            else
            {
                return false;  
            }
        }
        return true;
    }


    unlockWall(direction)
    {
        this.Room.cells[this.Ninja.rowPos + direction.ur][this.Ninja.colPos + direction.uc].isWall = false;
        this.Room.cells[this.Ninja.rowPos + direction.ur][this.Ninja.colPos + direction.uc].door = null;
        this.Ninja.key = null;
        this.Room.keysNum -= 1;
        if (this.Room.keysNum === 0)
        {
            this.win = true;
        }
    }

    isWon()
    {
        return this.win;
    }

    getKey()
    {
        if (this.Room.cells[this.Ninja.rowPos][this.Ninja.colPos].key === null)
        {
            return;
        }
        if (this.Ninja.key !== null)
        {
            let exchangeKey = this.Ninja.key
            this.Ninja.key = this.Room.cells[this.Ninja.rowPos][this.Ninja.colPos].key
            this.Room.cells[this.Ninja.rowPos][this.Ninja.colPos].key = exchangeKey

        }
        else
        {
            this.Ninja.key = this.Room.cells[this.Ninja.rowPos][this.Ninja.colPos].key
            this.Room.cells[this.Ninja.rowPos][this.Ninja.colPos].key = null
        }
        this.moveCount += 1;
    }



}
