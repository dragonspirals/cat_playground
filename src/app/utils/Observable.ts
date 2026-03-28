import { BasicEvent } from "./Event";

export class Observable<T>
{
    private _value: T
    private _onChangedEvent: BasicEvent = new BasicEvent();
    public get value() 
    { 
        return this._value; 
    }
    public set value(val: T) 
    { 
        if (val === this._value) { return; }
        this._value = val; 
        this._onChangedEvent.fire()
    }

    constructor(initialValue: T)
    {
        this._value = initialValue
    }

    public onChanged(callback: () => unknown )
    {
        this._onChangedEvent.on(callback)
    }
}