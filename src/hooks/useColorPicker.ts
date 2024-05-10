import { MouseEvent, useState } from 'react';
import { rgbToHex } from '../utils/helpers/colorUtils';

export const useColorPicker = () => {
    const [color, setColor] = useState<string>("");

    const pickColor = (canvas: HTMLCanvasElement, event: MouseEvent<HTMLCanvasElement>) => {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const ctx = canvas.getContext('2d');
        if (ctx) {
            const imageData = ctx.getImageData(x, y, 1, 1).data;
            setColor(rgbToHex(imageData[0], imageData[1], imageData[2]));
        }
    };

    return { color, pickColor };
};
