import { ZoomLevelMaxSize, ZoomLevelMinSize } from '../../utils/constants';
import { ColorDropperHeaderProps } from '../../utils/interfaces/ColorDropperHeaderProps';
import ImageUploader from '../ImageUploader';

import './style.css'

const ColorDropperHeader = ({ isDropperActive, toggleDropper, color, zoomLevel, handleSliderChange, setImageUrl }: ColorDropperHeaderProps) => (
    <div className='header'>
        <div className={`color-dropper-icon ${isDropperActive ? 'active-color-dropper-icon' : ''}`}>
            <img src="/images/icon-color-picker.svg" alt="icon-color-picker" onClick={toggleDropper} />
        </div>
        {color && (
            <div className='color-value'>
                {color}
                <div className='show-color' style={{ background: color }} />
            </div>
        )}
        <div className='zoom-level'>
            <label htmlFor="zoom-size">Zoom Size</label>
            <input id="zoom-size" type="range" min={ZoomLevelMinSize} max={ZoomLevelMaxSize} value={zoomLevel} onChange={handleSliderChange} />
            <div>{zoomLevel}</div>
        </div>
        <ImageUploader onImageUpload={setImageUrl} />
    </div>
);

export default ColorDropperHeader;
