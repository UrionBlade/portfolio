export interface WaterButtonProps {
  children: string;
  onClick?: () => void;
}

const WaterButton: React.FC<WaterButtonProps> = ({ children, onClick }) => {
  return (
    <button className="wave-button" onClick={onClick}>
      <div className="wave"></div>
      <span>{children}</span>
    </button>
  );
};

export default WaterButton;
