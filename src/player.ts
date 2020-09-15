
class Corporation{
    tags
    startmoney

    action
    effect
}

class Resource{
    minimumProduction
    production
    instock
    moneyvalue

    produce(){
        this.instock += this.production
    }
}

enum PlayerStates{mulliganning,selectingtile,normal}

class Player{
    id
    name:string
    hand:Card[] = []
    board:Card[] = []

    passed:boolean
    actions:number
    maxactions:number
    terraformingpoints:number

    playerState:PlayerStates

    money:Resource
    metal:Resource
    titanium:Resource
    forest:Resource
    electricity:Resource
    heat:Resource
    playerElement: PlayerElement

    isMulliganning: boolean
    mulliganHand:{selected:boolean,card:Card}[] = []


    constructor(){
        this.hand.push(new Card('',[],1,1,[],() => {},() => null))
        this.board.push(new Card('',[],1,1,[],() => {},() => null))
    }
}