export declare type StyleOption = 'flat' | 'classic';
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
export declare const colors: Record<string, string>;
export declare const useColor: (svgString: string, color: string) => string;
export declare const addGradient: (svgString: string, gradient: string[], id: string) => string;
