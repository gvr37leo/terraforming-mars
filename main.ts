/// <reference path="node_modules/vectorx/vector.ts" />
/// <reference path="node_modules/utilsx/utils.ts" />
/// <reference path="EventSystem.ts" />

import { Box, EventSystem } from "./EventSystem"



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

var tags = ['science','microbe','animal','earth','jupiter','electricity','titanium','event','city','plant']

class Card{
    rules//oxygen/heat/water min/max restriction (maybe make table for rules with id's and description to make rendering easier)
    id
    cost
    victorypoints
    tags:string[]
    microbes
    animals
    image
    onplay

    isTapped
    action
    passiveEffect//listen could be set in immediateeffect
    immediateEffect// like gain 25 metal (how to render on card// or do something with html templating and text description, ~rte with text,images and magic strings~)
}

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



enum Phases{turnorder,research,action,production}
enum EventTypes{pass,playcard,standardproject,actioncard,convertplants,convertheat,claimmilestone,fundaward,mulligan,gamestart,generationstart,turnstart}

class GameEvent{
    eventType:EventTypes
    data:number[]
    datajson:any
}

class PassEvent{

}

class PlayCardEvent{
    
}

class Game{

    eventQueue
    //list of events to process
    //pass
    //play card
    //standard project(inefficent buy)
    //action card
    //convert 8 plants
    //convert 8 heat
    //claim milestone 5vp
    //fund award 5vp,2vp


    players:Player[] = []
    firsplayerMarker = 0
    deck:Card[] = []
    discardpile:Card[] = []
    tilegrid:TileSlot[][] = []

    temperature:number = -12
    oxygen:number = 0
    oceansleft:number = 6


    awards//cost 8,8,8 35 terra, 3 cities, 3 trees, 10 buildings, 18 cards (5 vcitory points) can be bought if requirement met
    milestontes//8,14,20 can be bought anytime, received at end of game -> most land, most money, most science tags, most heat, most metal/titanium

    generation:Box<number> = new Box(0)
    turn:Box<number> = new Box(0)
    phase:Box<Phases> = new Box(Phases.turnorder)
    onCardPlayed = new EventSystem<Card>()

    start(){
        this.phase.afterChange.listen((v) => {
            if(v == Phases.turnorder){
                this.firsplayerMarker = (this.firsplayerMarker + 1) % this.players.length
                this.phase.set(Phases.research)
                //turn order -> first player marker moves
            }


            if(v == Phases.research){
                for(var player of this.players){
                    this.pickCards([],0,3,player.id)
                }
                //listen for pickcards event (this doesnt have to be synchronous)

                //buy cards,choose from 4 price 3
                //show 4 cards to all people

                //after everyone hase chosen and paid for their cards
                this.phase.set(Phases.action)
            }

            if(v == Phases.action){

                //pass
                //play card
                //standard project(inefficent buy)
                //action card
                //convert 8 plants
                //convert 8 heat
                //claim milestone 5vp
                //fund award 5vp,2vp

                //listen for these events at all times but only do something with them if in the right phase
            }

            if(v == Phases.production){
                for(var player of this.players){
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


        this.phase.set(Phases.turnorder)
        
    }

    pickCards(options:number[],min:number,max:number,playerid:number){
        //trigger some sort of event for player to listen too
        //trigger another event when player is done picking for game to listen too
        return []
    }
}

var game = new Game()

game.players.push(new Player())