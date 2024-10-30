import React, { useState, useEffect } from 'react';
import { Plus, Minus } from "lucide-react";

const InputNumber = ({ value, onChange, min = 0, max = 100 }) => {

    const handleDecrement = () => {
        if (value > min) {
            onChange(value - 1);
        }
    };

    const handleIncrement = () => {
        if (value < max) {
            onChange(value + 1);
        }
    };

    const handleChange = (e) => {
        const newValue = parseInt(e.target.value, 10);
        if (newValue >= min && newValue <= max) {
            onChange(newValue);
        }
    };

    return (
        <div className="w-full border border-neutral-200 dark:border-neutral-800 rounded-md flex flex-row justify-between items-center shadow">

            <button
                type="button"
                onClick={handleDecrement}
                className="py-3 px-6 border-r border-neutral-200 dark:border-neutral-800 rounded-l-md bg-neutral-100 dark:bg-neutral-900 active:bg-neutral-300 dark:active:bg-neutral-800 transition-bg duration-200 ease-out"
            >
                <Minus size={16} />
            </button>
            <div>
                <input
                    type="number"
                    value={value}
                    onChange={handleChange}
                    min={min}
                    max={max}
                    className={`text-black dark:text-white text-base font-normal bg-transparent ${value <= 0 ? 'hidden' : null} text-center`}
                />
                <label className={`text-black dark:text-white text-base font-normal bg-transparent ${value > 0 ? 'hidden' : null} `}>Sin Limite</label>
            </div>
            <button
                type="button"
                onClick={handleIncrement}
                className="py-3 px-6 border-l border-neutral-200 dark:border-neutral-800 rounded-r-md bg-neutral-100 dark:bg-neutral-900 active:bg-neutral-300 dark:active:bg-neutral-800 transition-bg duration-200 ease-out"
            >
                <Plus size={16} />
            </button>
        </div>
    );
}

export default InputNumber;