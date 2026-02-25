exports.handler = async (event) => {

  if (!event.body) {
    return {
      statusCode: 200,
      body: "Discord function alive"
    };
  }

  const body = JSON.parse(event.body);

  // Netlify may send fields in different places
  const formData =
    body.payload?.data ||
    body.payload?.human_fields ||
    body.human_fields ||
    body.data ||
    {};

  let message = "🔥 NEW WEBSITE LEAD\n\n";

  for (const [key, value] of Object.entries(formData)) {
    message += `${key}: ${value}\n`;
  }

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