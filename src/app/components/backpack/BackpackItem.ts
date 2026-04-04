import { Observable } from "../../utils/Observable";
import { Backpack } from "./Backpack";
import { DynamicObject, DynamicObjectSettings } from "../physicsObjects/DynamicObject";

export class BackpackItem<TSettings extends DynamicObjectSettings = DynamicObjectSettings> extends DynamicObject<TSettings>
{
    public isStashed: Observable<boolean> = new Observable(true);
    protected _backpack!: Backpack;

    constructor(settings: TSettings)
    {
        super(settings);
        this._isDragging.onChanged(() => this.zIndex = (this._isDragging.value || this.isStashed ? this._backpack.zIndex + 1 : 0))
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
    }

    protected startDragging()
    {
        super.startDragging();
        if (!this._backpack) { return; }
        this.zIndex = this._backpack.zIndex + 1 ;
    }
}