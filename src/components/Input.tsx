import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

type TInput = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {};

const Input: React.FC<TInput> = ({ ...props }) => {
  return (
    <input
      {...props}
      className="w-full rounded-full outline-none px-6 py-4 placeholder:italic text-gray-800 bg-gray-50 placeholder-gray-200 h6-text cursor-text"
    />
  );
};

export default Input;
