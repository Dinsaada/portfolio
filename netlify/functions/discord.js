exports.handler = async (event) => {

  if (!event.body) {
    return {
      statusCode: 200,
      body: "Discord function alive"
    };
  }

  const body = JSON.parse(event.body);
  const data = body.payload?.data || body;

  // Build message dynamically from all fields
  let formatted = "🔥 NEW WEBSITE LEAD\n\n";

  for (const key in data) {
    formatted += `${key}: ${data[key]}\n`;
  }

  await fetch(process.env.DISCORD_WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content: formatted })
  });

  return {
    statusCode: 200,
    body: "Sent to Discord"
  };
};