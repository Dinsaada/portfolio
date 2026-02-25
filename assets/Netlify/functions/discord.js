exports.handler = async (event) => {

  const body = JSON.parse(event.body);
  const data = body.payload.data;

  const message = {
    content:
`🔥 NEW WEBSITE LEAD

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone || "N/A"}
Project: ${data.project_type || "N/A"}

Message:
${data.message}`
  };

  await fetch(process.env.DISCORD_WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(message)
  });

  return {
    statusCode: 200,
    body: "Notification sent"
  };
};