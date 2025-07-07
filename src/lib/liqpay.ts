import crypto from 'crypto';

interface LiqPayParams {
  [key: string]: any;
}

export function generateLiqPayData(params: LiqPayParams): string {
  const json = JSON.stringify(params);
  return Buffer.from(json).toString('base64');
}

export function generateLiqPaySignature(
  data: string,
  privateKey: string,
): string {
  const str = privateKey + data + privateKey;
  return crypto.createHash('sha1').update(str).digest('base64');
}
