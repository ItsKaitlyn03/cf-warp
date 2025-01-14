const request = require('./https-request')

function genString(length) {
	return [...Array(length)]
		.map(() => (~~(Math.random() * 36)).toString(36))
		.join('')
}

module.exports = async ({ publicKey, referrer }) => {
	const install_id = genString(11)
	const json = await request(
		'https://api.cloudflareclient.com/v0d756/reg',
		'POST',
		{
			'User-Agent': 'okhttp/3.12.1',
			'Content-Type': 'application/json; charset=UTF-8'
		},
		JSON.stringify({
			key: publicKey || `${genString(43)}=`,
			install_id,
			fcm_token: `${install_id}:APA56b${genString(134)}`,
			referrer: referrer || '',
			warp_enabled: true,
			tos: new Date().toISOString().replace('Z', '+08:00'),
			model: 'Xiaomi POCO X2',
			type: 'Android',
			locale: 'en_US'
		})
	)
	return JSON.parse(json).result
}
if (require.main === module) {
	require('get-stdin')()
		.then(JSON.parse)
		.then(module.exports)
		.then(r => console.log(JSON.stringify(r, null, 2)))
}
