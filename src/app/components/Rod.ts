import { BoundedContainer } from "../displayElements/BoundedContainer";
import { BackpackItem } from "./BackpackItem";
import * as PIXI from "pixi.js"
import { RodSection } from "./RodSection";
import { DynamicObjectSettings } from "./DynamicObject";

export class Rod extends BackpackItem
{
    private _rodSections: RodSection[] = []
    private get graphics()
    {
        return this._object as PIXI.Graphics
    }

    constructor(settings: DynamicObjectSettings)
    {
        super(settings)
        for (let i=0; i< 50; i++)
        {

            const rodSection = new RodSection();
            this._rodSections.push(rodSection)
        }
        this.drawUpdate();
    }

    public update(container: BoundedContainer)
    {
        super.update(container)
        this._rodSections.forEach((section) => section.update())
        this.drawUpdate();
    }

    protected handleMouseMove(e: PIXI.FederatedMouseEvent)
    {
        if (!this._isDragging.value || !this.parent) { return; }
        this._rodSections[0].updateStartPos(this.toLocal(e.global))
        for (let i=1; i<this._rodSections.length; i++)
        {
            this._rodSections[i].updateStartPos(this._rodSections[i-1].endPos)
        }
    }

    protected drawUpdate()
    {
        console.log("drawing update")
        this.graphics.clear();
        this.graphics.moveTo(this._rodSections[0].startPos.x, this._rodSections[0].startPos.y)
            .lineTo(this._rodSections[0].endPos.x, this._rodSections[0].endPos.y)

        for (let i=1; i<this._rodSections.length; i++)
        {
            this.graphics.lineTo(this._rodSections[i].endPos.x, this._rodSections[i].endPos.y)
                .stroke({ color: "#6b1000", width: 5 })
        }
    }

    protected drawObject()
    {       
        const object = new PIXI.Graphics();   
        this.addChild(object)
        this._object = object       
    }
}