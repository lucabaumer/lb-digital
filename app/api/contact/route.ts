import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, phone, message } = body;

  if (!name || !phone) {
    return NextResponse.json({ error: "Pflichtfelder fehlen" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ success: true });
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);

    await resend.emails.send({
      from: "LB Digital <noreply@lb-digital.agency>",
      to: "hallo@lb-digital.agency",
      subject: `Neue Anfrage von ${name}`,
      html: `
        <h2 style="font-family:sans-serif">Neue Kontaktanfrage — LB Digital</h2>
        <table style="font-family:sans-serif;font-size:14px;border-collapse:collapse">
          <tr><td style="padding:6px 16px 6px 0;color:#6B7280">Name</td><td>${name}</td></tr>
          <tr><td style="padding:6px 16px 6px 0;color:#6B7280">Telefon</td><td><a href="tel:${phone}">${phone}</a></td></tr>
          <tr><td style="padding:6px 16px 6px 0;color:#6B7280;vertical-align:top">Nachricht</td><td>${message ? message.replace(/\n/g, "<br>") : "—"}</td></tr>
        </table>
      `,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "E-Mail konnte nicht gesendet werden" },
      { status: 500 }
    );
  }
}
