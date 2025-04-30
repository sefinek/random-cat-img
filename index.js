const { get } = require('https');
const { name, version, devDependencies } = require('./package.json');

const headers = {
	'User-Agent': `${name}/${version} (+https://github.com/sefinek/random-cat-img)${process.env.JEST_WORKER_ID ? ` jest/${devDependencies.jest.replace('^', '')}` : ''}`,
	'Accept': 'application/json',
	'Cache-Control': 'no-cache',
	'Connection': 'keep-alive',
};

module.exports = () => new Promise((resolve, reject) => {
	get('https://api.sefinek.net/api/v2/random/animal/cat', { headers }, res => {
		if (res.statusCode !== 200) {
			return reject(new Error(`Request failed with status code ${res.statusCode}`));
		}

		let data = '';
		res.on('data', chunk => data += chunk);
		res.on('end', () => {
			try {
				resolve(JSON.parse(data));
			} catch (err) {
				reject(new Error(`Failed to parse JSON: ${err.message}`));
			}
		});
	}).on('error', err => reject(new Error(`Request error: ${err.message}`)));
});