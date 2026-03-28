import { ColorSource, Graphics, Size, Sprite, Texture } from "pixi.js";
import { ContainerSettings, ResizableContainer } from "../displayElements/ResizableContainer";
import { DynamicObject } from "./DynamicObject";
type BackpackItem = 
{
    item: DynamicObject;
    isStashed: boolean;
}

export class Backpack extends ResizableContainer<BackpackSettings>
{
    private _backpackImage!: Sprite;
    private _background: Graphics = new Graphics();
    private _items: BackpackItem[] = [];

    constructor(protected _settings: BackpackSettings)
    {
        super(_settings)
        this.createElements();
        this.setPivotFromAnchor(_settings.background.size.width, _settings.background.size.height);
    }

    public resize(width: number, height: number)
    {
        this.position.set(-width/2, height/2)
        this.moveStashedItems()
    }

    public addToBackpack(element: DynamicObject)
    {
        this._items.push({item: element, isStashed: true});
        if (!element.parent || !this.parent){ return; }
        element.position = this.parent?.toGlobal(this.position)
    }

    public stashAll()
    {
        this._items = this._items.map((item) => ({ ...item, isStashed: true}))
        this.moveStashedItems();
    }

    private moveStashedItems()
    {
        let startingPosition = this.position.x + this._backpackImage.width + 50;
        this._items.forEach((item) => 
        {  
            if (!item.item.parent || !item.isStashed){ return; }
            item.item.zIndex = this.zIndex + 1;
            item.item.position.set(startingPosition, this.position.y - 60 );
            item.item.speed = { x: 0, y: 0 }
            startingPosition += item.item.width;
        })
    }

    private createElements()
    {
        const { backpackAsset, background } = this._settings
        this._backpackImage = new Sprite({texture: Texture.from(backpackAsset), scale: 0.09});
        this._backpackImage.eventMode = "static";
        this._backpackImage.cursor = "pointer"
        this._backpackImage.on("click", () => this.stashAll());
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