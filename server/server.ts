import express from 'express'
import { dostuff } from './serverlogic'

var app = express()
var port = 8000

app.use(express.static('../client'))

app.get('/api/gamedata',(req,res) => {
    
})

app.post('/api/addevent',(req,res) => {

})

app.listen(port,() => {
    console.log('helloasd')
    dostuff()
    console.log(`listening on http://localhost:${port}`);
})