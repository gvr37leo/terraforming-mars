function sendEvent(event:{type,data}){
    return fetch('/api/pushevent',{
        method:'POST',
        body:JSON.stringify(event),
        headers:{
            'Content-Type': 'application/json'
        }
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