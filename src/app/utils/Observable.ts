import { ValuedCallback, ValuedEvent } from "./Event";

export class Observable<T>
{
    private _value: T
    private _onChangedEvent: ValuedEvent<T> = new ValuedEvent();
    public get value() 
    { 
        return this._value; 
    }
    public set value(val: T) 
    { 
        if (val === this._value) { return; }
        this._value = val; 
        this._onChangedEvent.fire(val)
    }

    constructor(initialValue: T)
    {
        this._value = initialValue
    }

    public onChanged(callback: ValuedCallback<T> )
    {
        this._onChangedEvent.on(callback)
    }
}