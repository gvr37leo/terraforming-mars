class GameInterface{

    gamedata:any[]
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



    constructor(){

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

    loadDashboard(player:Player){
        this.gameboardElement.company
        this.gameboardElement.resources

        let money = this.gamedata.find(k => k.parent == player._id && k.name == 'money')
        let metal = this.gamedata.find(k => k.parent == player._id && k.name == 'metal')
        let titanium = this.gamedata.find(k => k.parent == player._id && k.name == 'titanium')
        let plants = this.gamedata.find(k => k.parent == player._id && k.name == 'plants')
        let energy = this.gamedata.find(k => k.parent == player._id && k.name == 'energy')
        let heat = this.gamedata.find(k => k.parent == player._id && k.name == 'heat')

        this.gameboardElement
        
        
        
        
        
        
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