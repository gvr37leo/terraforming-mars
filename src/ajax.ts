function sendEvent(event:any){
    return fetch('/api/asd',{
        method:'POST',
        body:JSON.stringify(event)
    })
    .then(res => res.json())
}


function getGameData(){
    return fetch('/api/asd',{
        method:'POST',
        body:JSON.stringify(event)
    })
    .then(res => res.json())
}