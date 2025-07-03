export async function peakFetchGET(url, token) {
	let headers = {};

	if (token !== undefined) {
		headers["authorization"] = token;
	}

	const req = await fetch(url, {
		method: "GET",
		headers
	});

	return {
		payload: await req.json(),
		status: req.status
	}
}
