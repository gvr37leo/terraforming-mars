import { Knot } from "./knot"

export class Player extends Knot{
    mulliganMin = 0
    mulliganMax = 2
    isMulliganning = false

    passed = false
    actions = 2
    maxactions = 2
    terraformingpoints = 20
    totalscore = 0
}