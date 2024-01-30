import Image from 'next/image';

type PageLoaderProps = {
  percentage: number;
};

const PageLoader: React.FC<PageLoaderProps> = ({ percentage }) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col justify-start items-center relative max-h-[360px] overflow-hidden">
        <Image src="/images/me.png" alt="loader" width={360} height={360} />
        <div
          className="absolute overflow-hidden top-0 transition-all"
          style={{ height: `${360 - percentage * 360}px` }}
        >
          <Image
            src="/images/me.png"
            alt="loader"
            width={360}
            height={360}
            className="grayscale"
          />
        </div>
      </div>
      <h2 className="title-text text-gray-50 font-camera-obscura">Loading</h2>
    </div>
  );
};

export default PageLoader;
