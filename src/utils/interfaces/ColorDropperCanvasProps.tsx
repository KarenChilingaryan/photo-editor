import { RefObject, MouseEvent } from "react";

export interface ColorDropperCanvasProps {
    canvasRef: RefObject<HTMLCanvasElement>;
    handleCanvasClick: (event: MouseEvent<HTMLCanvasElement>) => void;
    handleMouseMove: (event: MouseEvent<HTMLCanvasElement>) => void;
    setShowDropper: (show: boolean) => void;
    isDropperActive: boolean;
    canvasSize: {
        default: boolean,
        value: { width: number; height: number }
    };
}