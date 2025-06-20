"use client";
import React, { useId } from 'react';
import Select from 'react-select';



const SelectInput = ({
  label,
  className = '',
  value,
  onChange,
}: {
  label?: string;
  className?: string;
  value?: any;     
  onChange?: (value: any) => void;  
}) => {
  const id = useId();
  const roomTypes = [
    { value: 'single', label: 'Single' },
    { value: 'double', label: 'Double' },
    { value: 'suite', label: 'Suite' }, 
  ];

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label htmlFor={id} className="text-darkText text-sm block mb-1 font-medium">
          {label}
        </label>
      )}
      <Select
        instanceId={id}
        inputId={id}
        options={roomTypes}
        placeholder="Select a room type"
        value={value}       
        onChange={onChange} 
        className="basic-single w-full py-2 px-3"
        classNamePrefix="select"
        name="roomType"
      />
    </div>
  );
};

export default SelectInput;
