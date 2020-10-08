class EventQueue{
    listeners
    events:GameEvent[]

    constructor(){
        this.listeners = []
        this.events = []
    }

    listen(a,b){

    }

    process(){

    }

    addAndTrigger(type:string,data:any){

    }
}



class GameManager{
    eventqueue = new EventQueue()
    gameknot: Game
    oxygenmeter: Meter
    heatmeter: Meter

    constructor(public gamedata:Knot[]){
        this.gameknot = this.gamedata.find(k => k.name == 'game') as any
        this.oxygenmeter = this.gamedata.find(k => k.name == 'oxygenmeter') as any
        this.heatmeter = this.gamedata.find(k => k.name == 'heatmeter') as any
        
    }

    getChildrenOfFolder(foldername:string){
        var folder = this.gamedata.find(k => k.name == foldername)
        var children = this.gamedata.filter(k => k.parent == folder._id)
        return children
    }

    



    processGameEvents(){
        var events = this.getChildrenOfFolder('eventsfolder')
        this.eventqueue.events.push(...events)
    
    
        this.eventqueue.listen('gamestart',(e) => {
            //shuffle cards
            //phase = turnorder
        })
    
        this.eventqueue.listen('phasechange',(e) => {
            var phase = e.data
            if(phase == 'turnorder'){
                this.firsplayerMarker = (this.firsplayerMarker + 1) % this.players.length
                this.phase.set(Phases.research)
            }else if(phase == 'research'){
                for(let player of this.players){
                    this.pickCards(this.deck.splice(0,2),0,3,player.id)
                }
            }else if(phase == 'action'){
                //is entered via mulliganconfirmed event when everyone has confirmed their mulligan
                //for now nothing actually happens at action phase start
                //is exited when everyone hass passed
            }else if(phase == 'production'){
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
            }
        })
    
        this.eventqueue.listen('mulliganConfirmed',(e) => {
    
        })
    
        this.eventqueue.listen('pass',(e) => {
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
    
        this.eventqueue.listen('playcard',(e) => {
            //check if card is in hand of player
            //remove card from hand
            //make player pay for card(with chosen resources)//check if allowed
            //add card to board
            //activate cards playeffect
        })
    
        this.eventqueue.listen('standardproject',(e) => {
            //do any of the 8 standard projects
        })
    
        this.eventqueue.listen('actioncard',(e) => {
            //tap card
            //activate cards effect
        })
    
        this.eventqueue.listen('convertplants',(e) => {
            //remove plants from player
            //increase oxygen, causes oxygen increase event
            
        })
    
        this.eventqueue.listen('convertheat',(e) => {
            //remove heat from player
            //increase temp, causes temp increase event
        })
    
        this.eventqueue.listen('claimmilestone',(e) => {
            //claim milestone
        })
    
        this.eventqueue.listen('fundaward',(e) => {
            //fund award
        })
    
        this.eventqueue.listen('tileplaced',(e) => {
            if(this.checkIfGameFinished()){
                this.eventqueue.addAndTrigger('gamefinished',{})
            }
        })
    
        this.eventqueue.listen('heatincrease',(e) => {
            if(this.checkIfGameFinished()){
                this.eventqueue.addAndTrigger('gamefinished',{})
            }
        })
    
        this.eventqueue.listen('oxygenincrease',(e) => {
            if(this.checkIfGameFinished()){
                this.eventqueue.addAndTrigger('gamefinished',{})
            }
        })
    
        this.eventqueue.listen('gamefinished',(e) => {
            console.log('game finished')
            var players:Player[] = this.searchData('playerFolder/player') as any
            for(var player of players){
                player.totalscore = this.calculatePlayerScore(player)
            }
            
            var sortedplayers = players.slice().sort((a,b) => a.totalscore - b.totalscore)
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
    
    checkIfGameFinished(){
        if(this.gameknot.oceansleft <= 0 && this.heatmeter.current >= this.heatmeter.max && this.oxygenmeter.current >= this.oxygenmeter.max){
            return true
        }else{
            return false
        }
    }
    
    calculatePlayerScore(player:Player){
        
        var result = 0
        result += player.terraformingpoints
        var cards = searchData('player[id:9]/board/card',this.gamedata)
        for(var card of cards){
            result += card.victorypoints
        }
        return result
    }
}

function searchData(query:string,knots:Knot[]):any[]{
    var parentSet = new Set<string>()
    var queryparts = query.split('/')
    var firstpart = queryparts[0]

    knots.filter(k => k.objdef == firstpart).forEach(k => parentSet.add(k._id))
    var childknots:Knot[]
    for(var i = 1; i < queryparts.length;i++){
        childknots = knots.filter(k => k.objdef == queryparts[i] && parentSet.has(k.parent))
        parentSet = new Set<string>()
        childknots.forEach(k => parentSet.add(k._id))
    }

    return childknots
}