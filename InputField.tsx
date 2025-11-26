import React from 'react';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string; // Label is now optional as it might be handled by the parent cell
  fullWidth?: boolean;
}

export const InputField: React.FC<InputFieldProps> = ({ 
  label, 
  fullWidth = true, 
  className = '', 
  ...props 
}) => {
  return (
    <div className={`w-full ${className}`}>
      {label && <div className="text-sm font-bold mb-1">{label}</div>}
      <input
        className={`
          w-full bg-transparent border-b border-gray-300 focus:border-blue-500
          text-gray-900 px-1 py-1 outline-none text-base font-medium
          placeholder-gray-300
        `}
        placeholder="點擊輸入..."
        {...props}
      />
    </div>
  );
};