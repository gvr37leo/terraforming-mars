function sendEvent(event:any){
    return fetch('/api/asd',{
        method:'POST',
        body:JSON.stringify(event)
    })
    .then(res => res.json())
}


function getGameData(){
    return fetch('/api/getgame',{
        method:'GET',
    })
    .then(res => res.json())
}

function reset(){
    return fetch('/api/reset',{
        method:'POST',
    })
    .then(res => res.json())
}