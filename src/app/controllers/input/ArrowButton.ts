import * as PIXI from 'pixi.js';
import { BasicEvent } from '../../utils/Event';

export enum ButtonState 
{
    Default, Pressed, Hover
}
export class ArrowButton extends PIXI.Graphics
{
    private _isKeyPressed: boolean = false
    public get isKeyPressed() { return this._isKeyPressed}
    public keyPressed: BasicEvent = new BasicEvent();
    private _buttonState: ButtonState = ButtonState.Default
    
    constructor(public keyCode: string, public settings: ButtonSettings)
    {
        
        super();
        this.switchButtonState(ButtonState.Default)
        this.addEventListener("mousedown", () => this.switchButtonState(ButtonState.Pressed))

        this.addEventListener("mouseup", () => this.switchButtonState(ButtonState.Hover))
        this.addEventListener("mouseover", () => this.switchButtonState(ButtonState.Hover))
        this.addEventListener("mouseout", () => this.switchButtonState(ButtonState.Default))

    }

    public switchButtonState(state: ButtonState)
    {
        if (state === ButtonState.Pressed && this._buttonState !== ButtonState.Pressed)
        {
            this.keyPressed.fire();
        }
        this._isKeyPressed = state === ButtonState.Pressed

        const buttonSettings = this.getButtonSettings(state);
        this.drawButton(buttonSettings)
        this._buttonState = state;
    }

    public getButtonSettings(state: ButtonState): BaseButtonSettings
    {
        switch (state)
        {
        case ButtonState.Default:
            return this.settings.base;
        case ButtonState.Hover:
            return this.settings.hover;
        case ButtonState.Pressed:
            return this.settings.pressed
        }
    }

    public drawButton(buttonSettings: BaseButtonSettings)
    {
        this.clear()
        this.circle(0, 0, 50).fill(buttonSettings.circleColor)
        this.poly([0, -20, 20, 0, -20, 0]).fill(buttonSettings.arrowColor)
    }
}

export interface BaseButtonSettings
{
    arrowColor: PIXI.FillInput;
    circleColor: PIXI.FillInput;
}

export interface ButtonSettings
{
    base: BaseButtonSettings;
    hover: BaseButtonSettings;
    pressed: BaseButtonSettings;
}