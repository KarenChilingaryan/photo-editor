import { useEffect, useRef, useState, useCallback } from 'react';
import { CanvasSize } from '../utils/interfaces';
import { DefaultCanvasSize } from '../utils/constants';

export const useCanvas = (imageUrl: string) => {
    const [canvasSize, setCanvasSize] = useState<CanvasSize>({
        default: true,
        value: { width: DefaultCanvasSize, height: DefaultCanvasSize }
    });

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mainRef = useRef<HTMLDivElement>(null);

    const drawImage = useCallback(
        (image: HTMLImageElement, canvasWidth: number, canvasHeight: number) => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(image, 0, 0, canvasWidth, canvasHeight);
            }
        },
        [canvasRef]
    );

    useEffect(() => {
        const image = new Image();
        image.onload = () => {
            const aspectRatio = image.width / image.height;
            const canvasWidth = mainRef.current?.offsetWidth || DefaultCanvasSize;
            const canvasHeight = canvasWidth / aspectRatio;

            if (canvasSize.default || mainRef.current?.offsetWidth !== canvasSize.value.width) {
                setCanvasSize({
                    default: false,
                    value: {
                        width: canvasWidth,
                        height: canvasHeight
                    }
                });
            }

            drawImage(image, canvasWidth, canvasHeight);
        };

        image.src = imageUrl;
    }, [canvasSize, imageUrl, drawImage]);

    useEffect(() => {
        setCanvasSize(prev => ({ ...prev, default: true }));
    }, [imageUrl]);

    return { canvasRef, mainRef, canvasSize };
};
