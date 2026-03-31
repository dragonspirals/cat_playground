import { BackpackItem } from "../../components/BackpackItem";
import { BallVertical } from "../../components/BallVertical";
import { DynamicObject } from "../../components/DynamicObject";
import { BoundedContainer } from "../../displayElements/BoundedContainer";
import { handleDynamicCollision, handleStaticCollision } from "../../utils/Vector";

export enum CollisionType { Static, Dynamic, Dynamic3D }

export class CollisionEngine
{
    private _trackedStaticObjects: BoundedContainer[] = [];
    private _trackedDynamicObjects: DynamicObject[] = [];
    private _trackedDynamic3DObjects: BallVertical[] = [];
    public get trackedObjects() 
    { 
        return [
            ...this._trackedDynamic3DObjects, 
            ...this._trackedDynamicObjects, 
            ...this._trackedStaticObjects
        ]
    }

    public startTracking(object: BoundedContainer | DynamicObject | BallVertical)
    {
        if (object instanceof BallVertical) { this._trackedDynamic3DObjects.push(object) }
        else if (object instanceof DynamicObject) { this._trackedDynamicObjects.push(object)}
        else { this._trackedStaticObjects.push(object) }
    }

    public update()
    {
        for (let i=0; i<this.trackedObjects.length-1; i++)
        {
            for (let j=i+1; j<this.trackedObjects.length; j++)
            {
                if (this.trackedObjects[i].isIntersecting(this.trackedObjects[j]))
                {
                    this.handleCollision(this.trackedObjects[i], this.trackedObjects[j])
                }
            }
        }
    }

    public handleCollision(a: BoundedContainer, b: BoundedContainer)
    {
        const isStashedBackpackItem = (el: BoundedContainer) => el instanceof BackpackItem && (el as BackpackItem).isStashed.value;
        if (isStashedBackpackItem(a) || isStashedBackpackItem(b)){ return; }
        const isADynamic = a instanceof DynamicObject;
        const isBDynamic = b instanceof DynamicObject;
        if (!isADynamic && !isBDynamic) { return; }
        if (isADynamic && isBDynamic)
        {
            handleDynamicCollision(a, b);
            return;
        }
        const dynamicObj = isADynamic ? a : b as DynamicObject;
        const staticObj = isADynamic ? b : a as BoundedContainer;
        handleStaticCollision(dynamicObj, staticObj)
    }
}
