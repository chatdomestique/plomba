export async function peakFetch(url, body, token) {
	let headers = {};

	headers["content-type"] = "application/json"
	if (token !== undefined) {
		headers["authorization"] = token;
	}

	const req = await fetch(url, {
		method: "POST",
		body: JSON.stringify(body),
		headers
	});

	return {
		payload: await req.json(),
		status: req.status
	}
}
