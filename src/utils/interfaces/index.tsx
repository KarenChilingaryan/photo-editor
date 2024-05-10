
export interface MagnifierHookProps {
    zoomLevel: number;
}

export interface MagnifierPosition {
    x: number;
    y: number;
}

export interface CanvasSize {
    default: boolean;
    value: {
        width: number;
        height: number;
    };
}
