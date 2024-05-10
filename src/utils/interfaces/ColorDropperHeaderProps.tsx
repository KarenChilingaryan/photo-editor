export interface ColorDropperHeaderProps {
    isDropperActive: boolean;
    toggleDropper: () => void;
    setImageUrl: (url: string) => void;
    color: string;
    zoomLevel: number;
    handleSliderChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}