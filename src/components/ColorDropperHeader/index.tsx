import { memo } from 'react';
import { ZoomLevelMaxSize, ZoomLevelMinSize } from '../../utils/constants';
import { ColorDropperHeaderProps } from '../../utils/interfaces/ColorDropperHeaderProps';
import ColorDisplay from '../ColorDisplay';
import ColorDropperIcon from '../ColorDropperIcon';
import ImageUploader from '../ImageUploader';
import ZoomLevelSlider from '../ZoomLevelSlider';

import './style.css'

const ColorDropperHeader = ({ isDropperActive, toggleDropper, color, zoomLevel, handleSliderChange, setImageUrl }: ColorDropperHeaderProps) => (
    <div className='header'>
        <ColorDropperIcon
            iconSrc="/images/icon-color-picker.svg"
            altText="icon-color-picker"
            isActive={isDropperActive}
            onClick={toggleDropper}
        />
        <ColorDisplay color={color} />
        <ZoomLevelSlider
            label="Color Picker Size"
            min={ZoomLevelMinSize}
            max={ZoomLevelMaxSize}
            value={zoomLevel}
            onChange={handleSliderChange}
        />
        <ImageUploader onImageUpload={setImageUrl} />
    </div>
);

export default memo(ColorDropperHeader);
