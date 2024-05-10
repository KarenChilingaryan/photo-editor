import { useRef, useState, useCallback } from 'react';
import { rgbToHex } from '../utils/helpers/colorUtils';
import { MagnifierHookProps, MagnifierPosition } from '../utils/interfaces';
import { DefaultZoomSize } from '../utils/constants';

export const useMagnifier = ({ zoomLevel }: MagnifierHookProps) => {
    const cursorDotSize = 2;
    const mathZoom = Math.ceil(DefaultZoomSize / zoomLevel);
    const magnifierSize = !(mathZoom % 2) ? ((mathZoom + 1) * zoomLevel) : (mathZoom * zoomLevel);

    const magnifierRef = useRef<HTMLDivElement>(null);
    const cursorDotRef = useRef<HTMLDivElement>(null);
    const [magnifierPosition, setMagnifierPosition] = useState<MagnifierPosition>({ x: 0, y: 0 });

    const updateMagnifier = useCallback(
        (event: React.MouseEvent<HTMLCanvasElement>, canvasRef: React.RefObject<HTMLCanvasElement>, isDropperActive: boolean) => {
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
            let centerPixelHex = '#000000';

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
                        magCtx.fillStyle = pixelData ? rgbToHex(pixelData[0], pixelData[1], pixelData[2]) : '#FFFFFF';
                        magCtx.fillRect(i * zoomLevel + lineWidth, j * zoomLevel + lineWidth, scaledPixelSize, scaledPixelSize);
                        if (i === halfMagSize && j === halfMagSize && pixelData) {
                            centerPixelHex = rgbToHex(pixelData[0], pixelData[1], pixelData[2]);
                        }
                    }
                }

                magCtx.globalCompositeOperation = 'destination-in';
                magCtx.beginPath();
                magCtx.arc(magnifierSize / 2, magnifierSize / 2, magnifierSize / 2, 0, Math.PI * 2);
                magCtx.closePath();
                magCtx.fill();
                magCtx.globalCompositeOperation = 'source-over';

                magCtx.fillStyle = '#FFFFFF';
                const backgroundWidth = 70;
                const backgroundX = magnifierSize / 2 - backgroundWidth / 2;
                const backgroundY = magCanvas.height / 2 + 15;
                const backgroundHeight = 20;
                magCtx.fillRect(backgroundX, backgroundY, backgroundWidth, backgroundHeight);
                magCtx.font = '14px Arial';
                magCtx.fillStyle = '#000000';
                magCtx.fillText(centerPixelHex, backgroundX + 7, backgroundY + 15);

            }
        },
        [magnifierSize, cursorDotSize, zoomLevel]
    );

    return { magnifierRef, cursorDotRef, magnifierPosition, updateMagnifier, cursorDotSize, magnifierSize };
};
