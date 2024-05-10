import React, { useState } from 'react';
import { useCanvas } from '../hooks/useCanvas';
import { useColorPicker } from '../hooks/useColorPicker';
import { useMagnifier } from '../hooks/useMagnifier';
import ColorDropperHeader from '../components/ColorDropperHeader';
import ColorDropperCanvas from '../components/ColorDropperCanvas';
import Magnifier from '../components/Magnifier';
import { DefaultImageUrl } from '../utils/constants';

import './style.css'

const ColorDropper: React.FC = () => {
    const [imageUrl, setImageUrl] = useState<string>(DefaultImageUrl); // Default image URL
    const { color, pickColor } = useColorPicker();
    const { canvasRef, mainRef, canvasSize } = useCanvas(imageUrl);
    const [showDropper, setShowDropper] = useState(false);
    const [isDropperActive, setDropperActive] = useState(false);
    const [zoomLevel, setZoomLevel] = useState(20);

    const { magnifierPosition, magnifierSize, cursorDotSize, updateMagnifier, magnifierRef, cursorDotRef } = useMagnifier({ zoomLevel });

    const toggleDropper = () => setDropperActive(!isDropperActive);

    const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setZoomLevel(Number(event.target.value));
    };

    const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isDropperActive || !canvasRef.current) return;
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        pickColor(canvasRef.current!, x, y);
    };

    const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
        if (isDropperActive) {
            updateMagnifier(event, canvasRef, isDropperActive);
        }
    };

    return (
        <div ref={mainRef} className='color-dropper'>
            <ColorDropperHeader isDropperActive={isDropperActive} toggleDropper={toggleDropper} color={color} zoomLevel={zoomLevel} handleSliderChange={handleSliderChange} setImageUrl={setImageUrl} />
            <ColorDropperCanvas canvasRef={canvasRef} handleCanvasClick={handleCanvasClick} handleMouseMove={handleMouseMove} setShowDropper={setShowDropper} isDropperActive={isDropperActive} canvasSize={canvasSize} />
            {isDropperActive && showDropper && (
                <Magnifier magnifierRef={magnifierRef} magnifierPosition={magnifierPosition} magnifierSize={magnifierSize} cursorDotSize={cursorDotSize} cursorDotRef={cursorDotRef} />
            )}
        </div>
    );
};

export default ColorDropper;
