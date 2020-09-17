class Milestone{
    claimedBy:number
    element:MilestoneElement
    constructor(
        public title:string,
        public rule:(player:Player) => boolean,
    ){

    }
}

//cost 8,8,8 35 terra, 3 cities, 3 trees, 10 buildings, 18 cards (5 vcitory points) can be bought if requirement met
var globalmilestones:Milestone[] = [
    new Milestone('terraformer', (p) => {
        return p.terraformingpoints >= 35
    }),
    new Milestone('mayor', (p) => {
        //scan board for city tiles belonging to player
        var nCityTiles = 5
        return nCityTiles >= 3
    }),
    new Milestone('gardener', (p) => {
        //scan board for forest tiles belonging to player
        var nForestTiles = 5
        return nForestTiles >= 3
    }),
    new Milestone('builder', (p) => {
        //scan for cards on board with the building tag
        return p.board.length >= 9
    }),
    new Milestone('planner', (p) => {
        return p.hand.length >= 16
    }),
]