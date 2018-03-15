const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const scrapeRoutes = require('./Controllers/scrape');
const viewRoutes = require('./Controllers/view');
const commentRoutes = require('./Controllers/comments');

const app = express();

app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ extended: false }))
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/newsScraper");

app.use(viewRoutes);
app.use(scrapeRoutes);
app.use(commentRoutes);


app.listen(3000);