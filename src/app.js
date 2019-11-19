const path = require('path');
const express = require('express');
const app = express();

const hbs = require('hbs');

const geoCoding = require('./utils/geocode');
const forecast = require('./utils/forecast');

const PORT = 5000;


console.log(__dirname);

//Define path for Express config
const staticPath = path.join(__dirname, '../public');
app.set('views', path.join(__dirname, '../templates/views'));
const partialsPath = path.join(__dirname, '../templates/partials');


//Serving up our static HTML files
app.use(express.static(staticPath));
hbs.registerPartials(partialsPath);



//Serving up our dynamic hbs files 
app.set('view engine', 'hbs');


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Ezekiel'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Ezekiel'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is to help you man',
        title: 'Help',
        name: 'Ezekiel'
    });
});


app.get('/help/*', (req, res) => {
    res.render('error', {
        name: 'Dolapo',
        title: '404',
        msg: 'Help article not found :('
    });
});


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address :('
        });
    }

    geoCoding(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error});
        } 
    
            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    res.send({error});
                }
                
                res.send({
                    location,
                    forecastData,
                    address: req.query.address
                });
               
            });
        });
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
         return res.send({
            error: 'Search not found'
        });
    } 
        res.send({
            products: [],
        })
  
    console.log(req.query);
    
});

//Setting up 404 route in express
app.get('*', (req, res) => {
    res.render('error', {
        name: 'Dolapo',
        title: '404',
        msg: 'Page Not Found :('
    });
});


app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
})