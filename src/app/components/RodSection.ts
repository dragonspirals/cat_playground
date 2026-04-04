import * as VECTOR from "../utils/Vector";

export class RodSection
{
    private _radius: number = 10
    private _startPos: VECTOR.Position = { x: 0, y: 0 }
    public get startPos() : VECTOR.Position { return this._startPos}
    private _endPos: VECTOR.Position = { x: 0, y: this._radius }
    public get endPos() { return this._endPos }
    
    constructor() { }

    public update()
    {
    }

    public updateStartPos(startPos: VECTOR.Position)
    {
        const direction = VECTOR.Subtract(this._endPos, startPos)
        const distance = VECTOR.Magnitude(direction)
        const newEndPos = { x: direction.x * this._radius/distance + startPos.x, y: direction.y * this._radius/distance + startPos.y}
        this._startPos = startPos
        const movement = VECTOR.Subtract(this._endPos, newEndPos)
        if (movement.x !== 0 || movement.y !== 0) { console.log(movement) }
        this._endPos = newEndPos
    }
}