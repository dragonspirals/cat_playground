import { Observable } from "../../utils/Observable";
import { Backpack } from "./Backpack";
import { DynamicObject, DynamicObjectSettings } from "../physicsObjects/DynamicObject";

export class BackpackItem<TSettings extends BackpackItemSettings = BackpackItemSettings> extends DynamicObject<TSettings>
{
    public isStashed: Observable<boolean> = new Observable(true);
    protected _backpack!: Backpack;

    constructor(settings: TSettings)
    {
        super(settings);
        this._isDragging.onChanged(() => this.zIndex = (this._isDragging.value || this.isStashed ? this._backpack.zIndex + 1 : 0))
        this.isStashed.onChanged((stashed) => this.handleStashed(stashed));
        this.scale = this.settings.stashedScale ?? 1
    }

    public setBackpack(backpack: Backpack)
    {
        this._backpack = backpack
    }

    protected handleMouseUp()
    {
        this._isDragging.value = false;
        if (!this._backpack) { return; }
        this.isStashed.value = this.isIntersecting(this._backpack);
        this.zIndex = this.isStashed.value ? this._backpack.zIndex + 1 : 0
        this.scale = this.isStashed.value ?  this.settings.stashedScale ?? 1 : 1
    }

    protected handleStashed(isStashed?: boolean): void 
    {
        this.scale = isStashed ? this.settings.stashedScale ?? 1 : 1;
    }

    protected startDragging()
    {
        super.startDragging();
        if (!this._backpack) { return; }
        this.zIndex = this._backpack.zIndex + 1 ;
        this.scale = 1
    }
}

export interface BackpackItemSettings extends DynamicObjectSettings
{
    stashedScale?: number;
}