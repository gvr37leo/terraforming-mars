enum EventTypes{
    pass,playcard,standardproject,actioncard,convertplants,convertheat,claimmilestone,fundaward
    ,mulligan,mulliganConfirmed
    ,gamestart,generationstart,turnstart
    ,phasechange
    ,tileClick
    ,tileplaced,heatincrease,oxygenincrease
    ,gamefinished

}

class GameEvent{
    
    constructor(
        public eventType:EventTypes,
        public data:any,
    ){

    }
}

type GameStartEvent = {

}

type GenerationStartEvent = {

}

type TurnStartEvent = {

}

type PhaseChangeEvent = {
    phase:Phases
}

type PassEvent = {
    playerid
}

type PlayCardEvent = {
    playerid,
    cardid,
}

type StandardProjectEvent = {
    playerid,
    projectid:number,
}

type ActionCardEvent = {
    playerid,
    cardid,
}

type ConvertPlantsEvent = {
    playerid,
}

type ConvertHeatEvent = {
    playerid,
}

type ClaimMilestoneEvent = {
    playerid,
    milestoneid:number
}

type FundAwardEvent = {
    playerid,
    awardid:number
}

type MulliganEvent = {

    cardoptions:number[],
    min:number,
    max:number,
    playerid:number,
}

type MulliganConfirmedEvent = {

    playerid:number,
    chosencards:number[],
}

type TileClickEvent = {
    playerid:number,
    tileid:number,
}