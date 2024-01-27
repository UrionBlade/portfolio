'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, EffectCreative } from 'swiper/modules';
import { useState } from 'react';
import {
  ArrowLongDownIcon,
  ArrowLongUpIcon,
  EnvelopeIcon,
  MapPinIcon,
  PhoneIcon,
} from '@heroicons/react/24/solid';
import ScrollInvitation from '@/components/ScrollInvitation';
import Input from '@/components/Input';
import Image from 'next/image';
import Textarea from '@/components/Textarea';

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiper, setSwiper] = useState<any | null>(null);

  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  return (
    <main className="bg-white p-4 w-screen h-screen overflow-hidden relative">
      <Image
        src={'/images/me.png'}
        width={100}
        height={100}
        className="absolute top-8 left-4 z-50 cursor-pointer"
        alt="logo"
        onClick={() => swiper.slideTo(0)}
      />
      <Swiper
        className="w-full h-[calc(100vh-2rem)] overflow-hidden"
        onSwiper={setSwiper}
        direction={'vertical'}
        slidesPerView={1}
        mousewheel={true}
        effect="creative"
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        creativeEffect={{
          prev: {
            shadow: true,
            translate: [0, '-20%', -1],
          },
          next: {
            translate: [0, '100%', 0],
          },
        }}
        modules={[Mousewheel, EffectCreative]}
      >
        <SwiperSlide>
          <section
            id="home"
            className="bg-red-400 w-full h-full relative flex justify-start items-center flex-col"
          >
            <div className="container-system flex justify-start items-start flex-col pt-48 lg:pt-36 grid-system">
              <h1 className="text-gray-50 title-text col-span-full">
                {`Hi, I'm Matteo`}
              </h1>
              <h2 className="text-gray-50 h3-text col-span-full lg:col-span-7">
                I’m the sorcerer behind the pixels and the architect of seamless
                user experiences
              </h2>
            </div>
            <div className="absolute bottom-8">
              <ScrollInvitation />
            </div>
          </section>
        </SwiperSlide>
        <SwiperSlide>
          <section id="about" className="bg-yellow-500 w-full h-full">
            <div className="container-system flex justify-start items-start flex-col pt-48 lg:pt-36 grid-system">
              <h1 className="text-gray-50 title-text col-span-full">
                {`Hi, I'm Matteo`}
              </h1>
              <h2 className="text-gray-50 h3-text col-span-7">
                I’m the sorcerer behind the pixels and the architect of seamless
                user experiences
              </h2>
            </div>
          </section>
        </SwiperSlide>
        <SwiperSlide>
          <section id="projects" className="bg-green-500 w-full h-full">
            <div className="container-system flex justify-start items-start flex-col pt-48 lg:pt-36 grid-system">
              <h1 className="text-gray-50 title-text col-span-full">
                {`Hi, I'm Matteo`}
              </h1>
              <h2 className="text-gray-50 h3-text col-span-7">
                I’m the sorcerer behind the pixels and the architect of seamless
                user experiences
              </h2>
            </div>
          </section>
        </SwiperSlide>
        <SwiperSlide>
          <section id="about" className="bg-blue-500 w-full h-full">
            <div className="container-system flex justify-start items-start lg:items-center lg:h-full flex-col pt-48 lg:pt-0 grid-system">
              <div className="col-span-full lg:col-span-6">
                <span className="flex justify-start items-center space-x-4">
                  <div className="border-[4px] border-gray-50 bg-green-200 rounded-full h-32 w-32 flex justify-center items-center">
                    <Image
                      src={'/images/me.png'}
                      width={120}
                      height={120}
                      alt="logo"
                    />
                  </div>
                  <h2 className="text-gray-50 title-text">Get in touch</h2>
                </span>
                <div className="w-full h-[2px] bg-gray-50 my-8" />
                <div className="flex justify-start items-center space-x-8">
                  <EnvelopeIcon className="w-8 h-8 text-gray-50" />
                  <h4 className="h4-text text-gray-50">
                    matteo.poli4@gmail.com
                  </h4>
                </div>

                <div className="flex justify-start items-center space-x-8 mt-8">
                  <PhoneIcon className="w-8 h-8 text-gray-50" />
                  <h4 className="h4-text text-gray-50">+39 3773066802</h4>
                </div>

                <div className="flex justify-start items-center space-x-8 mt-8">
                  <MapPinIcon className="w-8 h-8 text-gray-50" />
                  <h4 className="h4-text text-gray-50">Como, Italy</h4>
                </div>
              </div>
              <div className="col-span-full lg:col-span-6 flex justify-center items-center flex-col space-y-8 h-full lg:px-8 mt-12 lg:mt-18">
                <Input
                  placeholder="Name"
                  value={form.name}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      name: e.target.value,
                    })
                  }
                />
                <Input
                  placeholder="Email"
                  value={form.email}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      email: e.target.value,
                    })
                  }
                />
                <Textarea
                  placeholder="Message"
                  rows={7}
                  className="overflow-hidden"
                  maxLength={400}
                  value={form.message}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      message: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </section>
        </SwiperSlide>
      </Swiper>
      <footer className="w-full left-0 bottom-8 absolute z-50 px-8 flex justify-between items-center">
        <div className="w-[129px]" />
        <div className="w-1/2 flex justify-center items-center">
          <div className="w-1/2 h-[2px] relative">
            <div className="bg-gray-50 w-full h-[2px] absolute" />
            <div
              className="bg-gray-300 h-[2px] absolute transiton-all duration-500"
              style={{
                width: `${(3 - activeIndex) * 33.333}%`,
              }}
            />
          </div>
          <div className="w-1/2 h-[2px] relative">
            <div className="bg-gray-300 w-full h-[2px] absolute" />
            <div
              className="bg-gray-50 h-[2px] absolute transiton-all duration-500"
              style={{
                width: `${activeIndex * 33.333}%`,
              }}
            />
          </div>
        </div>
        <div className="flex justify-end items-center w-[129px]">
          <ArrowLongUpIcon
            className={`w-8 h-8 ${
              activeIndex === 0
                ? 'cursor-not-allowed'
                : 'hover:animate-bounce cursor-pointer'
            }`}
            color={activeIndex === 0 ? '#d1d1d1' : '#f6f6f6'}
            onClick={() => swiper.slidePrev()}
          />
          <ArrowLongDownIcon
            className={`w-8 h-8 ${
              activeIndex === 3
                ? 'cursor-not-allowed'
                : 'hover:animate-bounce cursor-pointer'
            }`}
            color={activeIndex === 3 ? '#d1d1d1' : '#f6f6f6'}
            onClick={() => swiper.slideNext()}
          />
          <h5 className="text-gray-50 h5-text ml-4 !font-semibold w-16 select-none">
            {activeIndex + 1} / 4
          </h5>
        </div>
      </footer>
    </main>
  );
}
