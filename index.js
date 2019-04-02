const express = require('express');
const cookieParser = require('cookie-parser');
const fetch = require("node-fetch");
const path = require("path");
const cors = require("cors");
const app = express();
app.set('trust proxy', true);
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.disable('x-powered-by');

app.get("/", (req, res) => {
    res.json({
        version: require("./package").version
    })
});
const upstreams = {
    blockchain: 'https://api.steem-engine.com/rpc/blockchain', // You can use the default ssc node or change it to your own
    contracts: 'https://api.steem-engine.com/rpc/contracts', // You can use the default ssc node or change it to your own
    steem: 'https://api.steemit.com', // Set this to any full Steem node
    exchange: 'http://localhost:5000' // Or you set it to the up of your server

};

app.post("/rpc", async (req, res) => {

    const split = req.body.method.split(".");
    const upstream = split[0];
    req.body.method = split.slice(1).join(".");

    console.log(upstream, upstreams[upstream], req.body.method);
    try {
        let response = await (await fetch(upstreams[upstream], {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(req.body)
        })).json();

        res.json(response)
    } catch (e) {
        res.json(e)
    }
});

app.listen(3000, () => console.log(`App listening on port 3000!`));
