import React from 'react';

interface ComboBoxProps {
    enum : any;
}

const ComboBox: React.FC<ComboBoxProps> = ({ enum: Enum }) => {
    return (
        <select className='combobox'>
            {Object.keys(Enum).map((key) => (
                <option key={key} value={Enum[key as keyof typeof Enum]}>
                    {Enum[key as keyof typeof Enum]}
                </option>
            ))}
        </select>
    );
};

export default ComboBox;