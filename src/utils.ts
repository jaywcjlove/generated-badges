
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
