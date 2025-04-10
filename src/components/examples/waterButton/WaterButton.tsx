import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

export interface WaterButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  children: string;
}

const WaterButton: React.FC<WaterButtonProps> = (props) => {

  const { children, ...rest } = props;

  return (
    <button className="wave-button" {...rest}>
      <div className="wave" />
      <span>{children}</span>
    </button>
  );
};

export default WaterButton;
