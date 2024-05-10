import { ChangeEvent } from "react";

export interface ColorDropperHeaderProps {
    isDropperActive: boolean;
    toggleDropper: () => void;
    setImageUrl: (url: string) => void;
    color: string;
    zoomLevel: number;
    handleSliderChange: (event: ChangeEvent<HTMLInputElement>) => void;
}