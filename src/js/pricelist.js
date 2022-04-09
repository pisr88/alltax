
// API form CMS 
fetch('https://api-eu-central-1.graphcms.com/v2/cl1qea3851j6901z76wz6foyx/master', {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json',
	},
	body: JSON.stringify({
		query: `
                    query {
                    offers {
                        name
                        scope
                        conditions
                    }
                    }
                `,
	}),
})
	.then(res => {
		if (!res.ok) return Promise.reject(response)

		return res.json()
	})
	.then(res => {
		console.log(res.data)
	})
