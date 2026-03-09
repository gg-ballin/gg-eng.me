# QR Code (Desktop Popup)

The desktop popup QR is **generated dynamically** and encodes the current page URL with `?from=qr`, so scans open the correct URL and trigger the notification email. No static image is required.

- Optional: `qrcode.png` in this folder is unused by the popup; the popup uses an external QR API. You can keep or remove it.

## Recommended Specifications

- **Size**: 200x200px minimum (displayed at 150–220px via clamp)
- **Format**: PNG or SVG
- **Content**: The desktop popup QR is generated dynamically (via [api.qrserver.com](https://api.qrserver.com)) and always encodes the current page URL with `?from=qr`, so a scan triggers an email notification to the site owner via Resend. No static `qrcode.png` is required for the popup.
- **Contrast**: Ensure good contrast for scanning on both light and dark backgrounds.

## Usage

The QR in the desktop popup is generated at request time and encodes `{origin}{path}?from=qr` (e.g. `https://gg-eng.me/es/?from=qr`). The popup also includes a "Scan Me" tag below the QR. When a visitor opens that URL, the app sends one notification per session (POST `/api/qr-scan` → Resend). Ensure `RESEND_API_KEY` is set. Server logs show `[QR scan] POST /api/qr-scan received` when the endpoint is hit.
