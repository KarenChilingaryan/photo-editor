import { useEffect, useRef, useState } from 'react';
import { CanvasSize } from '../utils/interfaces';
import { DefaultCanvasSize } from '../utils/constants';

export const useCanvas = (imageUrl: string) => {
    const [canvasSize, setCanvasSize] = useState<CanvasSize>({
        default: true,
        value: { width: DefaultCanvasSize, height: DefaultCanvasSize }
    });

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mainRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
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

            if (canvas) {
                const ctx = canvas.getContext('2d');
                if (ctx) {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.drawImage(image, 0, 0, canvasWidth, canvasHeight);
                }
            }
        };

        image.src = imageUrl;
    }, [canvasSize, imageUrl]);

    useEffect(() => {
        setCanvasSize(prev => ({ ...prev, default: true }))
    }, [imageUrl])

    return { canvasRef, mainRef, canvasSize };
};
