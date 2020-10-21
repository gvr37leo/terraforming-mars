import { Card } from './models/card'
import {GameEvent} from './models/events'
import {Game} from './models/game'
import { Knot } from './models/knot'
import { Meter } from './models/meter'
import { Player } from './models/player'
import { Resource } from './models/resource'

class EventQueue{
    listeners:{ eventtype: string; cb: (data: any) => void; }[]
    events:GameEvent[]

    constructor(){
        this.listeners = []
        this.events = []
    }

    listen(eventtype:string,cb:(data:any) => void){
        this.listeners.push({
            eventtype,
            cb,
        })
    }

    process(){
        while(this.events.length > 0){
            try {
                let current = this.events.shift()
                var listeners = this.listeners.filter(l => l.eventtype == current.eventtype)
                for(var listener of listeners){
                    listener.cb(current.data)
                }
            } catch (error) {
                console.log(error)
            }
            
        }
    }
    
    add(eventtype:string,data:any){
        this.events.push({
            eventtype,
            data,
        } as any)
    }

    addAndTrigger(eventtype:string,data:any){
        this.add(eventtype,data)
        this.process()
    }
}



export class GameManager{
    eventqueue = new EventQueue()
    gameknot: Game
    oxygenmeter: Meter
    heatmeter: Meter

    constructor(public gamedata:Knot[]){
        this.gameknot = this.gamedata.find(k => k.objdef == 'game') as any
        this.oxygenmeter = this.gamedata.find(k => k.name == 'oxygenmeter') as any
        this.heatmeter = this.gamedata.find(k => k.name == 'heatmeter') as any
        
    }

    getChildrenOfFolder(foldername:string){
        var folder = this.gamedata.find(k => k.name == foldername)
        var children = this.gamedata.filter(k => k.parent == folder._id)
        return children
    }

    



    listenForGameEvents(){
        //get gamedata from server
        //process it
        //delete all nodes beneath game(only nescessary if nodes are deleted)(could also just keep track of deletedknodes and only delele those)
        //upsert it back to database

        var events = searchData('/game,{"_id":9}/eventsfolder/event',this.gamedata)
        this.eventqueue.events.push(...events)
    
    
        this.eventqueue.listen('gamestart',(e) => {
            this.setPhase('turnorder')
        })
    
        this.eventqueue.listen('phasechange',(data) => {
            var phase = data.phase
            var players = searchData('playerfolder/player',this.gamedata)
            if(phase == 'turnorder'){
                this.gameknot.firsplayerMarker = (this.gameknot.firsplayerMarker + 1) % players.length
                this.setPhase('research')
            }else if(phase == 'research'){
                var deck = searchData('game/deckfolder/card',this.gamedata).map(k => k._id)
                for(let player of players){
                    this.pickCards(deck.splice(0,4),0,4,player._id)
                }
            }else if(phase == 'action'){
                //is entered via mulliganconfirmed event when everyone has confirmed their mulligan
                //for now nothing actually happens at action phase start
                //is exited when everyone hass passed
            }else if(phase == 'production'){
                for(let player of players){
                    player.passed = false
                    produceresource(player.metal)
                    produceresource(player.money)
                    produceresource(player.titanium)
                    produceresource(player.forest)
                    produceresource(player.electricity)
                    produceresource(player.heat)
                }
                //could do some animations but for now just go to next phase immediatly
                this.setPhase('turnorder')
            }
        })
    
        //meant for the researchphase mulligan(dont know how to do generic card selection)
        this.eventqueue.listen('mulliganConfirmed',(e) => {
            var player = searchData(`player,{"_id":${e.player}}`,this.gamedata)[0] as Player
            player.isMulliganning = false

            //todo move cards in mulliganfolder to hand or discardpile
            //make player pay for cards
            //check if everyone is done if so move to next phase
        })
    
        this.eventqueue.listen('pass',(e) => {
            var players = searchData('playerFolder/player',this.gamedata)
            let player = this.getActivePlayer()
            player.passed = true

            //get the first player that hast passed
            //if everyone has passed go to increase generation and go to next phase
            let nexteligebleplayer:Player = null
            for(let i = 0; i < players.length - 1; i++){
                let nextplayer = players[(this.gameknot.playerturnMarker + i + 1) % players.length]
                if(nextplayer.passed == false){
                    nexteligebleplayer = nextplayer
                }
            }
            if(nexteligebleplayer == null){
                this.setPhase('production')
            }else{
                this.gameknot.playerturnMarker = (this.gameknot.playerturnMarker + 1) % players.length
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
                this.eventqueue.add('gamefinished',{})
            }
        })
    
        this.eventqueue.listen('heatincrease',(e) => {
            if(this.checkIfGameFinished()){
                this.eventqueue.add('gamefinished',{})
            }
        })
    
        this.eventqueue.listen('oxygenincrease',(e) => {
            if(this.checkIfGameFinished()){
                this.eventqueue.add('gamefinished',{})
            }
        })
    
        this.eventqueue.listen('gamefinished',(e) => {
            console.log('game finished')
            var players:Player[] = searchData('playerFolder/player',this.gamedata) as any
            for(var player of players){
                player.totalscore = this.calculatePlayerScore(player)
            }
            
            var sortedplayers = players.slice().sort((a,b) => a.totalscore - b.totalscore)
            var winner = last(sortedplayers)
            alert(`and the winner is ${winner.name}`)
        })
    }

    getActivePlayer(){
        var players:Player[] = searchData('playerFolder/player',this.gamedata) as any
        return players[this.gameknot.playerturnMarker]
    }

    setPhase(phase:string){
        this.gameknot.phase = phase
        this.eventqueue.add('phasechange',{phase})
    }
    
    pickCards(cardidoptions:number[],min:number,max:number,playerid:number){
        
        let player = searchData(`player,{"_id":${playerid}}`,this.gamedata)[0] as Player
        let playermulliganfolder = searchData(`player,{"_id":${playerid}}/mulliganfolder`,this.gamedata)[0]
        // let cards = searchData(`game/deckfolder/card`,this.gamedata) as Card[]
        var cards = cardidoptions.map(cardid => this.gamedata.find(k => k._id == cardid)) as Card[]
        player.isMulliganning = true
        player.mulliganMin = min
        player.mulliganMax = max
        cards.forEach(c => {
            c.parent = playermulliganfolder._id
            c.mulliganselected = false
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
        var cards = searchData('player,{id:9}/board/card',this.gamedata)
        for(var card of cards){
            result += card.victorypoints
        }
        return result
    }
}


function produceresource(resource:Resource){
    resource.instock += resource.production
}

//searchData('/player,{id:9}/hand/card')

function createQuery(query:string):any[]{
    var parts = query.split('/')

    var res = parts.map(part => {
        var splittedparts = part.split(',')
        
        if(splittedparts.length == 1){
            return {
                objdef:splittedparts[0]
            }
        }
        if(splittedparts.length == 2){
            var jsondata = JSON.parse(splittedparts[1])
            jsondata.objdef = splittedparts[0]
            return jsondata
        }
    })
    return res
}

function searchData(querystring:string,knots:Knot[]):any[]{
    var query = createQuery(querystring)
    var parentSet = new Set<string>()
    var firstpart = query[0]

    if(query.length == 1){
        return knots.filter(k => equals(firstpart,k))
    }
    knots.filter(k => equals(firstpart,k)).forEach(k => parentSet.add(k._id))
    var childknots:Knot[]
    
    for(var i = 1; i < query.length;i++){
        childknots = knots.filter(k => equals(query[i],k) && parentSet.has(k.parent))
        parentSet = new Set<string>()
        childknots.forEach(k => parentSet.add(k._id))
    }

    return childknots
}

function equals(query,object){
    for(var prop in query){
        if(query[prop] != object[prop]){
            return false
        }
    }
    return true
}

function last(arr){
    return arr[arr.length - 1]
}