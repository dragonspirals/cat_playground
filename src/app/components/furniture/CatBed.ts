import { BoundedContainer } from "../../displayElements/BoundedContainer";
import { ContainerSettings  } from "../../displayElements/ResizableContainer";
import * as PIXI from 'pixi.js';
import { Cat } from "../Cat";

export class CatBed<TSettings extends CatBedSettings = CatBedSettings> extends BoundedContainer<CatBedSettings>
{
    private _front: PIXI.Sprite;
    private _back: PIXI.Sprite;

    private _cat: Cat | null = null;
    public get cat(): Cat | null { return this._cat}

    constructor(settings: TSettings)
    {
        super(settings)
        this._front = new PIXI.Sprite({texture: PIXI.Texture.from(this._settings.frontAsset)})
        this._back = new PIXI.Sprite({texture: PIXI.Texture.from(this._settings.backAsset)})
        this.addChild(this._front, this._back)
        this._front.zIndex = 1;
        this._back.zIndex = -1
    }

    public addCat(cat: Cat)
    {
        this._cat = cat;
        cat.parent?.removeChild(this._cat);
        this.addChild(cat)
        cat.zIndex = 0;
        cat.enterCatBed()
        cat.position.set(this.width, this.height/2)
        if (!this.scale) { return; }
        cat.scale.x = cat.scale.x/this.scale.x;
        cat.scale.y = cat.scale.y/this.scale.y;
    }
}

export interface CatBedSettings extends ContainerSettings
{
    frontAsset: string;
    backAsset: string;
}