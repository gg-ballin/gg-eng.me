import type { AstroIntegration } from 'astro';
import { networkInterfaces } from 'node:os';
import qrcode from 'qrcode-terminal';

const VIRTUAL_INTERFACE = /^(utun|bridge|vmnet|vboxnet|docker|veth|tun|tap|llw|awdl)/;

function resolveLanAddress(): string | null {
  const override = process.env.DEV_QR_HOST;
  if (override) return override;

  const candidates = Object.entries(networkInterfaces()).flatMap(([name, infos]) =>
    (infos ?? [])
      .filter((info) => info.family === 'IPv4' && !info.internal && !info.address.startsWith('169.254.'))
      .map((info) => ({ name, address: info.address }))
  );

  const preferred =
    candidates.find((candidate) => /^en\d+$/.test(candidate.name)) ??
    candidates.find((candidate) => !VIRTUAL_INTERFACE.test(candidate.name)) ??
    candidates[0];

  return preferred?.address ?? null;
}

export default function devQr(): AstroIntegration {
  let hostExposed = false;

  return {
    name: 'dev-qr',
    hooks: {
      'astro:config:done': ({ config }) => {
        hostExposed = Boolean(config.server.host);
      },
      'astro:server:start': ({ address, logger }) => {
        if (!hostExposed) return;

        const lanAddress = resolveLanAddress();
        if (!lanAddress) {
          logger.warn('No LAN IPv4 address found; skipping mobile QR.');
          return;
        }

        const url = `http://${lanAddress}:${address.port}/`;

        // Deferred so the QR prints below Astro's startup banner
        setTimeout(() => {
          qrcode.generate(url, { small: true }, (qr) => {
            console.log(`\n  Scan to open on mobile: ${url}\n`);
            console.log(qr.replace(/^/gm, '  '));
          });
        }, 300);
      },
    },
  };
}
