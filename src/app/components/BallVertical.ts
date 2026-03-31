import { Ball, BallSettings } from "./Ball";
import { BoundedContainer } from "../displayElements/BoundedContainer";

export class BallVertical<TSettings extends BallVerticalSettings> extends Ball<TSettings>
{
    public gravity = 0.98;
    public get left() { return this.position.x - this._object.width/2 - this.pivot.x }
    public get right() { return this.position.x + this._object.width/2 - this.pivot.x }
    public get top() { return this.position.y - this._object.height/2 - this.pivot.y + this._height/2 }
    public get bottom() { return this.position.y + this._object.height/2 - this.pivot.y }

    private _height: number = 0
    public set height(val: number)
    {
        const deltaHeight = val - this._height;
        this._object.position.y -= deltaHeight;
        this._height = val;
    }

    constructor(_settings:TSettings)
    {
        super(_settings)
        this._isDragging.onChanged(() => 
        {
            if (this._settings.pickUpHeight && this._settings.pickUpHeight > 0 && this._isDragging.value)
            {
                this.height = this._settings.pickUpHeight
            }
        });
        this.isStashed.onChanged(() =>{ if (this.isStashed.value) { this.height = 0}})
    }

    public update(container: BoundedContainer)
    {
        if (this._isDragging.value) { return; }
        super.update(container);
        this.speed.z = this.getNewZSpeed();
        this.height = Math.max(0, this._height - this.speed.z)
        this._object.rotation += this.speed.x / (Math.PI * this.settings.radius)
    }

    private getNewZSpeed(): number
    {
        if (this._height > this.gravity){ return this.speed.z + this.gravity }
        if (Math.abs(this.speed.z) < this.gravity) { return 0; }
        return -Math.sqrt(this.physicsProps.restitution) * this.speed.z
    }
    
}

export interface BallVerticalSettings extends BallSettings
{
    pickUpHeight?: number
}