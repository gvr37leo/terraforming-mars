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

class Game{
    deck:Card[]
    discardpile:Card[]
    tilegrid

    temperature:number
    oxygen:number
    oceansleft:number


    awards//cost 8,8,8 35 terra, 3 cities, 3 trees, 10 buildings, 18 cards (5 vcitory points) can be bought if requirement met
    milestontes//8,14,20 can be bought anytime, received at end of game -> most land, most money, most science tags, most heat, moest metal/titanium

    generation:Box<number> = new Box(0)
    turn:Box<number> = new Box(0)
    phase:Box<Phases> = new Box(Phases.turnorder)
    onCardPlayed = new EventSystem<Card>()

    start(){
        this.phase.afterChange.listen((v) => {
            if(v == Phases.turnorder){

            }


            if(v == Phases.turnorder){
                
            }

            if(v == Phases.turnorder){
                
            }

            if(v == Phases.turnorder){
                
            }
        })


        this.phase.set(Phases.turnorder)
        
    }
}

//phases
//turn order -> first player marker moves

//buy cards,choose from 4 price 3

//actions
//play card
//standard project(inefficent buy)
//action card
//convert 8 plants
//convert 8 heat
//claim milestone 5vp
//fund award 5vp,2vp

//production


//event based
//events list
//generation start
//generation end

//turn start
//end