/**
 * Generates the HTML email template that notifies the site owner
 * when a visitor starts a new live chat.
 * @param {{ name?: string, email?: string, serviceRef?: string, chatTitle?: string, adminUrl?: string }} data
 * @returns {string} HTML string
 */
export function newChatEmailHtml({ name, email, serviceRef, chatTitle, adminUrl }) {
  const date = new Date().toLocaleDateString("pl-PL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const time = new Date().toLocaleTimeString("pl-PL", {
    hour: "2-digit",
    minute: "2-digit",
  });

  // Escape HTML entities to prevent injection
  const esc = (str) =>
    String(str ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");

  // Build the info-card rows, including only the ones we actually have.
  const textValue = (val) =>
    `<span style="display:block;font-size:15px;color:#1a1a2e;font-weight:600;">${esc(val)}</span>`;
  const fieldRow = (label, valueHtml, isFirst) => `
                      <tr>
                        <td style="padding:${isFirst ? "0 0 12px" : "12px 0"};${isFirst ? "" : "border-top:1px solid #e5e7eb;"}">
                          <span style="display:block;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.8px;color:#9ca3af;margin-bottom:4px;">${label}</span>
                          ${valueHtml}
                        </td>
                      </tr>`;

  const rows = [];
  rows.push(fieldRow("Imię i nazwisko", textValue(name || "Gość"), rows.length === 0));
  if (email) {
    rows.push(
      fieldRow(
        "Email",
        `<a href="mailto:${esc(email)}" style="display:block;font-size:15px;color:#c9a84c;text-decoration:none;font-weight:600;">${esc(email)}</a>`,
        rows.length === 0
      )
    );
  }
  if (serviceRef) {
    rows.push(fieldRow("Dotyczy usługi", textValue(serviceRef), rows.length === 0));
  }
  if (chatTitle) {
    rows.push(fieldRow("Identyfikator rozmowy", textValue(chatTitle), rows.length === 0));
  }

  const ctaButton = adminUrl
    ? `
              <!-- Open panel button -->
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto 12px;">
                <tr>
                  <td style="border-radius:6px;background-color:#c9a84c;text-align:center;">
                    <a href="${esc(adminUrl)}" style="display:inline-block;padding:12px 32px;font-size:14px;font-weight:600;color:#1a1a2e;text-decoration:none;">Otwórz panel czatu</a>
                  </td>
                </tr>
              </table>`
    : "";

  return `<!DOCTYPE html>
<html lang="pl">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Nowa rozmowa na czacie</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f4f7;font-family:Arial,'Helvetica Neue',Helvetica,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f7;">
    <tr>
      <td align="center" style="padding:40px 20px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.06);">

          <!-- Header -->
          <tr>
            <td style="background-color:#1a1a2e;padding:32px 40px;text-align:center;">
              <h1 style="margin:0;font-size:22px;font-weight:700;color:#c9a84c;letter-spacing:0.5px;">BriefService</h1>
              <p style="margin:6px 0 0;font-size:13px;color:#a0a0b8;">Nowa rozmowa na czacie</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:36px 40px 20px;">
              <h2 style="margin:0 0 4px;font-size:18px;color:#1a1a2e;">Rozpoczęto nową rozmowę</h2>
              <p style="margin:0 0 28px;font-size:13px;color:#6b7280;">Otrzymano ${esc(date)} o ${esc(time)}</p>

              <!-- Visitor Info -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f9fafb;border-radius:6px;margin-bottom:24px;">
                <tr>
                  <td style="padding:20px 24px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rows.join("")}
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Status note -->
              <span style="display:block;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.8px;color:#9ca3af;margin-bottom:8px;">Status</span>
              <div style="background-color:#f9fafb;border-left:3px solid #c9a84c;border-radius:0 6px 6px 0;padding:20px 24px;margin-bottom:28px;">
                <p style="margin:0;font-size:14px;line-height:1.7;color:#374151;">Nowy klient czeka na czacie. Otwórz panel administracyjny, aby odpowiedzieć na wiadomość.</p>
              </div>
${ctaButton}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 40px 28px;border-top:1px solid #e5e7eb;text-align:center;">
              <p style="margin:0 0 4px;font-size:12px;color:#9ca3af;">To powiadomienie zostało wysłane z widżetu czatu na <strong>brief-service.com</strong></p>
              <p style="margin:0;font-size:11px;color:#c0c0c0;">ul. Sosnowa 10/7, 68-100 Żagań &bull; +48 696 513 109</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
