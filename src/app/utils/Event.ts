
export type Callback = () => unknown
export type ValuedCallback<T> = (val?: T) => unknown

export class BasicEvent
{
    private _handlers: {resolve: Callback, reject?: Callback}[] = []

    public on(resolve: Callback, reject?: Callback)
    {
        this._handlers.push({resolve, reject});
    }

    public fire()
    {
        this._handlers.forEach((handler) => handler.resolve())
    }
}

export class ValuedEvent<T>
{
    private _handlers: {resolve: ValuedCallback<T>, reject?: ValuedCallback<T>}[] = []

    public on(resolve: ValuedCallback<T>, reject?: ValuedCallback<T>)
    {
        this._handlers.push({resolve, reject});
    }

    public fire(val: T)
    {
        this._handlers.forEach((handler) => handler.resolve(val))
    }
}