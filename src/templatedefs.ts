
class GameBoardElement{
    root: HTMLElement;
    oxygenmeter: HTMLElement;
    standardprojects: HTMLElement;
    tileboard: HTMLElement;
    temperaturemeter: HTMLElement;
    milestones: HTMLElement;
    awards: HTMLElement;
    players: HTMLElement;
}

class PlayerElement{
    root: HTMLElement;
    playername: HTMLElement
    resources: HTMLElement;
    cards: HTMLElement;
    board: HTMLElement;
    playerturntoken: HTMLElement;
    playerstarttoken: HTMLElement;
}

class ResourceElement{
    root: HTMLElement;
    label: HTMLElement;
    instock: HTMLElement;
    moneyvalue: HTMLElement;
    production: HTMLElement;
}

class CardElement{
    root: HTMLElement;
    cost:HTMLElement;
    rules:HTMLElement;
    tags:HTMLElement;
    title: HTMLElement;
    image: HTMLImageElement;
    cardid: HTMLElement;
    effect: HTMLElement;
    flavortext: HTMLElement;
}



class MilestoneElement{
    root: HTMLElement;
    title: HTMLElement;
    claimedby: HTMLElement;
}

class AwardElement{
    root: HTMLElement;
    title: HTMLElement;
    funded:HTMLElement
}

class StandardProjectElement{
    root: HTMLElement;
    price: HTMLElement;
    product: HTMLElement;
}