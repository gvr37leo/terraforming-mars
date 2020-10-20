import { Knot } from "./knot";

export class GameEvent extends Knot{
    
    constructor(
        public eventtype:string,
        public data:any,
    ){
        super();
    }
}
