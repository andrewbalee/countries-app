const express = require('express');
const ExpressCache = require('express-cache-middleware')
const cacheManager = require('cache-manager')

const cacheMiddleware = new ExpressCache(
    cacheManager.caching({
        store: 'memory', max: 10000, ttl: 3600
    })
)

const fetch = (...args) =>
	import('node-fetch').then(({default: fetch}) => fetch(...args));

const PORT = process.env.PORT || 3001;

const app = express();

cacheMiddleware.attach(app)

app.get('/api', async (req, res) => {
    let url = 'https://restcountries.com/v3.1/all';

	if (req && req.query && req.query.id) {
		url = 'https://restcountries.com/v3.1/alpha/' + req.query.id
	}
	
    const options = {
		method: 'GET'
	};

    try {
		let response = await fetch(url, options);
		response = await response.json();
		res.status(200).json(response);
	} catch (err) {
		console.log(err);
		res.status(500).json({msg: `Internal Server Error.`});
	}
  });

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});