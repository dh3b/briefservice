/**
 * Generates the HTML email template for contact form submissions.
 * @param {{ name: string, email: string, message: string }} data
 * @returns {string} HTML string
 */
export function contactEmailHtml({ name, email, message }) {
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
    str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Nowa wiadomość z formularza kontaktowego</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f4f7;font-family:Arial,'Helvetica Neue',Helvetica,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f7;">
    <tr>
      <td align="center" style="padding:40px 20px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.06);">

          <!-- Header -->
          <tr>
            <td style="background-color:#1a1a2e;padding:32px 40px;text-align:center;">
              <h1 style="margin:0;font-size:22px;font-weight:700;color:#c9a84c;letter-spacing:0.5px;">Brief Service</h1>
              <p style="margin:6px 0 0;font-size:13px;color:#a0a0b8;">Nowa wiadomość z formularza kontaktowego</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:36px 40px 20px;">
              <h2 style="margin:0 0 4px;font-size:18px;color:#1a1a2e;">Masz nową wiadomość</h2>
              <p style="margin:0 0 28px;font-size:13px;color:#6b7280;">Otrzymano ${esc(date)} o ${esc(time)}</p>

              <!-- Sender Info -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f9fafb;border-radius:6px;margin-bottom:24px;">
                <tr>
                  <td style="padding:20px 24px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding-bottom:12px;">
                          <span style="display:block;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.8px;color:#9ca3af;margin-bottom:4px;">Imię i nazwisko</span>
                          <span style="display:block;font-size:15px;color:#1a1a2e;font-weight:600;">${esc(name)}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="border-top:1px solid #e5e7eb;padding-top:12px;">
                          <span style="display:block;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.8px;color:#9ca3af;margin-bottom:4px;">Email</span>
                          <a href="mailto:${esc(email)}" style="display:block;font-size:15px;color:#c9a84c;text-decoration:none;font-weight:600;">${esc(email)}</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Message -->
              <span style="display:block;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.8px;color:#9ca3af;margin-bottom:8px;">Wiadomość</span>
              <div style="background-color:#f9fafb;border-left:3px solid #c9a84c;border-radius:0 6px 6px 0;padding:20px 24px;margin-bottom:28px;">
                <p style="margin:0;font-size:14px;line-height:1.7;color:#374151;white-space:pre-wrap;">${esc(message)}</p>
              </div>

              <!-- Reply Button -->
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto 12px;">
                <tr>
                  <td style="border-radius:6px;background-color:#c9a84c;text-align:center;">
                    <a href="mailto:${esc(email)}?subject=Re:%20Twoja%20wiadomo%C5%9B%C4%87%20do%20Brief%20Service" style="display:inline-block;padding:12px 32px;font-size:14px;font-weight:600;color:#1a1a2e;text-decoration:none;">Odpowiedz do ${esc(name)}</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 40px 28px;border-top:1px solid #e5e7eb;text-align:center;">
              <p style="margin:0 0 4px;font-size:12px;color:#9ca3af;">Ta wiadomość została wysłana z formularza kontaktowego na <strong>briefservice.pl</strong></p>
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
