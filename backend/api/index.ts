import { IncomingMessage, ServerResponse } from 'http';

let cachedApp: any = null;

async function getApp() {
  if (cachedApp) return cachedApp;
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { createApp } = require('../dist/serverless');
  cachedApp = await createApp();
  return cachedApp;
}

export default async function handler(req: IncomingMessage, res: ServerResponse): Promise<void> {
  try {
    const app = await getApp();
    app(req, res);
  } catch (err: any) {
    const r = res as any;
    r.statusCode = 500;
    r.setHeader('Content-Type', 'application/json');
    r.setHeader('Access-Control-Allow-Origin', '*');
    r.end(JSON.stringify({
      error: 'init_failed',
      message: err?.message ?? String(err),
      stack: err?.stack?.split('\n').slice(0, 8),
    }));
  }
}
