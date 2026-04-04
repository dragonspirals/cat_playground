import { Position } from "../../utils/Vector";
import { StringSettings, ToyString } from "./ToyString";
import * as PIXI from 'pixi.js'

export class CatWand<TSettings extends CatWandSettings = CatWandSettings> extends ToyString<TSettings>
{
    private _rodTip: Position;
    private _rodBase: Position;
    private _mouse: PIXI.Graphics = new PIXI.Graphics();
    constructor(settings: TSettings)
    {
        super(settings);
        this._rodTip = settings.rod.tip;
        this._rodBase = settings.rod.base;
        this.addChild(this._mouse)
    }

    protected drawUpdate()
    {
        this.graphics.clear();
        this.graphics.moveTo(this._startPosition.x + this._rodBase.x, this._startPosition.y + this._rodBase.y)
            .lineTo(this._startPosition.x + this._rodTip.x, this._startPosition.y + this._rodTip.y)
            .stroke(this.settings.rod.stroke)
            .lineTo(this._rodSections[0].endPos.x + this._rodTip.x, this._rodSections[0].endPos.y + this._rodTip.y)

        for (let i=1; i<this._rodSections.length; i++)
        {
            this.graphics.lineTo(this._rodSections[i].endPos.x + this._rodTip.x, this._rodSections[i].endPos.y + this._rodTip.y)
                .stroke(this.settings.stroke)
        }
        const lastSect = this._rodSections[this._rodSections.length -1]
        this._mouse.position.set(lastSect.endPos.x + this._rodTip.x, lastSect.endPos.y + this._rodTip.y)
        this._mouse.clear()
            .rotateTransform(-lastSect.theta)
            .ellipse(0,0, 10, 20)
            .fill({ color: "#999999"})
    }

}

export interface CatWandSettings extends StringSettings
{
    rod: 
    {
        stroke: PIXI.StrokeInput;
        tip: Position;
        base: Position;
    }
    
}