enum EventTypes{
    pass,playcard,standardproject,actioncard,convertplants,convertheat,claimmilestone,fundaward,
    mulligan,
    gamestart,generationstart,turnstart
    ,phasechange
    ,tileClick}

class GameEvent{
    
    constructor(
        public eventType:EventTypes,
        public data:any,
    ){

    }
}

class PhaseChange{
    phase:Phases
}

class PassEvent{
    
    constructor(
        public playerid,
    ){

    }
}

class PlayCardEvent{
    constructor(
        public playerid,
        public cardid,
    ){

    }
}

class StandardProjectEvent{
    constructor(
        public playerid,
        public projectid:number,
    ){

    }
}

class ActionCardEvent{
    constructor(
        public playerid,
        public cardid,
    ){

    }
}

class ConvertPlantsEvent{
    constructor(
        public playerid,
    ){

    }
}

class ConvertHeatEvent{
    constructor(
        public playerid,
    ){

    }
}

class ClaimMilestoneEvent{
    constructor(
        public playerid,
        public milestoneid:number
    ){

    }
}

class FundAwardEvent{
    constructor(
        public playerid,
        public awardid:number
    ){

    }
}

class MulliganEvent{

    constructor(
        public cardoptions:number[],
        public min:number,
        public max:number,
        public playerid:number,
    ){

    }
}

class TileClickEvent{
    constructor(
        public playerid:number,
        public tileid:number,
    ){

    }
}