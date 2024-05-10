export interface MagnifierProps {
    magnifierRef: React.RefObject<HTMLDivElement>;
    magnifierPosition: { x: number; y: number };
    magnifierSize: number;
    cursorDotSize: number;
    cursorDotRef: React.RefObject<HTMLDivElement>;
}