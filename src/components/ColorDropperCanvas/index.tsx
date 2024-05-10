import { memo, useMemo } from 'react';
import { ColorDropperCanvasProps } from '../../utils/interfaces/ColorDropperCanvasProps';

const ColorDropperCanvas = ({ canvasRef, handleCanvasClick, handleMouseMove, setShowDropper, isDropperActive, canvasSize }: ColorDropperCanvasProps) => {
    const canvasStyle = useMemo(() => ({
        cursor: isDropperActive ? 'none' : 'default',
    }), [isDropperActive]);

    return <canvas
        ref={canvasRef}
        width={canvasSize.value.width}
        height={canvasSize.value.height}
        style={canvasStyle}
        onClick={handleCanvasClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setShowDropper(false)}
        onMouseEnter={() => setShowDropper(true)}
    />
};

export default memo(ColorDropperCanvas);
