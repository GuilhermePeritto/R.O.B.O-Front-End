import React, { useEffect, useState } from 'react';
import './index.css';

interface Values {
    label: string,
    value: any
}

interface ComboBoxProps {
    text: string;
    enum: Values[];
    onChange: (selectedValue: string, enumValue: any, origin: string) => void;
    origin: string;
    valorInicial: string;
}

const ComboBox: React.FC<ComboBoxProps> = ({ text, enum: Enum, onChange, origin, valorInicial }) => {
    const [selectedValue, setSelectedValue] = useState(valorInicial);

    useEffect(() => {
        setSelectedValue(valorInicial);
    }, [valorInicial])
    
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newValue = event.target.value;
        setSelectedValue(newValue);
        const enumValue = Enum.find((item) => item.label === newValue);
        onChange(newValue, enumValue, origin);
    };

    return (
        <div className='panelCombo'>
            <label className='textoCombo'>{text}</label>
            <select className='combobox' value={selectedValue} onChange={handleChange}>
                {Enum.map((item, index) => {
                    return <option key={index} value={item.value}>{item.label}</option>
                })}
            </select>
        </div>
    );
};

export default ComboBox;
