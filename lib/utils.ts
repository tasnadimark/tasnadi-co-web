export function getAssetPath(path: string): string {
  const basePath = process.env.NODE_ENV === 'production' ? '/tasnadi-co-web' : '';
  return `${basePath}${path}`;
}