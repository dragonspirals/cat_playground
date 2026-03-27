import { ColorSource, Graphics, Size, Sprite, Texture } from "pixi.js";
import { ContainerSettings, ResizableContainer } from "../displayElements/ResizableContainer";

export class Backpack extends ResizableContainer<BackpackSettings>
{
    private _backpackImage!: Sprite;
    private _background: Graphics = new Graphics();
    private _items: ResizableContainer[] = [];

    constructor(protected _settings: BackpackSettings)
    {
        super(_settings)
        this.createElements();
        this.setPivotFromAnchor(_settings.background.size.width, _settings.background.size.height);
    }

    public resize()
    {
        this._items.forEach((element, index) => 
        {  
            if (!element.parent){ return; }
            element.position.set(this.position.x + (index + 3) * 70, this.position.y - 60 )
        })
    }

    public addToBackpack(element: ResizableContainer)
    {
        this._items.push(element);
        if (!element.parent || !this.parent){ return; }
        element.position = this.parent?.toGlobal(this.position)
    }

    private createElements()
    {
        const { backpackAsset, background } = this._settings
        this._backpackImage = new Sprite({texture: Texture.from(backpackAsset), scale: 0.09});
        this.addChild(this._background, this._backpackImage)
        this._background.roundRect(0, 0, background.size.width, background.size.height, background.radius).fill(background.color ?? "#ffffffbb")
    }
}

export interface BackpackSettings extends ContainerSettings
{
    backpackAsset: string;
    background:
    {
        color?: ColorSource;
        size: Size;
        radius?: number
    }
}

export const defaultBackpackSettings: BackpackSettings =
{
    backpackAsset: "backpack.png",
    anchor: { x: 0.45, y: 1.6 },
    background:
    {
        size: { width: 500, height: 100 },
        radius: 20
    }
}