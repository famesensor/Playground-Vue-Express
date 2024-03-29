const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

//Middleware
app.use(bodyParser.json());
app.use(cors());

const posts = require('./routers/api/posts');

app.use('/api/posts',posts);

// Handle production
if(process.env.NODE_ENV === 'production') {
    // Static foloder
    app.use(express.static(__dirname + '/public'));

    // Handle SPA
    app.get(/.*/, (req, rs) => res.sendFile(__dirname + 'public/index.html'));
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log('Server stared on port '+port));