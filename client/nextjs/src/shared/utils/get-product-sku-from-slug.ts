export function getSlugFirstParam(productSlug: string | string[] | undefined) {
  if (typeof productSlug === 'string') {
    return productSlug.split('-')[0];
  } else if (Array.isArray(productSlug) && productSlug.length > 0) {
    return productSlug[0].split('-')[0];
  } else {
    return 'slug-not-valid';
  }
}
