import { IncomingMessage, ServerResponse } from 'http';

export default async function handler(req: IncomingMessage, res: ServerResponse): Promise<void> {
  // Dynamic require prevents esbuild from transpiling NestJS decorator-heavy code.
  // dist/serverless.js is pre-built by `nest build` using tsc with emitDecoratorMetadata.
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { createApp } = require('../dist/serverless');
  const app = await createApp();
  app(req, res);
}
