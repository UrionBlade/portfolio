// components/typography/typography.tsx
import React, { FC } from 'react';
import {
  default as WaterButtonDefault,
  WaterButtonProps,
} from '../WaterButton';

const WaterButton: FC<WaterButtonProps> = ({ children, onClick }) => {
  return (
    <div className="flex justify-center items-center h-[50vh] from-[#121212] via-[#0d6efd] to-[#00D26A] bg-gradient-to-br">
      <div className="flex justify-center items-center w-[50%] h-[50%] bg-[rgb(12,12,12)] rounded-8">
        <WaterButtonDefault onClick={onClick} type='button'>{children}</WaterButtonDefault>
      </div>
    </div>
  );
};

export default WaterButton;
