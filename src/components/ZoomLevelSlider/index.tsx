import { memo } from 'react';
import { ZoomLevelSliderProps } from '../../utils/interfaces/ZoomLevelSliderProps';

import './style.css'

const ZoomLevelSlider= ({ label, min, max, value, onChange }: ZoomLevelSliderProps) => {
    return (
        <div className='zoom-level-slider'>
            <label htmlFor="zoom-slider">{label}</label>
            <input
                id="zoom-slider"
                type="range"
                min={min}
                max={max}
                value={value}
                onChange={onChange}
            />
            <div>{value}</div>
        </div>
    );
};

export default memo(ZoomLevelSlider);
