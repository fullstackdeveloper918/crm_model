
"use server";

export async function fetchFromServer(api: any): Promise<any> {
  const { url, method, body = null } = api;

  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    cache: 'no-store',
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const res = await fetch(url, options);

    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Fetch Error:", error);
    throw error;
  }
}
