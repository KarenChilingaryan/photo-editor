import { RefObject, MouseEvent, useRef, useState, useCallback } from 'react';
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

    const drawMagnifiedArea = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, magCanvas: HTMLCanvasElement, x: number, y: number) => {
        ctx.clearRect(0, 0, magCanvas.width, magCanvas.height);

        let centerPixelHex = '#000000';
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
                ctx.fillStyle = pixelData ? rgbToHex(pixelData[0], pixelData[1], pixelData[2]) : '#FFFFFF';
                ctx.fillRect(i * zoomLevel + lineWidth, j * zoomLevel + lineWidth, scaledPixelSize, scaledPixelSize);
                if (i === halfMagSize && j === halfMagSize && pixelData) {
                    centerPixelHex = rgbToHex(pixelData[0], pixelData[1], pixelData[2]);
                }
            }
        }

        ctx.globalCompositeOperation = 'destination-in';
        ctx.beginPath();
        ctx.arc(magnifierSize / 2, magnifierSize / 2, magnifierSize / 2, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
        ctx.globalCompositeOperation = 'source-over';

        ctx.fillStyle = '#FFFFFF';
        const backgroundWidth = 70;
        const backgroundX = magnifierSize / 2 - backgroundWidth / 2;
        const backgroundY = magCanvas.height / 2 + 15;
        const backgroundHeight = 20;
        ctx.fillRect(backgroundX, backgroundY, backgroundWidth, backgroundHeight);
        ctx.font = '14px Arial';
        ctx.fillStyle = '#000000';
        ctx.fillText(centerPixelHex, backgroundX + 7, backgroundY + 15);
    };

    const updateMagnifier = useCallback(
        (event: MouseEvent<HTMLCanvasElement>, canvasRef: RefObject<HTMLCanvasElement>, isDropperActive: boolean) => {
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

            if (magCanvas && magCanvas.getContext && canvas) {
                const magCtx = magCanvas.getContext('2d');
                if (magCtx) {
                    drawMagnifiedArea(magCtx, canvas, magCanvas, x, y);
                }
            }
        },
        [magnifierSize, cursorDotSize, zoomLevel]
    );

    return { magnifierRef, cursorDotRef, magnifierPosition, updateMagnifier, cursorDotSize, magnifierSize };
};
