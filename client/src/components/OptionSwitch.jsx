import React, { useState, useEffect } from 'react';
import { Plus, Minus } from "lucide-react";
import { set } from 'react-hook-form';

const OptionSwitch = ({ value, onChange, optionA, optionB }) => {

    const [option, setOption] = useState(value === optionA);

    useEffect(() => {
        setOption(value === optionA);
    }, [value, optionA]);

    const selectOptionA = () => {
        setOption(true);
        onChange(optionA);
    };

    const selectOptionB = () => {
        setOption(false);
        onChange(optionB);
    };

    return (
        <div className="relative w-full border border-neutral-200 dark:border-neutral-800 rounded-md flex flex-row shadow">
            <button
                type="button"
                onClick={selectOptionA}
                className={`z-10 py-2 px-6 flex-1 transition-text duration-200 ease-in-out ${option ? 'text-white' : null}`}
            >
                <label className='font-satoshi-medium text-base'>Publico</label>
            </button>
            <button
                type="button"
                onClick={selectOptionB}
                className={`z-10 py-2 px-6 flex-1 transition-text duration-200 ease-in-out ${!option ? 'text-white' : null}`}
            >
                <label className='font-satoshi-medium text-base'>Privado</label>
            </button>
            <div className={`absolute ${option ? 'left-0' : 'translate-x-full'} bottom-0 h-full w-[50%] rounded-md bg-gradient flex-1 -z-10 transition-all duration-200 ease-in-out`} />
        </div>
    );
}

export default OptionSwitch;