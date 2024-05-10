import { useState } from 'react';
import { rgbToHex } from '../utils/helpers/colorUtils';

export const useColorPicker = () => {
    const [color, setColor] = useState<string>("");

    const pickColor = (canvas: HTMLCanvasElement, x: number, y: number) => {
        const ctx = canvas.getContext('2d');
        if (ctx) {
            const imageData = ctx.getImageData(x, y, 1, 1).data;
            setColor(rgbToHex(imageData[0], imageData[1], imageData[2]));
        }
    };

    return { color, pickColor };
};
