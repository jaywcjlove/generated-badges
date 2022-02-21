
export type StyleOption = 'flat' | 'classic';
export interface BadgenOptions {
  status: string;
  subject?: string;
  color?: string;
  label?: string;
  labelColor?: string;
  style?: StyleOption;
  icon?: string;
  iconWidth?: number;
  scale?: number;
}

export const colors: Record<string, string> = {
  green: '3C1',
  blue: '08C',
  red: 'E43',
  yellow: 'DB1',
  orange: 'F73',
  purple: '94E',
  pink: 'E5B',
  grey: '999',
  gray: '999',
  cyan: '1BC',
  black: '2A2A2A',
};

export const useColor = (svgString: string, color: string) => {
  return svgString.replace(/(<g.+\n\s+<rect.+\n\s+<rect.+fill=")([^"]+)(")/g, `$1${color}$3`);
};

export const addGradient = (svgString: string, gradient: string[], id: string) => {
  let svgGradient = '  <linearGradient id="' + id + '" x1="0%" y1="0%" x2="100%" y2="0%">';
  for (let i = 0; i < gradient.length; i++) {
      const offset = Math.round((100 * i) / (gradient.length - 1));
      const color = colors[gradient[i]] || gradient[i];
      svgGradient += `\n    <stop offset="${offset}%" style="stop-color:#${color}" />`;
  }

  svgGradient += '\n  </linearGradient>\n</svg>';

  return svgString
      .replace('</svg>', svgGradient)
      .replace(/(<g.+\n\s+<rect.+\n\s+<rect.+fill=")([^"]+)(")/g, '$1url(#x)$3');
};
