import { ContainerSettings, ResizableContainer } from "../../displayElements/ResizableContainer";
import { BasicEvent } from "../../utils/Event";
import { ArrowButton, ButtonSettings } from "./ArrowButton";
export class OnScreenInput extends ResizableContainer<OnScreenInputSettings>
{
    public trackedKeys: ArrowButton[] = [];
    public onTrackedKeyPressed: BasicEvent = new BasicEvent();
    public upButton: ArrowButton
    public downButton: ArrowButton;
    public leftButton: ArrowButton;
    public rightButton: ArrowButton;

    public get pressedKeys(): string[]
    {
        return this.trackedKeys.filter((key) => key.isKeyPressed).map((keyState) => keyState.keyCode)
    }

    constructor(settings: OnScreenInputSettings)
    {
        super(settings)
        this.upButton = this.createKey("ArrowUp", 0);
        this.downButton = this.createKey("ArrowDown", Math.PI)
        this.leftButton = this.createKey("ArrowLeft", -Math.PI/2)
        this.rightButton = this.createKey("ArrowRight", Math.PI/2)
    }

    public isKeyPressed(keyCode: string): boolean | null
    {
        const keyState = this.getKeyState(keyCode);
        if (!keyState){ return null; }
        return keyState.isKeyPressed;
    }

    public createKey(keyCode: string, rotation: number): ArrowButton
    {
        const button = new ArrowButton(keyCode, this._settings.buttons)
        this.addChild(button)
        button.pivot.set(0, 85)
        button.rotation = rotation;
        this.trackedKeys.push(button)
        button.keyPressed.on(() => this.onTrackedKeyPressed.fire())
        return button
    }

    public untrackKey(keyCode: string)
    {
        const keyToUntrack = this.getKeyState(keyCode);
        if (!keyToUntrack) { return; }
        keyToUntrack.keyPressed.clearHandlers();
        this.trackedKeys = this.trackedKeys.filter((key) => key.keyCode !== keyCode)
    }

    public getKeyState(keyCode: string): ArrowButton | undefined
    {
        return this.trackedKeys.find((key) => key.keyCode === keyCode);
    }


}

export interface OnScreenInputSettings extends ContainerSettings
{
    buttons: ButtonSettings
}

export const defaultOnScreenInput: OnScreenInputSettings = 
{
    buttons:
    {
        circleColor: { color: "rgba(241, 124, 144, 0.46)"},
        arrowColor: { color: "rgb(56, 4, 28)"}
    }
}