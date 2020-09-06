import React, { useEffect, useRef, useState } from 'react';

import './Dropdown.css';

export interface Option {
    label: string;
    value: any;
}

export interface SelectProps {
    name?: string;
    options: Option[];
    selected?: string;
    onChange?: (option: Option) => void;
}

/**
 * Hook that alerts clicks outside of the passed ref
 */
const useOutsideAlerter = (ref, callback) => {
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                callback();
            }
        }

        // Bind the event listener
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref]);
};

export const Select = (props: SelectProps) => {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(props.selected || '');
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef, () => setOpen(false));

    const selectOption = (option) => {
        setSelected(option.label);
        setOpen(false);
        props.onChange!(option);
    };

    return (
        <div className="custom-select-wrapper" ref={wrapperRef}>
            <div className={open ? 'custom-select open' : 'custom-select'}>
                <div className="custom-select__trigger" onClick={() => setOpen(!open)}>
                    <span>{selected}</span>
                    <div className="arrow"></div>
                </div>
                <div className="custom-options">
                    {props.options.map((option, index) => {
                        return (
                            <span
                                key={`${props.name}-${option.label}-${index}`}
                                className={selected === option.label ? 'custom-option selected' : 'custom-option'}
                                data-value={option.value}
                                onClick={() => selectOption(option)}
                            >
                                {option.label}
                            </span>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Select;
