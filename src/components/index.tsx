import React, { useState } from 'react';
import './index.css';

interface ComboBoxProps {
    text: string;
    enum: any;
    onChange: (selectedValue: string, enumValue: any, origin: string) => void;
    origin: string;
    valorInicial: string; // Nova propriedade para o valor inicial do ComboBox
}

const ComboBox: React.FC<ComboBoxProps> = ({ text , enum: Enum, onChange, origin, valorInicial}) => {
    const [selectedValue, setSelectedValue] = useState(valorInicial); // Estado para armazenar o valor selecionado

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newValue = event.target.value;
        setSelectedValue(newValue); // Atualiza o valor selecionado no estado
        const enumValue = Enum[newValue as keyof typeof Enum];
        onChange(newValue, enumValue, origin);
    };

    return (
        <div className='panelCombo'>
            <label className='textoCombo'>{text}</label>
            <select className='combobox' value={selectedValue} onChange={handleChange}>
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
