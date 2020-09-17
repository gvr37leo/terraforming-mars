
class Corporation{
    tags
    startmoney

    action
    effect
}

class Resource{
    element:ResourceElement

    constructor(
        public name:string,
        public minimumProduction:number,
        public production:number,
        public instock:number,
        public moneyvalue:number,
    ){

    }

    produce(){
        this.instock += this.production
    }
}

enum PlayerStates{mulliganning,selectingtile,normal}

class Player{
    
    
    hand:number[] = []
    board:number[] = []
    mulliganHand:{selected:boolean,card:number}[] = []
    mulliganMin = 0
    mulliganMax = 2

    passed:boolean = false
    actions:number = 2
    maxactions:number = 2
    terraformingpoints:number = 20
    totalscore = 0

    

    money:Resource = new Resource('money',-5,10,0,1)
    metal:Resource = new Resource('metal',0,0,0,2)
    titanium:Resource = new Resource('titanium',0,0,0,3)
    forest:Resource = new Resource('forest',0,0,0,0)
    electricity:Resource = new Resource('electricity',0,0,0,0)
    heat:Resource = new Resource('heat',0,0,0,0)
    playerElement: PlayerElement

    playerState:PlayerStates = PlayerStates.normal


    constructor(
        public id:number,
        public name:string,
    ){
        // this.hand.push(new Card('',[],1,1,[],() => {},() => null))
        // this.board.push(new Card('',[],1,1,[],() => {},() => null))
    }
}