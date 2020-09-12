
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
    hand:Card[]
    board:Card[]

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


}