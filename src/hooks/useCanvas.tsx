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
        (image: HTMLImageElement) => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            const scale = Math.min(canvas.width / image.width, canvas.height / image.height);
            const x = (canvas.width / 2) - (image.width / 2) * scale;
            const y = (canvas.height / 2) - (image.height / 2) * scale;
            const ctx = canvas.getContext('2d');

            if (ctx) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(image, x, y, image.width * scale, image.height * scale);
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

            drawImage(image);
        };

        image.src = imageUrl;
    }, [canvasSize, imageUrl, drawImage]);

    useEffect(() => {
        setCanvasSize(prev => ({ ...prev, default: true }));
    }, [imageUrl]);

    return { canvasRef, mainRef, canvasSize };
};
