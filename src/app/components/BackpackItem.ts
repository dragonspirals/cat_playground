import { Observable } from "../utils/Observable";
import { Backpack } from "./Backpack";
import { DynamicObject } from "./DynamicObject";

export class BackpackItem extends DynamicObject
{
    private _isStashed: Observable<boolean> = new Observable(true)
    public get isStashed() { return this._isStashed.value}

    public checkStashed(backpack: Backpack)
    {
        if (this.isIntersecting(backpack)) { this._isStashed.value = true}
    }
}