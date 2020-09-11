var tags = ['science','microbe','animal','earth','jupiter','electricity','titanium','event','city','plant']



class Card{

    constructor(
        public title:string,
        public rules:Rule[],//oxygen/heat/water min/max restriction (maybe make table for rules with id's and description to make rendering easier)
        public cost:number,
        public victorypoints:number,
        public tags:string[],
        public immediateEffect:() => void,
        public render:() => HTMLElement,
    ){


    }

    id
    microbes = 0
    animals = 0
    image = ''
    isTapped = false

    //onplay add onplay to eventqueue
    
    // action
    // passiveEffect//listen could be set in immediateeffect
    //immediateEffect// like gain 25 metal (how to render on card// or do something with html templating and text description, ~rte with text,images and magic strings~)
}