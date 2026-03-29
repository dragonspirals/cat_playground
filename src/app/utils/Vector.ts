import { DynamicObject } from "../components/DynamicObject";
import { BoundedContainer } from "../displayElements/BoundedContainer";

export interface Position { x: number, y: number }
export interface Polar { r: number, theta: number }

export const Dot = (a: Position, b: Position) => a.x * b.x - a.y * b.y
export const CartesianToPolar = (p: Position): Polar => 
{
    if (p.x === 0 && p.y === 0) { return {r: 0, theta: 0} }
    return {r: Magnitude(p), theta: AngleOf(p)}
}
export const PolarToCartesian = (p: Polar): Position => 
{
    if (p.r === 0) { return {x: 0, y: 0}}
    return {x: p.r * Math.cos(p.theta), y: p.r * Math.sin(p.theta)}
}

export function Magnitude(x: number, y: number): number
export function Magnitude(a: Position): number
export function Magnitude(p1: number | Position, p2?: number): number
{
    const isXY = typeof p1 === "number";
    const x = isXY ? p1 : (p1 as Position).x;
    const y: number = isXY ? p2 as number : (p1 as Position).y 
    return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
}

export const  AngleOf = (p: Position): number => Math.atan(p.y/p.x)
export const AtoB = (a: Position, b: Position) => ({x: b.x - a.x, y: b.y - a.y})

export const Multiply = (v: Position, c: number) => ({x: c*v.x, y: c*v.y})
export const Add = (a: Position, b: Position) => ({x: a.x + b.x, y: a.y + b.y})
export const Subtract = (a: Position, b: Position) => Add(a, Multiply(b, -1))

export function getObj1NewSpeed(obj1: DynamicObject, obj2: DynamicObject): Position
{
    const relativePosition = AtoB(obj1.position, obj2.position)
    const distance = Magnitude(relativePosition);
    const relativeVelocity = AtoB(obj1.speed, obj2.speed)
    const aa = Dot(relativeVelocity, relativePosition)/Math.pow(distance, 2);
    const nnn = Multiply(relativePosition, aa)
    return Subtract(obj2.speed, nnn)
}

export function handleDynamicCollision(obj1: DynamicObject, obj2: DynamicObject): void
{
    const newObj1Speed = getObj1NewSpeed(obj1, obj2)
    const newObj2Speed = getObj1NewSpeed(obj2, obj1)
    obj1.speed = newObj1Speed
    obj2.speed = newObj2Speed
}

export function handleStaticCollision(dynamicObj: DynamicObject, staticObj: BoundedContainer)
{
    const relativePosition = AtoB(dynamicObj.position, staticObj.position);
    const speed = Magnitude(dynamicObj.speed)
    const polarNormal = CartesianToPolar(relativePosition);
    const polarIncoming = CartesianToPolar(dynamicObj.speed)
    const polarOutgoing = {r: speed, theta: -2 * polarNormal.theta + polarIncoming.theta }
    dynamicObj.speed = PolarToCartesian(polarOutgoing)
}