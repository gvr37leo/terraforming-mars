
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
    title: HTMLElement;
    image: HTMLImageElement;
    cardid: HTMLElement;
    effect: HTMLElement;
    flavortext: HTMLElement;
}
