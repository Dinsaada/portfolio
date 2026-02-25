exports.handler = async (event) => {

  if (!event.body) {
    return {
      statusCode: 200,
      body: "Discord function alive"
    };
  }

  const body = JSON.parse(event.body);

  // REAL form fields live here
  const formData = body.payload?.data || {};

  let message = "🔥 NEW WEBSITE LEAD\n\n";

  Object.entries(formData).forEach(([key, value]) => {
    message += `${key}: ${value}\n`;
  });

  await fetch(process.env.DISCORD_WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content: message })
  });

  return {
    statusCode: 200,
    body: "Sent to Discord"
  };
};