// components/typography/typography.tsx
import React, { FC } from "react";
import WaterButton from "../WaterButton";

const Example: FC<{}> = ({}) => {
  return (
    <div className="flex justify-center items-center h-[50vh] from-[#121212] via-[#0d6efd] to-[#00D26A] bg-gradient-to-br">
      <div className="flex justify-center items-center w-[50%] h-[50%] bg-[rgb(12,12,12)] rounded-8">
        <WaterButton />
      </div>
    </div>
  );
};

export default Example;
