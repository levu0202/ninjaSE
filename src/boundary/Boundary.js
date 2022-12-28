
var BOXSIZE = 100
const SPACE = 8
const SPACEFORSMALLSQUARE = 20
const SPACEFORMEDIUMBOX = 10
const BLACKCOR = "black"
const WHITECOR = "white"
const NINJAPOS = 100
const NINJASPACE = 50
const NINJACOR = "purple"

export class Square
{
    constructor(x, y , size)
    {
        this.x = x
        this.y = y
        this.size = size
    }
}


export class NinjaSE
{
    constructor(x, y)
    {
        this.x = x
        this.y = y
    }
}

export function getSquare(cell)
{
    return new Square(BOXSIZE*cell.colPos + SPACE, BOXSIZE*cell.rowPos + SPACE, BOXSIZE - 2*SPACE, BOXSIZE-2*SPACE)
}

export function getNinjase(cell)
{
    return new NinjaSE(NINJAPOS*cell.colPos + NINJASPACE,  NINJAPOS*cell.rowPos + NINJASPACE)
}


export function reDrawCanvas(model, canvasObj)
{
    const ctx = canvasObj.getContext('2d')
    ctx.clearRect(0, 0, canvasObj.width, canvasObj.height)

    let numRow = model.Room.rowNum
    let numCol = model.Room.colNum

    ctx.fillStyle = BLACKCOR

    for (let rowIndex = 0; rowIndex < numRow; rowIndex ++)
    {
        for (let colIndex = 0; colIndex < numCol; colIndex ++)
        {
            let cell = model.Room.cells[rowIndex][colIndex]
            let square = getSquare(cell)
            let modelNinja = model.Ninja
            let ninjaSe = getNinjase(modelNinja)

            ctx.beginPath()
            ctx.rect(square.x, square.y, square.size, square.size)  
            if (cell.key !== null)
            {   
                ctx.fillStyle = cell.key.color;    
                ctx.fillRect(square.x + SPACEFORSMALLSQUARE, square.y + SPACEFORSMALLSQUARE, square.size/2, square.size/2)
            }

            if (cell.isWall)
            {
                ctx.fillStyle = BLACKCOR
                ctx.fillRect(square.x, square.y, square.size, square.size)
                if (cell.door !== null)
                {
                    ctx.fillStyle = cell.door.color
                    ctx.fillRect(square.x + SPACEFORMEDIUMBOX, square.y +SPACEFORMEDIUMBOX, square.size * 0.75, square.size * 0.75)
                    ctx.fillStyle = WHITECOR
                    ctx.fillRect(square.x + SPACEFORSMALLSQUARE, square.y + SPACEFORSMALLSQUARE, square.size/2, square.size/2)
                }
            }

            

            ctx.stroke()
            ctx.beginPath()
            if (rowIndex === modelNinja.rowPos && colIndex === modelNinja.colPos)
            {
                ctx.arc(ninjaSe.x, ninjaSe.y, 25, 0, 2 * Math.PI, false);
                ctx.fillStyle = NINJACOR;
                ctx.fill()
                if (modelNinja.key !== null)
                {
                    ctx.beginPath()
                    ctx.arc(ninjaSe.x, ninjaSe.y, 10, 0, 2 * Math.PI, false);
                    ctx.fillStyle = modelNinja.key.color
                    ctx.fill()
                }
            }

        }
    }
}