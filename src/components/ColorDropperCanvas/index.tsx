import { ColorDropperCanvasProps } from '../../utils/interfaces/ColorDropperCanvasProps';

const ColorDropperCanvas = ({ canvasRef, handleCanvasClick, handleMouseMove, setShowDropper, isDropperActive, canvasSize }: ColorDropperCanvasProps) => (
    <canvas ref={canvasRef} width={canvasSize.value.width} height={canvasSize.value.height}
        style={{ cursor: isDropperActive ? 'none' : 'default', overflow: 'hidden' }}
        onClick={handleCanvasClick} onMouseMove={handleMouseMove}
        onMouseLeave={() => setShowDropper(false)} onMouseEnter={() => setShowDropper(true)} />
);

export default ColorDropperCanvas;
