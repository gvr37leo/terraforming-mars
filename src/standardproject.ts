class StandardProject{
    id:number
    element:StandardProjectElement
    

    constructor(
        public title:string,
        public price:number,
        public boughtCallback:() => void,
        public renderProduct:() => HTMLElement
    ){

    }
}


var globalstandardprojects = [
    new StandardProject('power plant',11,() => {
        var player = game.getActivePlayer()
        player.electricity.production++
    },() => {
        return string2html('<div>electricity production</div>')
    }),
    new StandardProject('asteroid',14,() => {
        var player = game.getActivePlayer()
        game.temperature.current++
        player.terraformingpoints++
        
    },() => {
        return string2html('<div>temperature increase</div>')
    }),
    new StandardProject('aquifer',18,() => {
        var player = game.getActivePlayer()
        game.pickTile(game.getEligibleWaterTiles(),player.id)
        game.listenOnce(EventTypes.tileClick,(e) => {
            //select water tile
            
        })
    },() => {
        return string2html('<div>water tile</div>')
    }),
    new StandardProject('greenery',23,() => {
        var player = game.getActivePlayer()
        game.pickTile(game.getEligibleLandTiles(),player.id)
        game.listenOnce(EventTypes.tileClick,(e) => {
            //select greenery tile
        })
    },() => {
        return string2html('<div>greenery tile</div>')
    }),
    new StandardProject('city',25,() => {
        var player = game.getActivePlayer()
        game.pickTile(game.getEligibleLandTiles(),player.id)
        game.listenOnce(EventTypes.tileClick,(e) => {
            //select city tile
        })
    },() => {
        return string2html('<div>city tile</div>')
    }),
]