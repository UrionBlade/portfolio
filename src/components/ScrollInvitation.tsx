import { ArrowLongDownIcon } from '@heroicons/react/24/solid';
import Scroll from './icons/Scroll';
import { useDeviceDetection } from '@/hooks/useDeviceDetection';

const ScrollInvitation: React.FC = () => {
  const { isDesktop } = useDeviceDetection();

  return (
    <div className="flex justify-center items-center relative">
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
    </div>
  );
};

export default ScrollInvitation;
