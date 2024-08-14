import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

type TButton = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {};

const Button: React.FC<TButton> = ({ ...props }) => {
  return (
    <button
      {...props}
      className="bn632-hover bn19 cursor-pointer px-6 py-6 rounded-[2rem] w-full md:w-auto z-10"
    >
      <h6 className="h6-text text-gray-50 !font-semibold !cursor-pointer">
        {props.children}
      </h6>
    </button>
  );
};

export default Button;
