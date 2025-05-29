const PROXY = '/api'; // Vercel serverless function proxy base

export async function connectionUpdate(msg) {
	const res = await fetch(`${PROXY}/state`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
		},
		body: JSON.stringify({
			...msg,
			platform: 'web',
		}),
	});

	if (!res.ok) throw new Error(`connectionUpdate failed: ${res.status}`);
	return await res.json();
}

export async function auth(email, password) {
	const res = await fetch(`${PROXY}/auth`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
		},
		body: JSON.stringify({
			email,
			password,
		}),
	});

	if (!res.ok) throw new Error(`auth failed: ${res.status}`);
	return await res.json();
}

export async function serverList(sessionId) {
	const res = await fetch(`${PROXY}/server-list?include_managed=true`, {
		method: 'GET',
		headers: {
			'X-Parsec-Session-Id': sessionId,
		},
	});

	if (!res.ok) throw new Error(`serverList failed: ${res.status}`);
	return await res.json();
}
