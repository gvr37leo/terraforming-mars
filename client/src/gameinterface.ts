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

        var player = this.gamedata.find(k => k._id == playerid)
        var handfolder = this.gamedata.find(k => k.parent == playerid && k.name == 'handfolder')
        var mulliganfolder = this.gamedata.find(k => k._id == playerid && k.name == 'mulliganfolder')
        var playedfolder = this.gamedata.find(k => k._id == playerid && k.name == 'playedfolder')

        var mulligancards = this.gamedata.filter(k => k.parent == handfolder._id)
        var handcards = this.gamedata.filter(k => k.parent == mulliganfolder._id)
        var playedcards = this.gamedata.filter(k => k.parent == playedfolder._id)

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

}









