import { memo } from "react";
import { MagnifierProps } from "../../utils/interfaces/MagnifierProps";

const Magnifier = ({ magnifierRef, magnifierPosition, magnifierSize, cursorDotSize, cursorDotRef }: MagnifierProps) => (
    <>
        <div ref={magnifierRef} style={{
            position: 'absolute',
            left: `${magnifierPosition.x}px`,
            top: `${magnifierPosition.y}px`,
            width: `${magnifierSize}px`,
            height: `${magnifierSize}px`,
            overflow: 'hidden',
            borderRadius: '50%',
            backgroundColor: 'white',
            pointerEvents: 'none'
        }}>
            <img src="/images/selected-color.svg" alt="selected-color" style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%'
            }} />
            <canvas width={magnifierSize} height={magnifierSize} />
        </div>
        <div ref={cursorDotRef} style={{
            position: 'absolute',
            width: `${cursorDotSize}px`,
            height: `${cursorDotSize}px`,
            borderRadius: '50%',
            backgroundColor: '#000',
            pointerEvents: 'none',
            border: '1px solid white',
            zIndex: 10
        }} />
    </>
);

export default memo(Magnifier);
