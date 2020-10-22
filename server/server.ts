import {initGame} from './src/gameinit'
import {GameManager} from './src/gamelogic'
import express from 'express'
// import bp from 'body-parser'

var port = 8000
var app = express()
app.use(express.json())
// app.use(bp.urlencoded({ extended: true }))
app.use(express.static('../client'))

var gamedata:any[] = []
var gamemanager:GameManager
reset()

app.listen(port, () => {
    console.log(`listening on localhost:${port}` )
})

app.get('/api/getgame', (req,res) => {
    res.send(gamemanager.gamedata)
})

app.post('/api/pushevent',(req,res) => {
    gamemanager.eventqueue.addAndTrigger(req.body.type,req.body.data)
    res.send(gamemanager.gamedata)
})

app.post('/api/reset',(req,res) => {
    reset()
    res.send(gamedata)
})

function reset(){
    
    gamedata = initGame()
    gamemanager = new GameManager(gamedata)
    gamemanager.listenForGameEvents()
    gamemanager.eventqueue.addAndTrigger('gamestart',{})
}



//database structure

/*
server
    lobbys:Lobby[]
        players:Guest[]
            cookieid
            ready?
            name
        
        
        game:Game
            events:event[]
                type:string
                data:any
            generation:number
            phase:string
            firstplayerMarker:number
            playerturnmarker:number
            o2meter:Meter
                min:number
                max:number
                step:number
                current:number
            heatmeter:Meter
            tilegrid:TileSpot[]
                tileSpot
                    type:ocean,ground

                tile:Tile
                    owner:Player
                    type:sea,city,forest
            players:Player[]
                name:string
                guestcookieid:string
                actions:number
                maxActions:number
                hand:Card[]
                played:Card[]
                terrapoints:number
                money:Resource
                metal:Resource
                titanium:Resource
                plants:Resource
                electricity:Resource
                heat:Resource
                mulliganhand:Card[]
            discardpile:Card[]
            deck:Card[]
                name:string
                rules:Rule[],:callback
                cost:number
                victorypoints:number
                tags:Tag[]
                mulliganSelected:boolean
                imageurl:string
                microbes:number
                animals:number
                tapped:boolean
                flavortext:string
                effect:callback
                description:callback



*/
  
