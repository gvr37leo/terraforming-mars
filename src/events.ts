enum EventTypes{pass,playcard,standardproject,actioncard,convertplants,convertheat,claimmilestone,fundaward,mulligan,gamestart,generationstart,turnstart,phasechange}

class GameEvent{
    eventType:EventTypes
    data:any
}

class PhasChange{
    phase:Phases
}

class PassEvent{
    playerid
}

class PlayCardEvent{
    playerid
    cardid
}

class MulliganEvent{

}