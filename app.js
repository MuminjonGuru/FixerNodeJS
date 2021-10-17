const express = require("express")
const axios = require("axios")
const app = express()
const port = 1998

app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
// app.use('/img', express.static(__dirname + 'public/img'))  // for images
app.use('/js', express.static(__dirname + 'public/js'))

app.set('views', './src/views')
app.set('view engine', 'ejs')

app.get('/api/:version', function(req, res) {
  res.send(req.params.version);
});

app.get("/latest", async function(req, res) {
  try {
    const API_ACC_KEY = "9b3bf0619181d7939a977c216c9f2fde";

    const ratings = await axios.get(
      `http://data.fixer.io/api/latest?access_key=${API_ACC_KEY}`    
    );

    // console.log(ratings.data.rates);

    res.render("fixer", { info: ratings.data.rates });
      
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log("Error", error.message);
    }
  }
});

app.get('/', (req, res) => res.send('Index Page'))

app.listen(port, () => console.log(`Running on ${port} port`))
