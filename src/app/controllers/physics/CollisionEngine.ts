import { BoundedContainer } from "../../displayElements/BoundedContainer";

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
                    this.trackedObjects[i].handleCollision(this.trackedObjects[j]);
                    this.trackedObjects[j].handleCollision(this.trackedObjects[i]);
                }
            }
        }
    }
}