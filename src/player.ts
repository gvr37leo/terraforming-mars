
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


class Player{
    id
    hand:Card[]
    board:Card[]

    actions:number
    maxactions:number

    money:Resource
    metal:Resource
    titanium:Resource
    forest:Resource
    electricity:Resource
    heat:Resource

    terraformingpoints:number

}