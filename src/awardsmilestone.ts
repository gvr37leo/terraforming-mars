class StandardProject{
    id:number

    constructor(
        public title:string,
        public price:number,
        public cb:() => void,
    ){

    }
}

class Award{
    id:number

    constructor(
        public title:string,
        public funded:boolean,
    ){
        
    }
}



class Milestone{
    claimedBy:number

    constructor(
        public title:string,
        public rule:(player:Player) => boolean,
    ){

    }
}

var globalstandardprojects = [
    new StandardProject('power plant',11,() => {
        var player = game.getActivePlayer()
        player.electricity.production++
    }),
    new StandardProject('asteroid',14,() => {
        var player = game.getActivePlayer()
        game.temperature.current++
        player.terraformingpoints++
        
    }),
    new StandardProject('aquifer',18,() => {
        var player = game.getActivePlayer()
        game.pickTile(game.getEligibleWaterTiles(),player.id)
        game.listenOnce(EventTypes.tileClick,(e) => {
            //select water tile
            
        })
    }),
    new StandardProject('greenery',23,() => {
        var player = game.getActivePlayer()
        game.pickTile(game.getEligibleLandTiles(),player.id)
        game.listenOnce(EventTypes.tileClick,(e) => {
            //select greenery tile
        })
    }),
    new StandardProject('city',25,() => {
        var player = game.getActivePlayer()
        game.pickTile(game.getEligibleLandTiles(),player.id)
        game.listenOnce(EventTypes.tileClick,(e) => {
            //select city tile
        })
    }),
]



var milestones:Milestone[] = [
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