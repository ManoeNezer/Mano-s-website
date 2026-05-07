export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  try {

    const { model, contents } = req.body;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/${model}:generateContent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": process.env.GEMINI_API_KEY
        },
        body: JSON.stringify({
          contents
        })
      }
    );

    const data = await response.json();

    res.status(200).json(data);

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

}