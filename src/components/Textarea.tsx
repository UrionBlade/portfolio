import { DetailedHTMLProps, TextareaHTMLAttributes } from 'react';

type TTextarea = DetailedHTMLProps<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
> & {
  error?: boolean;
};

const Textarea: React.FC<TTextarea> = ({ ...props }) => {
  const { value, error } = props;

  const stringValue = value as string;

  return (
    <div className="relative w-full flex justify-start items-end flex-col space-y-4">
      <textarea
        {...props}
        className={`w-full rounded-[2rem] outline-none px-6 py-6 placeholder:italic text-gray-800 bg-gray-50 placeholder-gray-200 h6-text cursor-text border-2 transition-all duration-200 ${
          error ? 'border-red-500 bg-red-100' : 'border-white'
        }`}
      />
      <h3 className="h6-text text-gray-50 z-50 !font-medium">
        {`${stringValue.length} / ${props.maxLength!}`}
      </h3>
    </div>
  );
};

export default Textarea;
