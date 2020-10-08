class GameEvent extends Knot{
    
    constructor(
        public eventType:string,
        public data:any,
    ){
        super();
    }
}
