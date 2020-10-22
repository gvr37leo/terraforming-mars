class GameInterface{

    gamedata:Knot[]
    rootelement:HTMLElement
    gameboardElement: GameBoardElement
    playerElements:PlayerElement[] = []
    cardElements:CardElement[] = []
    moneyref: ResourceElement
    metalref: ResourceElement
    titaniumref: ResourceElement
    plantsref: ResourceElement
    energyref: ResourceElement
    heatref: ResourceElement
    modal: Modal
    playerselfid: number



    constructor(){
        this.playerselfid = 0
        this.modal = new Modal()
        document.body.appendChild(this.modal.rootelement)
        var asd = string2html(`<div>hello</div>`)
        this.modal.set(asd)
    }

    initHTML(gamedata:any[]){
        this.gamedata = gamedata
        this.gameboardElement = getgameboardrefs()
        let players = gamedata.filter(k => k.objdef == 'player')
        let cards = gamedata.filter(k => k.objdef == 'card')

        this.moneyref = getReourceRefs()
        this.metalref = getReourceRefs()
        this.titaniumref = getReourceRefs()
        this.plantsref = getReourceRefs()
        this.energyref = getReourceRefs()
        this.heatref = getReourceRefs()

        this.gameboardElement.resources.appendChild(this.moneyref.root)
        this.gameboardElement.resources.appendChild(this.metalref.root)
        this.gameboardElement.resources.appendChild(this.titaniumref.root)
        this.gameboardElement.resources.appendChild(this.plantsref.root)
        this.gameboardElement.resources.appendChild(this.energyref.root)
        this.gameboardElement.resources.appendChild(this.heatref.root)


        for(let player of players){
            let playerref = getplayerrefs()
            playerref.data = player
            this.gameboardElement.players.appendChild(playerref.root)
            this.playerElements.push(playerref)
            playerref.root.addEventListener('click', () => {
                this.loadDashboard(player)
            })
        }

        this.gameboardElement.cards.addEventListener('click', () => {
            var kdb = new KnotQueryDB(this.gamedata)
            var player1 = kdb.searchObjects([{objdef:'player'}])[0]

            var playerdata = this.collectPlayerData(player1._id)
            var container = this.renderCardsList(playerdata.mulligancards as any)
            this.modal.set(container)
            this.modal.show()
            //load modal with cards of player
        })

        for(let card of cards){
            let cardref = getcardrefs()
            cardref.data = card
            this.cardElements.push(cardref)
        }
    }

    setData(gamedata:any[]){
        this.gamedata = gamedata
        let game = gamedata.find(k => k.objdef == 'game')
        let meters = gamedata.filter(k => k.objdef == 'meter')
        let players = gamedata.filter(k => k.objdef == 'player')
        let standardprojects = gamedata.filter(k => k.objdef == 'standardproject')
        let cards = gamedata.filter(k => k.objdef == 'card')
        let heatmeter = gamedata.find(k => k.name == "temperature")
        let oxygenmeter = gamedata.find(k => k.name == "oxygen")
        let discardfolder = gamedata.find(k => k.objdef == "discardfolder")
        let eventfolder = gamedata.find(k => k.objdef == "eventfolder")
        let awardsfolder = gamedata.find(k => k.objdef == "awardsfolder")
        let awards = gamedata.filter(k => k.objdef == 'award')
        let milestones = gamedata.filter(k => k.objdef == 'milestone')

        this.gameboardElement.oxygenmeter.innerText = heatmeter.current
        this.gameboardElement.temperaturemeter.innerText = oxygenmeter.current
        this.gameboardElement.generation.innerText = game.generation

        for(let playerlement of this.playerElements){
            let player = players.find(k => k._id == playerlement.data._id)
            playerlement.playername = player.name
        }
    }

    collectPlayerData(playerid){
        var db = new KnotQueryDB(this.gamedata)
        var player =  db.searchObjects([{_id:playerid}])[0]
            
        var handfolder = db.searchFrom(player,db.objects2Query([{objdef:'handfolder'}]))[0]
        var mulliganfolder = db.searchFrom(player,db.objects2Query([{objdef:'mulliganfolder'}]))[0]
        var playedfolder = db.searchFrom(player,db.objects2Query([{objdef:'playedfolder'}]))[0]

        var mulligancards = db.getChildren(mulliganfolder)
        var handcards = db.getChildren(handfolder)
        var playedcards = db.getChildren(playedfolder)

        return {
            player,
            mulliganfolder,
            handfolder,
            playedfolder,
            mulligancards,
            handcards,
            playedcards,
        }
    }

    loadDashboard(player:Player){
        this.gameboardElement.company
        this.gameboardElement.resources

        let money = this.gamedata.find(k => k.parent == player._id && k.name == 'money')
        let metal = this.gamedata.find(k => k.parent == player._id && k.name == 'metal')
        let titanium = this.gamedata.find(k => k.parent == player._id && k.name == 'titanium')
        let plants = this.gamedata.find(k => k.parent == player._id && k.name == 'plants')
        let energy = this.gamedata.find(k => k.parent == player._id && k.name == 'energy')
        let heat = this.gamedata.find(k => k.parent == player._id && k.name == 'heat')
        
        let company = this.gamedata.find(k => k.parent == player._id && k.objdef == 'company')

        updateResourceData(money as any,this.moneyref)
        updateResourceData(metal as any,this.metalref)
        updateResourceData(titanium as any,this.titaniumref)
        updateResourceData(plants as any,this.plantsref)
        updateResourceData(energy as any,this.energyref)
        updateResourceData(heat as any,this.heatref)
        
        this.gameboardElement.company.innerText = company.name
        
        
        
        
        
        //company
        //resources
        //cards?
        //card resources
        //tags
        //vp
        //actions
        //effects
    }



    renderCardsList(cards:Card[]){
        var container = string2html(`
            <div>
                <div id="cardcontainer" style="display:flex;">
                
                </div>
                <div>
                    <button id="confirmbtn">confirm mulligan</button>
                </div>
            </div>
        `)
        var cardcontainer = container.querySelector('#cardcontainer')
        var confirmbtn = container.querySelector('#confirmbtn')
        confirmbtn.addEventListener('click', () => {
            sendEvent({
                type:'mulliganConfirmed',
                data:{
                    chosencards:cards.filter(c => c.mulliganselected).map(c => c._id)
                }
            })
        })
        for(let card of cards){
            let refs = getcardrefs()
            refs.root.addEventListener('click',() => {
                card.mulliganselected = !card.mulliganselected
                card.mulliganselected ? refs.root.classList.add('selected') : refs.root.classList.remove('selected')
                
            })
            updateCardData(refs,card as any)
            cardcontainer.appendChild(refs.root)
        }
        return container
    }
}









