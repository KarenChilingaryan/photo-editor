import { ChangeEvent, memo, useRef } from 'react';
import { ImageUploaderProps } from '../../utils/interfaces/ImageUploaderProps';

import './style.css';

const ImageUploader = ({ onImageUpload }: ImageUploaderProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const imageURL = URL.createObjectURL(file);
            onImageUpload(imageURL);
        }
    };

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="image-uploader">
            <label htmlFor="imageUploaderButton">Upload an image:</label>
            <button id="imageUploaderButton" type="button" onClick={handleButtonClick}>
                Choose File
            </button>
            <input
                ref={fileInputRef}
                type="file"
                id="imageUploader"
                accept="image/*"
                onChange={handleFileUpload}
                style={{ display: 'none' }}
            />
        </div>
    );
};

export default memo(ImageUploader);
