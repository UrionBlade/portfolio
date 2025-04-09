interface WaterButtonProps {}

const WaterButton: React.FC<WaterButtonProps> = ({}) => {
  return (
    <button className="wave-button">
      <div className="wave"></div>
      <span>Hover me, please!</span>
    </button>
  );
};

export default WaterButton;
