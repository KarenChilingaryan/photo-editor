import React, { useRef, useState, useEffect } from 'react';

import './style.css'

const Max = 100;
const Min = 5;

const ColorDropper: React.FC = () => {
    const [showCanvas, setShowCanvas] = useState(false)
    const [showDropper, setShowDropper] = useState(false)

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const magnifierRef = useRef<HTMLDivElement>(null);
    const cursorDotRef = useRef<HTMLDivElement>(null);
    const mainRef = useRef<HTMLDivElement>(null);

    const [color, setColor] = useState<string>("");
    const [zoomLevel, setZoomLevel] = useState<number>(20);
    const [isDropperActive, setDropperActive] = useState<boolean>(false);
    const [magnifierPosition, setMagnifierPosition] = useState({ x: 0, y: 0 });
    const [canvasSize, setCanvasSize] = useState({
        default: true,
        value: { width: 400, height: 400 }
    });
    const magnifierSize = !(Math.ceil(110 / zoomLevel) % 2) ? (Math.ceil(110 / zoomLevel) + 1) * zoomLevel : Math.ceil(110 / zoomLevel) * zoomLevel;
    const cursorDotSize = 2;
    const imageUrl = '/images/1920x1080-4598441-beach-water-pier-tropical-sky-sea-clouds-island-palm-trees.jpg'; // Replace with your image URL


    useEffect(() => {
        const canvas = canvasRef.current;
        const image = new Image();
        image.onload = () => {
            const aspectRatio = image.width / image.height;
            const canvasWidth = mainRef.current?.offsetWidth || 400;
            const canvasHeight = canvasWidth / aspectRatio;

            if (canvasSize.default || mainRef.current?.offsetWidth != canvasSize.value.width) {
                setCanvasSize(
                    {
                        default: false,
                        value: {
                            width: canvasWidth,
                            height: canvasHeight
                        }
                    });
            }

            if (canvas) {
                const ctx = canvas.getContext('2d');
                if (ctx) {
                    ctx.drawImage(image, 0, 0, canvasWidth, canvasHeight);
                }
            }
        };
        image.src = imageUrl;
    }, [canvasSize, imageUrl, showCanvas]);

    const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isDropperActive || !canvasRef.current || !magnifierRef.current || !cursorDotRef.current) return;

        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const scrollLeft = document.documentElement.scrollLeft;
        const scrollTop = document.documentElement.scrollTop;

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const offsetX = magnifierSize / 2;
        const offsetY = magnifierSize / 2;

        setMagnifierPosition({
            x: event.clientX - offsetX + scrollLeft + cursorDotSize * 2,
            y: event.clientY - offsetY + scrollTop + cursorDotSize * 2
        });

        cursorDotRef.current.style.left = `${event.clientX + scrollLeft + (cursorDotSize * 2 - cursorDotSize / 2)}px`;
        cursorDotRef.current.style.top = `${event.clientY + scrollTop + (cursorDotSize * 2 - cursorDotSize / 2)}px`;

        const magCanvas = magnifierRef.current.querySelector('canvas');
        const magCtx = magCanvas?.getContext('2d');

        if (magCtx && magCanvas) {
            magCtx.clearRect(0, 0, magCanvas.width, magCanvas.height);
            const lineWidth = 0.2
            const scaledPixelSize = zoomLevel - lineWidth;

            const halfMagSize = Math.floor(magnifierSize / zoomLevel / 2);
            const startPixelX = Math.floor(x) - halfMagSize;
            const startPixelY = Math.floor(y) - halfMagSize;

            for (let i = 0; i < magnifierSize / zoomLevel; i++) {
                for (let j = 0; j < magnifierSize / zoomLevel; j++) {
                    const targetX = startPixelX + i;
                    const targetY = startPixelY + j;
                    const pixelData = canvas.getContext('2d')?.getImageData(targetX, targetY, 1, 1).data;
                    magCtx.fillStyle = pixelData ? `rgb(${pixelData[0]}, ${pixelData[1]}, ${pixelData[2]})` : '#FFFFFF';
                    magCtx.fillRect(i * zoomLevel + lineWidth, j * zoomLevel + lineWidth, scaledPixelSize, scaledPixelSize);
                }
            }

            magCtx.globalCompositeOperation = 'destination-in';
            magCtx.beginPath();
            magCtx.arc(magnifierSize / 2, magnifierSize / 2, magnifierSize / 2, 0, Math.PI * 2);
            magCtx.closePath();
            magCtx.fill();
            magCtx.globalCompositeOperation = 'source-over';
        }
    };

    const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {

        if (!isDropperActive || !canvasRef.current) return;
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const centerX = x;
        const centerY = y;
        const ctx = canvas.getContext('2d');

        if (ctx) {
            const imageData = ctx.getImageData(centerX, centerY, 1, 1).data;
            setColor(rgbToHex(imageData[0], imageData[1], imageData[2]));
        }
    };

    const rgbToHex = (r: number, g: number, b: number): string => {
        const toHex = (c: number) => ("0" + c.toString(16)).slice(-2);
        return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    };

    useEffect(() => {
        if (mainRef.current) {
            setShowCanvas(true)
        }
    }, [mainRef])

    const handleSliderChange = (event: any) => {
        setZoomLevel(Number(event.target.value));

    }

    return (
        <div style={{ width: '100%', padding: '40px 0' }}>
            <div className='header'>
                <div className={`color-dropper-icon ${isDropperActive ? 'active-color-dropper-icon' : ''}`}>
                    <img src="/images/icon-color-picker.svg" alt="icon-color-picker" onClick={() => setDropperActive(!isDropperActive)} />
                </div>
                {
                    color &&
                    <div
                        className='color-value'
                    >{color}
                        <div
                            className='show-color'
                            style={{
                                background: color
                            }}
                        />
                    </div>
                }
                <div className='zoom-level'>
                    <label htmlFor="zoom-size">Zoom Size</label>
                    <input
                        id="zoom-size"
                        type="range"
                        min={Min}
                        max={Max}
                        value={zoomLevel}
                        onChange={handleSliderChange}
                    />
                    <div>
                        {zoomLevel}
                    </div>
                </div>
            </div>

            {isDropperActive && showDropper &&
                <>
                    <div ref={magnifierRef} style={{
                        position: 'absolute',
                        left: `${magnifierPosition.x}px`,
                        top: `${magnifierPosition.y}px`,
                        width: `${magnifierSize}px`,
                        height: `${magnifierSize}px`,
                        overflow: 'hidden',
                        borderRadius: '50%',
                        backgroundColor: 'white',
                        pointerEvents: 'none'
                    }}>
                        <img src="/images/selected-color.svg" alt="selected-color" style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%'
                        }} />
                        <canvas width={magnifierSize} height={magnifierSize} />
                    </div>
                    <div ref={cursorDotRef} style={{
                        position: 'absolute',
                        width: `${cursorDotSize}px`,
                        height: `${cursorDotSize}px`,
                        borderRadius: '50%',
                        backgroundColor: '#000',
                        pointerEvents: 'none',
                        border: '1px solid white',
                        zIndex: 10,
                    }} />
                </>
            }


            <div style={{ padding: '20px 100px 100px 100px', overflow: 'hidden' }}>
                <div style={{ width: '100%' }} ref={mainRef}>
                    {showCanvas && mainRef.current &&
                        <canvas ref={canvasRef} width={canvasSize.value.width} height={canvasSize.value.height}
                            style={{ cursor: isDropperActive ? 'none' : 'default', overflow: 'hidden' }}
                            onClick={handleCanvasClick} onMouseMove={handleMouseMove} onMouseLeave={() => setShowDropper(false)} onMouseEnter={() => setShowDropper(true)} />
                    }
                </div>
            </div>
        </div>
    );
};

export default ColorDropper;
