import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

type TInput = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  error?: boolean;
};

const Input: React.FC<TInput> = ({ ...props }) => {
  const { error } = props;

  return (
    <input
      {...props}
      className={`w-full rounded-full outline-none px-6 py-4 placeholder:italic text-gray-800 bg-gray-50 placeholder-gray-200 h6-text cursor-text border-2 transition-all duration-200 ${
        error ? 'border-red-500 bg-red-100' : 'border-white'
      }`}
    />
  );
};

export default Input;
