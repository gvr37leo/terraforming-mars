
var carddatabase:Card[] = [
    new Card(
        'gain metal',
        [],
        10,
        0,
        [],
        () => {
            //need reference to player
            //can maybe be done by querying active player
            //requires global database
        },
        () => {
            return null
        },
    ),
    
    new Card(
        'gain metal production',
        [],
        10,
        0,
        [],
        () => {
            //need reference to player
        },
        () => {
            return null
        },
    ),

    new Card(
        'gain victory point',
        [],
        10,
        0,
        [],
        () => {
            //need reference to player
        },
        () => {
            return null
        },
    ),

    new Card(
        'gain active card',
        [],
        10,
        0,
        [],
        () => {
            //need reference to player
        },
        () => {
            return null
        },
    ),

    new Card(
        'gain bacteria card',
        [],
        10,
        0,
        [],
        () => {
            //need reference to player
        },
        () => {
            return null
        },
    ),

    new Card(
        'gain animals card',
        [],
        10,
        0,
        [],
        () => {
            //need reference to player
        },
        () => {
            return null
        },
    ),

    new Card(
        'meteor other player',
        [],
        10,
        0,
        [],
        () => {
            //need reference to player
            //and reference to target player
        },
        () => {
            return null
        },
    ),

    new Card(
        'require heat science oxygen',
        [],
        10,
        0,
        [],
        () => {
            //need reference to player
        },
        () => {
            return null
        },
    ),

    new Card(
        'gain bacteria from other card',
        [],
        10,
        0,
        [],
        () => {
            //need reference to player
            //need reference to other card
        },
        () => {
            return null
        },
    ),
]

function generateRandomCards(n:number){
    var result = []
    for(var i = 0; i < n;i++){
        result.push(new Card(
            `this is card ${i}`,
            [new Rule('hey',() => true)],
            10,
            1,
            [Tags.science,Tags.titanium,Tags.metal,Tags.microbe,Tags.animal],
            () => {
                var player = game.getActivePlayer()
                player.metal.production += 2
            },
            () => {
                return string2html('<p>description</p>')
            },
        ))
    }
    return result
}

