import React from 'react';
import './index.css';

interface ComboBoxProps {
    text: string;
    enum: any;
    onChange: (selectedValue: string, enumValue: any, origin: string) => void;
    origin: string;
}

const ComboBox: React.FC<ComboBoxProps> = ({ text , enum: Enum, onChange, origin }) => {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value;
        const enumValue = Enum[selectedValue as keyof typeof Enum];
        onChange(selectedValue, enumValue, origin);
    };

    return (
        <div className='panelCombo'>
            <label className='textoCombo'>{text}</label>
            <select className='combobox' onChange={handleChange}>
                {Object.keys(Enum).map((key) => (
                    <option key={key} value={key}>
                        {Enum[key as keyof typeof Enum]}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default ComboBox;
