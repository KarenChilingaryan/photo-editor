export interface ZoomLevelSliderProps {
    label: string;
    min: number;
    max: number;
    value: number;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}