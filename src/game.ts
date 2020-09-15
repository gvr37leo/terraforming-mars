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

    milestones//cost 8,8,8 35 terra, 3 cities, 3 trees, 10 buildings, 18 cards (5 vcitory points) can be bought if requirement met
    awards//8,14,20 can be bought anytime, received at end of game -> most land, most money, most science tags, most heat, most metal/titanium

    generation:Box<number> = new Box(0)
    turn:Box<number> = new Box(0)
    phase:Box<Phases> = new Box(Phases.turnorder)
    onCardPlayed = new EventSystem<Card>()
    gameboardElement: GameBoardElement

    constructor(public containerelement:HTMLElement){
        this.deck = generateRandomCards(50)
    }

    processQueue(){
        while(this.eventQueue.length > 0){
            var event = this.eventQueue.shift()
    
            var listeners = this.listeners.filter(listener => listener.eventype == event.eventType)
            for(var listener of listeners){
                listener.cb(event)
            }
        }
    }

    listen(event:EventTypes,cb:(e:GameEvent) => void){
        this.listeners.push(new Listener(event,cb))
    }

    listenOnce(event:EventTypes,cb:(e:GameEvent) => void){
        var listener = new Listener(event,(e) => {
            remove(this.listeners,listener)
            cb(e)
        })
        this.listeners.push(listener)
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
                    this.pickCards([],0,3,player.id)
                    //here
                }

                //set some sort of mulliganning state on the player
                //listen for mulliganfinished events in other listener
                //in that listener check when every player has finished mulliganning and then set action phase
                
                
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

        this.listen(EventTypes.mulliganFinished,(e) => {
            var event = e.data as MulliganFinishedEvent
            if(this.phase.get() == Phases.research){
                var player = findbyid(this.players,event.playerid)
                player.isMulliganning = false

                if(this.players.every(p => p.isMulliganning == false)){
                    this.phase.set(Phases.action)
                }
            }
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
            var card = removebyid(player.hand,event.cardid)
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
        var player = findbyid(this.players,playerid)
        player.isMulliganning = true
        player.mulliganHand = []
        for(var option of options){
            player.mulliganHand.push({
                selected:false,
                card:removebyid(game.deck,option),
            })
        }

        //setup player mulliganstate

        
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

    render(){

        
        var companytemplate = document.querySelector('#companytemplate')
        
        
        this.gameboardElement = this.getgameboardrefs() 
        this.containerelement.appendChild(this.gameboardElement.root)
        //render board

        for(var player of this.players){
            player.playerElement = this.getplayerrefs()
            this.gameboardElement.players.appendChild(player.playerElement.root)

            for(var card of player.hand){
                card.cardElement = this.getcardrefs()
                player.playerElement.board.appendChild(card.cardElement.root)
            }

            for(var card of player.board){
                card.cardElement = this.getcardrefs()
                player.playerElement.board.appendChild(card.cardElement.root)
            }
        }
        //render player
        //render cards
    }

    getgameboardrefs():GameBoardElement{
        var gameboardtemplate = document.querySelector('#gameboardtemplate')
        var html = string2html(gameboardtemplate.innerHTML)

        return {
            root:html,
            oxygenmeter:html.querySelector('#oxygenmeter'),
            standardprojects:html.querySelector('#standardprojects'),
            tileboard:html.querySelector('#tileboard'),
            temperaturemeter:html.querySelector('#temperaturemeter'),
            milestones:html.querySelector('#milestones'),
            awards:html.querySelector('#awards'),
            players:html.querySelector('#players'),
        }
    }

    getplayerrefs():PlayerElement{
        var playertemplate = document.querySelector('#playertemplate')
        var html = string2html(playertemplate.innerHTML)

        return{
            root:html,
            resources:html.querySelector('#resources'),
            cards:html.querySelector('#cards'),
            board:html.querySelector('#board'),
            playerturntoken:html.querySelector('#playerturntoken'),
            playerstarttoken:html.querySelector('#playerstarttoken'),
        }
    }

    getcardrefs():CardElement{
        var cardtemplate = document.querySelector('#cardtemplate')
        var html = string2html(cardtemplate.innerHTML)

        return{
            root:html,
            title:html.querySelector('#title'),
            image:html.querySelector('#image'),
            cardid:html.querySelector('#cardid'),
            effect:html.querySelector('#effect'),
            flavortext:html.querySelector('#flavortext'),
        }
    }
}

class GameBoardElement{
    root: HTMLElement;
    oxygenmeter: Element;
    standardprojects: Element;
    tileboard: Element;
    temperaturemeter: Element;
    milestones: Element;
    awards: Element;
    players: Element;
}

class PlayerElement{
    root: HTMLElement;
    resources: Element;
    cards: Element;
    board: Element;
    playerturntoken: Element;
    playerstarttoken: Element;
}

class CardElement{
    root: HTMLElement;
    title: Element;
    image: Element;
    cardid: Element;
    effect: Element;
    flavortext: Element;
}
