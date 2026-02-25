exports.handler = async (event) => {

  // Allow browser test
  if (!event.body) {
    return {
      statusCode: 200,
      body: "Discord function ready"
    };
  }

  const data = JSON.parse(event.body);

  const message = {
    content:
`🔥 NEW WEBSITE LEAD

Name: ${data.name || "N/A"}
Email: ${data.email || "N/A"}
Phone: ${data.phone || "N/A"}
Project: ${data.project_type || "N/A"}

Message:
${data.message || "N/A"}`
  };

  await fetch(process.env.DISCORD_WEBHOOK, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(message)
  });

  return {
    statusCode: 200,
    body: "Sent to Discord"
  };
};