const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const scrapeRoutes = require('./Controllers/scrape');
const viewRoutes = require('./Controllers/view');
const commentRoutes = require('./Controllers/comments');

const app = express();
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/newsScraper";
const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

app.use(viewRoutes);
app.use(scrapeRoutes);
app.use(commentRoutes);


app.listen(port);