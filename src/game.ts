
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

    eventQueue:GameEvent[] = []
    listeners:Listener[] = []
    players:Player[] = []
    firsplayerMarker = 0
    playerturnMarker = 0
    deck:Card[] = []
    discardpile:Card[] = []
    tilegrid:TileSlot[][] = []

    temperature = new Meter(-30,8,2)
    oxygen = new Meter(0,14,1)
    oceansleft:number = 6

    standardProjects:StandardProject[] = globalstandardprojects

    
    milestones = globalmilestones
    awards = globalawards

    generation:Box<number> = new Box(0)
    turn:Box<number> = new Box(0)
    phase:Box<Phases> = new Box(Phases.turnorder)
    onCardPlayed = new EventSystem<Card>()
    gameboardElement: GameBoardElement

    constructor(public containerelement:HTMLElement){
        
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

    init(){
        //update event to add to event queue
        //mulligan
        //actions
        this.listen(EventTypes.gamestart, e => {
            this.deck = generateRandomCards(50)
            for(var player of this.players){
                player.hand = player.hand.concat(this.deck.splice(0,2)) 
            }
        })
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
                player.playerState = PlayerStates.mulliganning

                if(this.players.every(p => p.playerState != PlayerStates.mulliganning)){
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
            project.boughtCallback()
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
        player.playerState = PlayerStates.mulliganning
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
        
        
        this.gameboardElement = getgameboardrefs() 
        this.containerelement.appendChild(this.gameboardElement.root)
        //render board

        this.gameboardElement.awards.innerHTML = ''
        for(var award of this.awards){
            award.element = getAwardRefs()
            updateAwardData(award)
            this.gameboardElement.awards.appendChild(award.element.root)
        }

        this.gameboardElement.milestones.innerHTML = ''
        for(var milestone of this.milestones){
            milestone.element = getMilestoneRefs()
            updateMilestoneData(milestone)
            this.gameboardElement.milestones.appendChild(milestone.element.root)
        }

        this.gameboardElement.standardprojects.innerHTML = ''
        for(var standardproject of this.standardProjects){
            standardproject.element = getStandardprojectRefs()
            updateStandardprojectData(standardproject)
            this.gameboardElement.standardprojects.appendChild(standardproject.element.root)
        }

        for(var player of this.players){
            player.playerElement = getplayerrefs()
            this.gameboardElement.players.appendChild(player.playerElement.root)

            
            player.money.element = getResourceRefs()
            player.playerElement.resources.appendChild(player.money.element.root)
            player.metal.element = getResourceRefs()
            player.playerElement.resources.appendChild(player.metal.element.root)
            player.titanium.element = getResourceRefs()
            player.playerElement.resources.appendChild(player.titanium.element.root)
            player.forest.element = getResourceRefs()
            player.playerElement.resources.appendChild(player.forest.element.root)
            player.electricity.element = getResourceRefs()
            player.playerElement.resources.appendChild(player.electricity.element.root)
            player.heat.element = getResourceRefs()
            player.playerElement.resources.appendChild(player.heat.element.root)
            

            for(var card of player.hand){
                card.cardElement = getcardrefs()
                player.playerElement.board.appendChild(card.cardElement.root)
            }

            for(var card of player.board){
                card.cardElement = getcardrefs()
                player.playerElement.board.appendChild(card.cardElement.root)
            }
        }

        updateGameBoardData(this)
    }

    
}
