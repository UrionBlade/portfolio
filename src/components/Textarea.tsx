import { DetailedHTMLProps, TextareaHTMLAttributes } from 'react';

type TTextarea = DetailedHTMLProps<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
> & {};

const Textarea: React.FC<TTextarea> = ({ ...props }) => {
  const { value } = props;

  const stringValue = value as string;

  return (
    <div className="relative w-full">
      <textarea
        {...props}
        className="w-full rounded-[2rem] outline-none px-6 py-6 placeholder:italic text-gray-800 bg-gray-50 placeholder-gray-200 h6-text"
      />
      <h6 className="h6-text text-gray-800 absolute bottom-6 right-6 z-50">
        {`${stringValue.length} / ${props.maxLength!}`}
      </h6>
    </div>
  );
};

export default Textarea;
