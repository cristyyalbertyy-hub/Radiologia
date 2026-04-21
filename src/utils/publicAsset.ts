/**
 * Anexa versão opcional aos ficheiros em /public para contornar cache (browser/CDN)
 * quando substituis um ficheiro mantendo o mesmo nome.
 *
 * Define VITE_ASSET_VERSION no .env ou no Vercel (ex.: "2") e faz redeploy.
 */
export function publicAsset(path: string): string {
  if (!path || path.startsWith('http://') || path.startsWith('https://')) {
    return path
  }
  if (!path.startsWith('/')) {
    return path
  }
  const v = import.meta.env.VITE_ASSET_VERSION?.trim()
  if (!v) {
    return path
  }
  const sep = path.includes('?') ? '&' : '?'
  return `${path}${sep}v=${encodeURIComponent(v)}`
}
