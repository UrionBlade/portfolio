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
import { useDeviceDetection } from '@/hooks/useDeviceDetection';
import Button from '@/components/Button';
import emailjs from '@emailjs/browser';
import { Formik } from 'formik';
import * as yup from 'yup';

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiper, setSwiper] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  const initialValues = {
    name: '',
    email: '',
    message: '',
  };

  const validationSchema = yup.object().shape({
    name: yup.string().required('Required'),
    email: yup.string().email('Invalid email').required('Required'),
    message: yup.string().required('Required'),
  });

  const { isDesktop, isAbove1440 } = useDeviceDetection();

  const skills = [
    {
      name: 'HTML',
      percentage: 0.9,
    },
    {
      name: 'CSS',
      percentage: 0.8,
    },
    {
      name: 'TypeScript',
      percentage: 0.9,
    },
    {
      name: 'React',
      percentage: 0.8,
    },
    {
      name: 'Next.js',
      percentage: 0.8,
    },
    {
      name: 'React Native',
      percentage: 0.6,
    },
  ];

  const sendEmail = async (name: string, email: string, message: string) => {
    try {
      setLoading(true);
      await emailjs.send(
        'service_8c0pmqx',
        'template_p1s2o3v',
        {
          name: name,
          email: email,
          message: message,
        },
        'qbspO0cIvvnJZOjVk'
      );
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <main className="bg-white p-4 w-screen h-screen overflow-hidden relative">
      <Image
        src={'/images/me.png'}
        width={isDesktop ? 100 : 70}
        height={isDesktop ? 100 : 70}
        className="absolute top-8 left-4 z-50 cursor-pointer hidden lg:block"
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
            <div className="container-system flex justify-start items-start flex-col pt-24 lg:pt-36 grid-system">
              <h1 className="text-gray-50 title-text col-span-full">
                {`Hi, I'm Matteo`}
              </h1>
              <h3 className="text-gray-50 h3-text col-span-full lg:col-span-7">
                I’m the sorcerer behind the pixels and the architect of seamless
                user experiences
              </h3>
            </div>
            <div className="absolute bottom-8">
              <ScrollInvitation />
            </div>
          </section>
        </SwiperSlide>
        <SwiperSlide>
          <section id="about" className="bg-yellow-500 w-full h-full">
            <div className="container-system flex justify-start items-start flex-col pt-24 lg:pt-36 grid-system">
              <div className="col-span-7">
                <h2 className="text-gray-50 title-text">My Skills</h2>
                <h3 className="text-gray-50 h4-text">
                  {`When I'm not busy casting spells, I'm usually busy learning new ones`}
                </h3>
              </div>
              <div className="col-span-full md:col-span-6 space-y-4 lg:space-y-8 mt-8 lg:mt-16">
                {skills.splice(0, 3).map((skill, index) => (
                  <div
                    className="flex justify-start items-start flex-col space-y-2 lg:space-y-4"
                    key={skill.name}
                  >
                    <div className="flex justify-start items-center space-x-2">
                      <h6 className="text-gray-50 h6-text">{skill.name}</h6>
                      <h6 className="text-gray-50 h6-text">
                        {skill.percentage * 10} / 10
                      </h6>
                    </div>
                    <div className="flex justify-start items-center">
                      {Array.from(Array(skill.percentage * 10).keys()).map(
                        (_, index) => (
                          <Image
                            src={'/images/fireball.png'}
                            width={isAbove1440 ? 60 : 30}
                            height={isAbove1440 ? 60 : 30}
                            key={index}
                            alt="fireball-skill"
                          />
                        )
                      )}
                      {Array.from(Array(10 - skill.percentage * 10).keys()).map(
                        (_, index) => (
                          <Image
                            src={'/images/fireball.png'}
                            className=" grayscale-[60%]"
                            width={isAbove1440 ? 60 : 30}
                            height={isAbove1440 ? 60 : 30}
                            key={index}
                            alt="fireball-skill"
                          />
                        )
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="col-span-full md:col-span-6 space-y-4 lg:space-y-8 mt-4 lg:mt-16">
                {skills.splice(0, 3).map((skill, index) => (
                  <div
                    className="flex justify-start items-start flex-col  space-y-2 lg:space-y-4"
                    key={skill.name}
                  >
                    <div className="flex justify-start items-center space-x-4">
                      <h6 className="text-gray-50 h6-text">{skill.name}</h6>
                      <h6 className="text-gray-50 h6-text">
                        {skill.percentage * 10} / 10
                      </h6>
                    </div>
                    <div className="flex justify-start items-center">
                      {Array.from(Array(skill.percentage * 10).keys()).map(
                        (_, index) => (
                          <Image
                            src={'/images/fireball.png'}
                            width={isAbove1440 ? 60 : 30}
                            height={isAbove1440 ? 60 : 30}
                            key={index}
                            alt="fireball-skill"
                          />
                        )
                      )}
                      {Array.from(Array(10 - skill.percentage * 10).keys()).map(
                        (_, index) => (
                          <Image
                            src={'/images/fireball.png'}
                            className=" grayscale-[60%]"
                            width={isAbove1440 ? 60 : 30}
                            height={isAbove1440 ? 60 : 30}
                            key={index}
                            alt="fireball-skill"
                          />
                        )
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </SwiperSlide>
        <SwiperSlide>
          <section id="projects" className="bg-green-500 w-full h-full">
            <div className="container-system flex justify-start items-start flex-col pt-24 lg:pt-36 grid-system">
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
            <div className="container-system flex justify-start items-start lg:items-center lg:h-full flex-col pt-24 lg:pt-0 grid-system">
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
                <div className="w-full h-[2px] bg-gray-50 my-6 md:my-8" />
                <div className="flex justify-start items-center space-x-8">
                  <EnvelopeIcon className="w-8 h-8 text-gray-50" />
                  <button
                    onClick={() =>
                      navigator.clipboard.writeText('matteo.poli4@gmail.com')
                    }
                    className="cursor-pointer"
                  >
                    <h4 className="h4-text text-gray-50 !cursor-pointer underline">
                      matteo.poli4@gmail.com
                    </h4>
                  </button>
                </div>

                <div className="flex justify-start items-center space-x-8 mt-4 md:mt-8">
                  <PhoneIcon className="w-8 h-8 text-gray-50" />
                  <button
                    onClick={() =>
                      navigator.clipboard.writeText('+39 3773066802')
                    }
                    className="cursor-pointer"
                  >
                    <h4 className="h4-text text-gray-50 !cursor-pointer underline">
                      +39 3773066802
                    </h4>
                  </button>
                </div>

                <div className="flex justify-start items-center space-x-8 mt-4 md:mt-8">
                  <MapPinIcon className="w-8 h-8 text-gray-50" />
                  <h4 className="h4-text text-gray-50">Como, Italy</h4>
                </div>
              </div>
              <Formik
                initialValues={initialValues}
                onSubmit={(values) => {
                  sendEmail(values.name, values.email, values.message);
                }}
                validationSchema={validationSchema}
                validateOnChange={false}
                validateOnBlur
                validateOnMount={false}
              >
                {({ values, setFieldValue, handleSubmit }) => (
                  <div className="col-span-full lg:col-span-6 flex justify-center items-end flex-col space-y-8 h-full lg:px-8 mt-8 lg:mt-48">
                    <Input
                      placeholder="Name"
                      value={values.name}
                      onChange={(e) => setFieldValue('name', e.target.value)}
                    />
                    <Input
                      placeholder="Email"
                      value={values.email}
                      onChange={(e) => setFieldValue('email', e.target.value)}
                    />
                    <Textarea
                      placeholder="Message"
                      rows={7}
                      className="overflow-hidden resize-none"
                      maxLength={400}
                      value={values.message}
                      onChange={(e) => setFieldValue('message', e.target.value)}
                    />
                    <Button
                      disabled={
                        !values.message || !values.email || !values.name
                      }
                      onClick={() => handleSubmit()}
                    >
                      Send message
                    </Button>
                  </div>
                )}
              </Formik>
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
            className={`w-8 h-8 hidden lg:inline ${
              activeIndex === 0
                ? 'cursor-not-allowed'
                : 'hover:animate-bounce cursor-pointer'
            }`}
            color={activeIndex === 0 ? '#d1d1d1' : '#f6f6f6'}
            onClick={() => swiper.slidePrev()}
          />
          <ArrowLongDownIcon
            className={`w-8 h-8 hidden lg:inline ${
              activeIndex === 3
                ? 'cursor-not-allowed'
                : 'hover:animate-bounce cursor-pointer'
            }`}
            color={activeIndex === 3 ? '#d1d1d1' : '#f6f6f6'}
            onClick={() => swiper.slideNext()}
          />
          <h5 className="text-gray-50 h5-text ml-4 !font-thin w-16 select-none cursor-text">
            {activeIndex + 1} / 4
          </h5>
        </div>
      </footer>
    </main>
  );
}
