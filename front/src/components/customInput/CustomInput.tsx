import React from 'react';


type CustomInputProps = {
  label: string;
  id: string;
  value: number | string;
  placeholder?: string;
  type?: string;
  min?: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  id,
  value,
  onChange,
  placeholder,
  type = 'text',
  min,
}) => {
  return (
    <div className="d-flex justify-content-center align-items-center flex-column">
      <label htmlFor={id} className="input-label text-start w-100">
        {label}
      </label>
      <input id={id} 
            value={value}
            onChange={onChange}
            placeholder={placeholder} 
            min={min} type={type}
            className="form-control" />
    </div>
  );
};

export default CustomInput;
