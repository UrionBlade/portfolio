import { ArrowLongDownIcon } from '@heroicons/react/24/solid';
import Scroll from './icons/Scroll';
import { useDeviceDetection } from '@/hooks/useDeviceDetection';

type ScrollInvitationProps = {
  onClick: () => void;
};

const ScrollInvitation: React.FC<ScrollInvitationProps> = ({onClick}) => {
  const { isDesktop } = useDeviceDetection();

  return (
    <button className="flex justify-center items-center relative cursor-pointer" onClick={() => onClick()}>
      <div className="animate-[spin_10s_linear_infinite] ">
        <Scroll />
      </div>
      <div className="animate-bouncer absolute">
        <ArrowLongDownIcon
          width={isDesktop ? 70 : 50}
          height={isDesktop ? 70 : 50}
          className="text-gray-50"          
        />
      </div>
    </button>
  );
};

export default ScrollInvitation;
