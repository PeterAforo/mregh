const UPLOADS_BASE = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api').replace('/api', '');

export function resolveImageUrl(src: string | null | undefined, fallback: string): string {
  if (!src) return fallback;
  if (src.startsWith('http://') || src.startsWith('https://')) return src;
  if (src.startsWith('/uploads/')) return `${UPLOADS_BASE}${src}`;
  if (src.startsWith('uploads/')) return `${UPLOADS_BASE}/${src}`;
  return fallback;
}

export function resolveProjectImage(project: any, fallback: string): string {
  if (project.coverImage) return resolveImageUrl(project.coverImage, fallback);
  try {
    const imgs = JSON.parse(project.images || '[]');
    if (imgs.length > 0) return resolveImageUrl(imgs[0], fallback);
  } catch {}
  return fallback;
}

export function formatDate(dateStr: string | null | undefined): string {
  if (!dateStr) return '';
  try {
    return new Date(dateStr).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  } catch {
    return dateStr;
  }
}
