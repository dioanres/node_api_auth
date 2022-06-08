const express = require('express');

const jwt = require('jsonwebtoken');
const app = express();

app.get('/api', (req, res) => {
    res.json({
        'message' : 'Welcome to API JWT Auth'
    })
});

app.post('/api/posts', verifyToken, (req, res) => {
    res.json({
        'message' : 'Post Created.'
    })
})

app.post('/api/token', (req, res) => {
    const user = {
        'id' : 1,
        'name' : 'dioanres',
        'email': 'dioanres@gmail.com'
    }

    jwt.sign({ user}, 'secretkey', (req, token) => {
        res.json({
            'token' : token 
        })
    });
})

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    
    if (typeof bearerHeader == 'undefined') {
        res.sendStatus(403);
    } else {
        const bearerToken = bearerHeader.split(' ');
        const token = bearerToken[1];
        jwt.verify(token, 'secretkey', function(err, decoded) {
            if (err) {
                res.sendStatus(403)
            }
        });
    }

    next();
}

app.listen(3000, () => console.log('Server Running'));
