class TileSlot{
    tile:Tile
    type = ['ocean','ground']
    // resources
    cards
    metal
    plants
    titanium

    // reserved
    phobos
    noctis
    ganymede
    
}

class Tile{
    owner
    sea
    city
    forest
}

class Meter{
    current = 0

    constructor(
        public min:number,
        public max:number,
        public stepsize:number,
    ){
        this.current = min
    }
}


enum Phases{turnorder,research,action,production}

class Listener{

    constructor(
        public eventype:EventTypes,
        public cb:(e:GameEvent) => void,
    ){

    }

}

/*
Game
    TileBoard
    Temp
    Oxygen
    Corporations
    Awards
    Milestones
    Deck
        Card
    DiscardPile
        Card
    Players
        Player1
            TerraFormPoints
            Corporation
            Resources
            Hand
                Card
            Field
                Card

*/




class Game{


    //list of events to process
    //pass
    //play card
    //standard project(inefficent buy)
    //action card
    //convert 8 plants
    //convert 8 heat
    //claim milestone 5vp
    //fund award 5vp,2vp

    eventQueue:GameEvent[]
    listeners:Listener[]
    players:Player[] = []
    firsplayerMarker = 0
    playerturnMarker = 0
    deck:Card[] = []
    discardpile:Card[] = []
    tilegrid:TileSlot[][] = []

    temperature = new Meter(-30,8,2)
    oxygen = new Meter(0,14,1)
    oceansleft:number = 6

    standardProjects:StandardProject[] = []

    milestontes//cost 8,8,8 35 terra, 3 cities, 3 trees, 10 buildings, 18 cards (5 vcitory points) can be bought if requirement met
    awards//8,14,20 can be bought anytime, received at end of game -> most land, most money, most science tags, most heat, most metal/titanium

    generation:Box<number> = new Box(0)
    turn:Box<number> = new Box(0)
    phase:Box<Phases> = new Box(Phases.turnorder)
    onCardPlayed = new EventSystem<Card>()


    processQueue(){
        var event = this.eventQueue.shift()

        var listeners = this.listeners.filter(listener => listener.eventype == event.eventType)
        for(var listener of listeners){
            listener.cb(event)
        }
    }

    listen(event:EventTypes,cb:(e:GameEvent) => void){
        this.listeners.push(new Listener(event,cb))
    }

    queueEvent(event:GameEvent){
        this.eventQueue.push(event)
    }

    start(){
        //update event to add to event queue
        //mulligan
        //actions

        this.listen(EventTypes.phasechange, e => {
            var v:Phases = e.data as any
            if(v == Phases.turnorder){
                this.firsplayerMarker = (this.firsplayerMarker + 1) % this.players.length
                this.phase.set(Phases.research)
            }


            if(v == Phases.research){

                
                for(var player of this.players){
                    this.pickCards([0,1,2,3],0,3,player.id)
                }

                //set some sort of mulliganning state on the player
                //listen for mulligan events
                //continue when everyone has mulliganned
                this.phase.set(Phases.action)
            }

            if(v == Phases.action){

            }

            if(v == Phases.production){
                for(var player of this.players){
                    player.passed = false
                    player.metal.produce()
                    player.money.produce()
                    player.titanium.produce()
                    player.forest.produce()
                    player.electricity.produce()
                    player.heat.produce()
                }
                //could do some animations but for now just go to next phase immediatly
                this.phase.set(Phases.turnorder)
                //production
            }
        })

        this.listen(EventTypes.mulligan,(e) => {

        })

        //action events
        this.listen(EventTypes.pass,(e) => {
            var player = this.getActivePlayer()
            player.passed = true

            //get the first player that hast passed
            //if everyone has passed go to increase generation and go to next phase
            var nexteligebleplayer:Player = null
            for(var i = 0; i < this.players.length - 1; i++){
                var nextplayer = this.players[(this.playerturnMarker + i + 1) % this.players.length]
                if(nextplayer.passed == false){
                    nexteligebleplayer = nextplayer
                }
            }
            if(nexteligebleplayer == null){
                this.phase.set(Phases.production)
            }else{
                this.playerturnMarker = (this.playerturnMarker + 1) % this.players.length
                //playerturn change event
            }
        })
        this.listen(EventTypes.playcard,(e) => {
            //remove card from hand
            var event = e.data as PlayCardEvent
            var player = findbyid(this.players,event.playerid)
            var card = remove(player.hand,event.cardid)
            player.board.push(card)

        })
        this.listen(EventTypes.standardproject,(e) => {
            var event = e.data as StandardProjectEvent
            var project = findbyid(this.standardProjects,event.projectid)  
            var player = findbyid(this.players,event.playerid)
            player.money.instock -= project.price
            project.cb()
        })
        this.listen(EventTypes.actioncard,(e) => {
            
        })
        this.listen(EventTypes.convertplants,(e) => {
            
        })
        this.listen(EventTypes.convertheat,(e) => {
            
        })
        this.listen(EventTypes.claimmilestone,(e) => {
            
        })
        this.listen(EventTypes.fundaward,(e) => {
            
        })
        //end action events

        this.phase.afterChange.listen((v) => {
            this.queueEvent(new GameEvent(EventTypes.phasechange,v))
        })
        this.phase.set(Phases.turnorder)
        
    }

    pickCards(options:number[],min:number,max:number,playerid:number){
        //trigger some sort of event for player to listen too
        //trigger another event when player is done picking for game to listen too
        return []
    }

    pickTile(tiles:number[],playerid:number){
        
    }

    getEligibleWaterTiles():number[]{
        return []
    }

    getEligibleLandTiles():number[]{
        return []
    }

    getActivePlayer(){
        return this.players[this.playerturnMarker]
    }
}
