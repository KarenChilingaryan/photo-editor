import { memo } from 'react';
import { ColorDropperIconProps } from '../../utils/interfaces/ColorDropperIconProps';

import './style.css';

const ColorDropperIcon= ({ iconSrc, altText, isActive, onClick }: ColorDropperIconProps) => {
    return (
        <div
            className={`color-dropper-icon ${isActive ? 'active-color-dropper-icon' : ''}`}
            onClick={onClick}
        >
            <img src={iconSrc} alt={altText} />
        </div>
    );
};

export default memo(ColorDropperIcon);
