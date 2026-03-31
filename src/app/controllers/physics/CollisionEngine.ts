import { BackpackItem } from "../../components/BackpackItem";
import { DynamicObject } from "../../components/DynamicObject";
import { BoundedContainer } from "../../displayElements/BoundedContainer";
import { handleDynamicCollision, handleStaticCollision } from "../../utils/Vector";

export class CollisionEngine
{
    public trackedObjects: BoundedContainer[] = [];

    public startTracking(object: BoundedContainer)
    {
        this.trackedObjects.push(object)
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
