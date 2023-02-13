import fetch from 'node-fetch'
globalThis.fetch = fetch
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:true }));

app.get('/',(req,res)=>{
  res.sendFile('index.html',{'root':'views'})
});


app.post('/update',async (req,res)=>{
  let url = `http://192.168.0.105:80/update?${new URLSearchParams({
    CICS_COLOR: req.body.cics_color==='default' 
      ? "#891d1d"
      : req.body.cics_color,
    SPMAKER_COLOR: req.body.spmaker_color==='default'
      ? "#891d1d"
      : req.body.spmaker_color,
    STATUS_COLOR: req.body.status_color==='default'
      ? "#891d1d"
      : req.body.status_color,
    STATUS_TEXT:  req.body["Status Matrix Text"],
    BRIGHTNESS: req.body.Brightness,
  })}`
  console.log(url)
  let resp = await fetch(url, {headers:
      {
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9obiBEb2UifQ.ndv1CWCNeeQCvfb5s7AQRVATqxiGexx4CxfAWW9xxGA"
    }});
  res.send((await resp.text()))
})
app.listen(port,()=>{
    console.log(`UMassDining2 listening on port ${port}`);
})
