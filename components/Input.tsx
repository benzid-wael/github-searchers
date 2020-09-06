import React from 'react';
import styled from 'styled-components';

const InputText = styled.input`
    height: 48px;
    min-width: 280px;
    padding: 8px;
    font-size: 14px;
    box-sizing: border-box;
    align-self: center;
    border: 2px solid #008c99;
`;

export interface InputProps {
    name?: string;
    placeholder?: string;
    autoComplete?: boolean;
    onChange: (value: string) => void;
}

export const Input = (props: InputProps) => {
    const autoComplete = props.autoComplete || false;

    const onChange = (e) => {
        props.onChange(e.target.value);
    };

    return (
        <InputText
            name={props.name}
            autoComplete={autoComplete ? 'on' : 'off'}
            placeholder={props.placeholder}
            onChange={onChange}
        />
    );
};

export default Input;
