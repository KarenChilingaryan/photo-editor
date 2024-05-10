import { RefObject } from "react";

export interface MagnifierProps {
    magnifierRef: RefObject<HTMLDivElement>;
    magnifierPosition: { x: number; y: number };
    magnifierSize: number;
    cursorDotSize: number;
    cursorDotRef: RefObject<HTMLDivElement>;
}