const express = require('express')
const app = express()
const port = 3000

app.set("view engine", 'hbs');

app.get('/', (req, res) => {
    res.render('main');
})

app.post('/imageToPdf', (req,res)=>{

})
app.post('/pdfToImage', (req,res)=>{

})
app.listen(port, () => console.log(`App listening on port ${port}!`))