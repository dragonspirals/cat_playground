import * as VECTOR from "../../utils/Vector";

export class RodSection
{
    public get startPos() : VECTOR.Position { return this._startPos }
    public get endPos() { return this._endPos }
        
    private _theta: number = 0;
    private _rotationalVelocity: number = 0;
    public get theta() 
    { 
        const direction = VECTOR.Subtract(this._endPos, this._startPos);
        if (direction.y === 0) { return Math.PI/2}
        const angle = Math.atan(direction.x/direction.y)
        if (direction.y < 0)
        {
            return Math.PI + angle
        }
        return angle
    }
    constructor(private _radius: number, private _startPos: VECTOR.Position, private _endPos: VECTOR.Position, public gravity: number = 0.02) { }

    public update()
    {
        const acceleration = Math.sin(this._theta) * this.gravity/this._radius
        this._rotationalVelocity -= acceleration;
        this._theta -=acceleration 
        const x = this._radius * Math.sin(this._theta) + this._startPos.x
        const y = this._radius * Math.cos(this._theta) + this._startPos.y
        this._endPos = {x, y}
    }

    public updateStartPos(startPos: VECTOR.Position)
    {
        if (this._startPos === startPos || (startPos.x === this._endPos.x && startPos.y === this._endPos.y)) { return; }
        const direction = VECTOR.Subtract(this._endPos, startPos)
        const distance = VECTOR.Magnitude(direction)
        this._startPos = startPos;
        this._endPos = { x: direction.x * this._radius/distance + startPos.x, y: direction.y * this._radius/distance + startPos.y}
        this._theta = this.theta
    }

    public reset(startPos: VECTOR.Position)
    {
        this._startPos = startPos
        this._endPos = {x: this._startPos.x, y: this._startPos.y + this._radius}
        this._rotationalVelocity = 0
    }
}