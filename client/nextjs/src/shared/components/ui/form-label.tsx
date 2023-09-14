import React from 'react';

type FormLabelProps = {
  label: string;
  required: boolean;
};

export default function FormLabel({ label, required }: FormLabelProps) {
  return (
    <label htmlFor={label} className="text-14 text-gray-600 space-y-0.5 w-full">
      {label} {required && <span className="text-red-400">*</span>}
    </label>
  );
}
