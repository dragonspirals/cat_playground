import * as PIXI from 'pixi.js';
import { BasicEvent } from '../../utils/Event';

export class ArrowButton extends PIXI.Graphics
{
    private _isKeyPressed: boolean = false
    public get isKeyPressed() { return this._isKeyPressed}
    public keyPressed: BasicEvent = new BasicEvent();
    
    constructor(public keyCode: string, public settings: ButtonSettings)
    {
        
        super();
        this.drawButton();
        this.addEventListener("mousedown", () => {
            if (!this._isKeyPressed) { this.keyPressed.fire() }
            this._isKeyPressed = true;
        })

        this.addEventListener("mouseup", () => {
            this._isKeyPressed = false
        })
    }

    public drawButton()
    {
        this.circle(0, 0, 50).fill(this.settings.circleColor)
        this.poly([0, -20, 20, 0, -20, 0]).fill(this.settings.arrowColor)
    }
}

export interface ButtonSettings
{
    arrowColor: PIXI.FillInput;
    circleColor: PIXI.FillInput;
}