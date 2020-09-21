
enum Phases{turnorder,research,action,production}

class Listener{

    constructor(
        public eventype:EventTypes,
        public cb:(e:GameEvent) => void,
    ){

    }

}

let cardTable:Card[] = []

class Game{

    eventQueue:GameEvent[] = []
    listeners:Listener[] = []
    players:Player[] = []
    firsplayerMarker = 0
    playerturnMarker = 0
    deck:number[] = []
    discardpile:number[] = []
    tilegrid:TileSlot[][] = []

    temperature = new Meter(-30,8,2)
    oxygen = new Meter(0,14,1)
    oceansleft = 6

    standardProjects = globalstandardprojects
    milestones = globalmilestones
    awards = globalawards

    generation:QueueBox<number>
    turn:QueueBox<number>
    phase:QueueBox<Phases>
    gameboardElement: GameBoardElement

    constructor(public containerelement:HTMLElement){
        this.generation = new QueueBox(0,this.eventQueue,() => new GameEvent(EventTypes.generationstart,{}))
        this.turn = new QueueBox(0,this.eventQueue,() => new GameEvent(EventTypes.turnstart,{}))
        
        this.phase = new QueueBox(Phases.turnorder,this.eventQueue,(v) => {
            var x:PhaseChangeEvent = {phase:v}
            return new GameEvent(EventTypes.phasechange,x)
        })
    }

    processQueue(){
        while(this.eventQueue.length > 0){
            let event = this.eventQueue.shift()
    
            let listeners = this.listeners.filter(listener => listener.eventype == event.eventType)
            for(let listener of listeners){
                listener.cb(event)
            }
        }
    }

    listen(event:EventTypes,cb:(e:GameEvent) => void){
        this.listeners.push(new Listener(event,cb))
    }

    listenOnce(event:EventTypes,cb:(e:GameEvent) => void){
        let listener = new Listener(event,(e) => {
            remove(this.listeners,listener)
            cb(e)
        })
        this.listeners.push(listener)
    }

    queueEvent(event:GameEvent){
        this.eventQueue.push(event)
    }

    init(){
        this.listen(EventTypes.gamestart, e => {
            cardTable = generateRandomCards(50) 
            this.deck = cardTable.map(c => c.id)
            this.phase.set(Phases.turnorder)
        })
        
        this.listen(EventTypes.phasechange, e => {
            let v = e.data as PhaseChangeEvent
            if(v.phase == Phases.turnorder){
                this.firsplayerMarker = (this.firsplayerMarker + 1) % this.players.length
                this.phase.set(Phases.research)
            }else if(v.phase == Phases.research){
                for(let player of this.players){
                    this.pickCards(this.deck.splice(0,2),0,3,player.id)
                }
                //going to next state is handled in mulliganconfirmed event
            }else if(v.phase == Phases.action){

            }else if(v.phase == Phases.production){
                for(let player of this.players){
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

        this.listen(EventTypes.mulliganConfirmed,(e) => {
            let event = e.data as MulliganConfirmedEvent
            if(this.phase.get() == Phases.research){
                let player = findbyid(this.players,event.playerid)
                player.playerState = PlayerStates.mulliganning

                if(this.players.every(p => p.playerState != PlayerStates.mulliganning)){
                    this.phase.set(Phases.action)
                }
            }
        })

        //action events
        this.listen(EventTypes.pass,(e) => {
            let player = this.getActivePlayer()
            player.passed = true

            //get the first player that hast passed
            //if everyone has passed go to increase generation and go to next phase
            let nexteligebleplayer:Player = null
            for(let i = 0; i < this.players.length - 1; i++){
                let nextplayer = this.players[(this.playerturnMarker + i + 1) % this.players.length]
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
            let event = e.data as PlayCardEvent
            let player = findbyid(this.players,event.playerid)
            let card = removebyid(player.hand,event.cardid)
            player.board.push(card)

        })
        this.listen(EventTypes.standardproject,(e) => {
            let event = e.data as StandardProjectEvent
            let project = findbyid(this.standardProjects,event.projectid)  
            let player = findbyid(this.players,event.playerid)
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

        this.listen(EventTypes.tileplaced,(e) => {
            if(this.checkIfGameFinished()){
                this.queueEvent(new GameEvent(EventTypes.gamefinished,{}))
            }
        })
        this.listen(EventTypes.heatincrease,(e) => {
            if(this.checkIfGameFinished()){
                this.queueEvent(new GameEvent(EventTypes.gamefinished,{}))
            }
        })
        this.listen(EventTypes.oxygenincrease,(e) => {
            if(this.checkIfGameFinished()){
                this.queueEvent(new GameEvent(EventTypes.gamefinished,{}))
            }
        })
        this.listen(EventTypes.gamefinished,(e) => {
            console.log('game finished')
            for(var player of this.players){
                player.totalscore = this.calculatePlayerScore(player)
            }
            
            var sortedplayers = this.players.slice().sort((a,b) => a.totalscore - b.totalscore)
            var winner = last(sortedplayers)
            alert(`and the winner is ${winner.name}`)
            
        })

    }

    pickCards(cardidoptions:number[],min:number,max:number,playerid:number){
        let player = findbyid(this.players,playerid)
        player.playerState = PlayerStates.mulliganning
        player.mulliganHand = cardidoptions.map(id => {
            return {
                selected:false,
                card:id,
            }
        })
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

        
        let companytemplate = document.querySelector('#companytemplate')
        
        
        this.gameboardElement = getgameboardrefs() 
        this.containerelement.appendChild(this.gameboardElement.root)
        //render board

        this.gameboardElement.awards.innerHTML = ''
        for(let award of this.awards){
            award.element = getAwardRefs()
            updateAwardData(award)
            this.gameboardElement.awards.appendChild(award.element.root)
        }

        this.gameboardElement.milestones.innerHTML = ''
        for(let milestone of this.milestones){
            milestone.element = getMilestoneTemplate()
            updateMilestoneData(milestone)
            this.gameboardElement.milestones.appendChild(milestone.element.root)
        }

        this.gameboardElement.standardprojects.innerHTML = ''
        for(let standardproject of this.standardProjects){
            standardproject.element = getStandardprojectTemplate()
            updateStandardprojectData(standardproject)
            this.gameboardElement.standardprojects.appendChild(standardproject.element.root)
        }

        for(let player of this.players){
            player.playerElement = getplayerrefs()
            this.gameboardElement.players.appendChild(player.playerElement.root)

            
            player.money.element = genResourceTemplate()
            player.playerElement.resources.appendChild(player.money.element.root)
            player.metal.element = genResourceTemplate()
            player.playerElement.resources.appendChild(player.metal.element.root)
            player.titanium.element = genResourceTemplate()
            player.playerElement.resources.appendChild(player.titanium.element.root)
            player.forest.element = genResourceTemplate()
            player.playerElement.resources.appendChild(player.forest.element.root)
            player.electricity.element = genResourceTemplate()
            player.playerElement.resources.appendChild(player.electricity.element.root)
            player.heat.element = genResourceTemplate()
            player.playerElement.resources.appendChild(player.heat.element.root)
            

            for(let cardid of player.hand){
                let card = findbyid(cardTable,cardid)
                player.playerElement.board.appendChild(card.cardElement.root)
            }

            for(let cardid of player.board){
                let card = findbyid(cardTable,cardid)
                player.playerElement.board.appendChild(card.cardElement.root)
            }
        }

        updateGameBoardData(this)
    }

    checkIfGameFinished(){
        if(this.oceansleft <= 0 && this.temperature.current >= this.temperature.max && this.oxygen.current >= this.oxygen.max){
            return true
        }else{
            return false
        }
    }

    calculatePlayerScore(player:Player){
        var result = 0
        result += player.terraformingpoints
        for(var cardid of player.board){
            var card = findbyid(cardTable,cardid)
            result += card.victorypoints
            //card.victorypoints should be a callback (certain cards need calculation like the bacteria cards)
        }
        return result
    }
}
