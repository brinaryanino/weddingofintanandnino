export async function handler(event, context) {
  // URL Google Apps Script kamu
  const url =
    "https://script.google.com/macros/s/1gKLTa21AscSYRplFajRbGzoSlBh_fHJzF239PcP9ZsQ/exec";

  // Tentukan method (GET/POST)
  const options = {
    method: event.httpMethod,
    headers: { "Content-Type": "application/json" },
  };

  // Kalau POST, tambahkan body
  if (event.httpMethod === "POST") {
    options.body = event.body;
  }

  try {
    const response = await fetch(url, options);
    const data = await response.text(); // ambil sebagai text dulu

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*", // ini biar frontend bebas akses
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      },
      body: data,
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
}
