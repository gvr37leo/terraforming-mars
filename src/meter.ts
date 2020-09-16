class Meter{
    current = 0

    constructor(
        public min:number,
        public max:number,
        public stepsize:number,
    ){
        this.current = min
    }
}