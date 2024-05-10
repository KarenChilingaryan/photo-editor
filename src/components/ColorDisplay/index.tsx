import { memo } from 'react';
import { ColorDisplayProps } from '../../utils/interfaces/ColorDisplayProps';

import './style.css';

const ColorDisplay = ({ color }: ColorDisplayProps) => {
    return (
        color ? (
            <div className="color-value">
                {color}
                <div className="show-color" style={{ background: color }} />
            </div>
        ) : <></>
    );
};

export default memo(ColorDisplay);
