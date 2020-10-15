import { Knot } from "./knot"

export class Meter extends Knot{
    current:number
    min:number
    max:number
    stepsize:number
}