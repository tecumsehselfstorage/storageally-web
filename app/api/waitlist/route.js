// POST /api/waitlist
// Receives { name, email, facility, units } and writes to Airtable.

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, facility, units } = body || {};

    if (!name || !email) {
      return Response.json(
        { message: "Name and email are required." },
        { status: 400 }
      );
    }

    const apiKey = process.env.AIRTABLE_API_KEY;
    const baseId = process.env.AIRTABLE_BASE_ID;
    const tableName = process.env.AIRTABLE_TABLE_NAME || "Waitlist";

    if (!apiKey || !baseId) {
      console.error("Missing Airtable environment variables.");
      return Response.json(
        { message: "Server not configured." },
        { status: 500 }
      );
    }

    const airtableRes = await fetch(
      `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fields: {
            Name: name,
            Email: email,
            Facility: facility || "",
            Units: units || "",
          },
        }),
      }
    );

    if (!airtableRes.ok) {
      const errText = await airtableRes.text();
      console.error("Airtable error:", errText);
      return Response.json(
        { message: "Could not save to waitlist. Please try again." },
        { status: 502 }
      );
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error("Waitlist route error:", err);
    return Response.json(
      { message: "Unexpected server error." },
      { status: 500 }
    );
  }
}
