type FunctionalComponent = React.FC;

export function isPageFunctionalComponent(value: any): value is FunctionalComponent {
  return typeof value === 'function';
}

export function removePathPrefix(path: string, route: string): string {
  if (path.startsWith(`${route}/`)) {
    return '/' + path.split('/').slice(2).join('/');
  } else {
    return path;
  }
}
