export interface ColorDropperCanvasProps {
    canvasRef: React.RefObject<HTMLCanvasElement>;
    handleCanvasClick: (event: React.MouseEvent<HTMLCanvasElement>) => void;
    handleMouseMove: (event: React.MouseEvent<HTMLCanvasElement>) => void;
    setShowDropper: (show: boolean) => void;
    isDropperActive: boolean;
    canvasSize: {
        default: boolean,
        value: { width: number; height: number }
    };
}