import kleur from 'kleur';

type Style = 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error' | 'muted';

export const styled = (
  kind: Style
) => {
  switch (kind) {
    case 'primary':
      return (s: string) => kleur.bold(kleur.blue(s));
    case 'secondary':
      return kleur.magenta;
    case 'info':
      return kleur.cyan;
    case 'success':
      return kleur.green;
    case 'warning':
      return kleur.yellow;
    case 'error':
      return kleur.red;
    case 'muted':
      return kleur.gray;
  }
};
