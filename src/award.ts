
class Award{
    id:number
    element:AwardElement

    constructor(
        public title:string,
        public funded:boolean,
    ){
        
    }
}

//8,14,20 can be bought anytime, received at end of game -> most land, most money, most science tags, most heat, most metal/titanium
var globalawards = [
    new Award('most land',false),
    new Award('most money',false),
    new Award('most science tags',false),
    new Award('most heat',false),
    new Award('most metal/titanium',false),
]







