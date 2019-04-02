# ssc-exchange-proxie


### How to add more links
```const upstreams = {
    blockchain: 'https://api.steem-engine.com/rpc/blockchain',
    contracts: 'https://api.steem-engine.com/rpc/contracts',
    steem: 'https://api.steemit.com',
    exchange: 'http://localhost:5000'
}; 
```

```yournewlink: 'https://localhost:yourport' You will need to add this into upstreams```


### Building your rpc methods
```You will need to set the url to https://yourlink:port/rpc of the proxie server```

### How your methods should look using proxie
```curl -XPOST -H "Content-type: application/json" -d '{ "jsonrpc": "2.0", "method": "contracts.findOne", "params": { "contract": "tokens", "table": "balances", "query": { "account": "username", "symbol": "COINNAME" } }, "id": 1 }' 'http://localhost:3000/rpc'```

``` "method": "contracts.findOne" will be stripped once sent to the proxie server```
