'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, EffectCreative } from 'swiper/modules';
import { useEffect, useState } from 'react';
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
import PageLoader from '@/components/PageLoader';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import { loadingAnimation, successAnimation } from '@/utils/animations';
import toast, { Toaster } from 'react-hot-toast';

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiper, setSwiper] = useState<any | null>(null);
  const [percentage, setPercentage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

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

  const projects = [
    {
      name: 'NFT Factory',
      image: '/images/logo-violet.png',
      url: 'https://nft-factory.club',
    },
    {
      name: 'Cataclysm',
      image: '/images/logo-cataclysm.png',
      url: 'https://cataclysm-game.com',
    },
    {
      name: 'Monuverse',
      image: '/images/logo-monuverse.png',
      url: 'https://monuverse.xyz',
    },
    {
      name: 'Reasoned Art',
      image: '/images/logo-reasoned-art.png',
      url: 'https://reasonedart.com',
    },
  ];

  useEffect(() => {
    let currentPercentage = 0;
    const interval = setInterval(() => {
      if (currentPercentage < 1) {
        currentPercentage += 0.05;
        setPercentage(currentPercentage);
      } else {
        clearInterval(interval);
      }
    }, 100);
  }, []);

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

      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 2000);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <main className="bg-white p-4 w-screen h-screen overflow-hidden relative">
      {loading && (
        <motion.section
          className="w-[calc(100vw-2rem)] h-[calc(100vh-2rem)] bg-green-700 bg-opacity-80 flex justify-center items-center flex-col absolute top-4 left-4 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            type: 'easeInOut',
            stiffness: 260,
            damping: 20,
            duration: 0.2,
          }}
        >
          <Lottie animationData={loadingAnimation} className="w-56 h-56" />
          <h2 className="title-text text-gray-50">Loading</h2>
        </motion.section>
      )}
      {success && (
        <motion.section
          className="w-[calc(100vw-2rem)] h-[calc(100vh-2rem)] bg-green-700 bg-opacity-80 flex justify-center items-center flex-col absolute top-4 left-4 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            type: 'easeInOut',
            stiffness: 260,
            damping: 20,
            duration: 0.2,
          }}
        >
          <Lottie
            animationData={successAnimation}
            className="w-56 h-56"
            loop={false}
          />
        </motion.section>
      )}
      <Image
        src={'/images/me.png'}
        width={isDesktop ? 100 : 70}
        height={isDesktop ? 100 : 70}
        className="absolute top-8 left-4 z-40 cursor-pointer hidden lg:block"
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
        <SwiperSlide key={'home'}>
          <section
            id="home"
            className="bg-red-400 w-full h-full relative flex justify-center items-center"
            style={{ backgroundColor: percentage < 1 ? '#06282d' : '#ff6666' }}
          >
            {percentage < 1 && <PageLoader percentage={percentage} />}
            {percentage >= 1 && (
              <motion.div
                className="w-full h-full relative flex justify-start items-center flex-col"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  type: 'easeInOut',
                  stiffness: 260,
                  damping: 20,
                  duration: 1,
                }}
              >
                <div className="container-system flex justify-start items-start flex-col pt-24 lg:pt-36 grid-system">
                  <h1 className="text-gray-50 title-text col-span-full">
                    {`Hi, I'm Matteo`}
                  </h1>
                  <h3 className="text-gray-50 h3-text col-span-full lg:col-span-7">
                    I’m the sorcerer behind the pixels and the architect of
                    seamless user experiences
                  </h3>
                </div>
                <div className="absolute bottom-8">
                  <ScrollInvitation />
                </div>
              </motion.div>
            )}
          </section>
        </SwiperSlide>
        {percentage >= 1 && (
          <>
            <SwiperSlide key={'skills'}>
              <section id="about" className="bg-yellow-500 w-full h-full">
                <div className="container-system flex justify-start items-start flex-col pt-24 lg:pt-36 grid-system">
                  <div className="col-span-7">
                    <h2 className="text-gray-50 title-text">My Skills</h2>
                    <h3 className="text-gray-50 h4-text">
                      {`When I'm not busy casting spells, I'm usually busy learning new ones`}
                    </h3>
                  </div>
                  <div className="col-span-full md:col-span-6 space-y-4 lg:space-y-8 mt-8 lg:mt-16">
                    {skills.splice(0, 3).map((skill) => (
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
                                key={`fill-${index}`}
                                alt="fireball-skill"
                                className="hover:scale-110 transition-all duration-100"
                              />
                            )
                          )}
                          {Array.from(
                            Array(10 - skill.percentage * 10).keys()
                          ).map((_, index) => (
                            <Image
                              src={'/images/fireball.png'}
                              width={isAbove1440 ? 60 : 30}
                              height={isAbove1440 ? 60 : 30}
                              key={`empty-${index}`}
                              alt="fireball-skill"
                              className="grayscale-[60%] hover:scale-110 transition-all duration-100"
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="col-span-full md:col-span-6 space-y-4 lg:space-y-8 mt-4 lg:mt-16">
                    {skills.splice(0, 3).map((skill) => (
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
                                key={`fill-right-${index}`}
                                alt="fireball-skill"
                                className="hover:scale-110 transition-all duration-100"
                              />
                            )
                          )}
                          {Array.from(
                            Array(10 - skill.percentage * 10).keys()
                          ).map((_, index) => (
                            <Image
                              src={'/images/fireball.png'}
                              width={isAbove1440 ? 60 : 30}
                              height={isAbove1440 ? 60 : 30}
                              key={`empty-right-${index}`}
                              alt="fireball-skill"
                              className="grayscale-[60%] hover:scale-110 transition-all duration-100"
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </SwiperSlide>
            <SwiperSlide key={'projects'}>
              <section id="projects" className="bg-green-500 w-full h-full">
                <div className="container-system flex justify-start items-start flex-col pt-24 lg:pt-36 grid-system">
                  <h1 className="text-gray-50 title-text col-span-full">
                    I worked on
                  </h1>
                  {projects.map((project) => (
                    <button
                      className="col-span-2 xl:col-span-3 flex justify-center items-center flex-col mt-16 cursor-pointer"
                      onClick={() => open(project.url)}
                      key={project.name}
                    >
                      <div className="w-2/3 aspect-square rounded-full relative bg-green-200 border-2 lg:border-[6px] border-white">
                        <Image
                          src={project.image}
                          fill
                          alt="logo"
                          className="rounded-full object-scale-down"
                        />
                      </div>
                      <h3 className="text-gray-50 h4-text lg:h3-text mt-4">
                        {project.name}
                      </h3>
                    </button>
                  ))}
                </div>
              </section>
            </SwiperSlide>
            <SwiperSlide key={'contacts'}>
              <section id="about" className="bg-blue-500 w-full h-full">
                <div className="container-system flex justify-start items-start pt-24 2xl:pt-36 lg:h-full flex-col grid-system">
                  <div className="col-span-full lg:col-span-4 xl:col-span-6">
                    <span className="flex justify-start items-center space-x-4">
                      <div className="border-[4px] border-gray-50 bg-green-200 rounded-full h-28 w-28 xl:h-32 xl:w-32 flex justify-center items-center">
                        <Image
                          src={'/images/me.png'}
                          width={isDesktop ? 120 : 80}
                          height={isDesktop ? 120 : 80}
                          alt="logo"
                        />
                      </div>
                      <h2 className="text-gray-50 title-text">Get in touch</h2>
                    </span>
                    <div className="w-full h-[2px] bg-gray-50 my-6 md:my-8" />
                    <div className="flex justify-start items-center space-x-8">
                      <EnvelopeIcon className="w-8 h-8 text-gray-50" />
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(
                            'matteo.poli4@gmail.com'
                          );
                          toast('Copied to clipboard');
                        }}
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
                        onClick={() => {
                          navigator.clipboard.writeText('+39 3773066802');
                          toast('Copied to clipboard');
                        }}
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

                    <div className="flex justify-center items-center space-x-8 mt-4 md:mt-8">
                      <button
                        onClick={() =>
                          open('https://www.linkedin.com/in/urion/')
                        }
                      >
                        <Image
                          src={'/images/ln.png'}
                          width={30}
                          height={30}
                          alt="linkedin"
                        />
                      </button>
                      <button
                        onClick={() => open('https://twitter.com/MatteoPoli15')}
                      >
                        <Image
                          src={'/images/twitter.png'}
                          width={30}
                          height={30}
                          alt="twitter"
                        />
                      </button>
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
                    {({ values, setFieldValue, handleSubmit, errors }) => (
                      <div className="col-span-full lg:col-span-4 xl:col-span-6 flex justify-start items-end flex-col space-y-8 h-full mt-12 lg:mt-0">
                        <Input
                          placeholder="Name"
                          value={values.name}
                          onChange={(e) =>
                            setFieldValue('name', e.target.value)
                          }
                          error={!!errors.name}
                        />
                        <Input
                          placeholder="Email"
                          value={values.email}
                          onChange={(e) =>
                            setFieldValue('email', e.target.value)
                          }
                          error={!!errors.email}
                        />
                        <Textarea
                          placeholder="Message"
                          rows={7}
                          className="overflow-hidden resize-none"
                          maxLength={400}
                          value={values.message}
                          onChange={(e) =>
                            setFieldValue('message', e.target.value)
                          }
                          error={!!errors.message}
                        />
                        <Button onClick={() => handleSubmit()}>
                          Send message
                        </Button>
                      </div>
                    )}
                  </Formik>
                </div>
              </section>
            </SwiperSlide>
          </>
        )}
      </Swiper>
      {percentage >= 1 && (
        <footer className="w-full left-0 bottom-8 absolute z-40 px-8 flex justify-between items-center">
          <div className="w-[170px]">
            <h6 className="text-gray-50">© 2024 - Matteo Poli</h6>
          </div>
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
          <div className="flex justify-end items-center w-[170px]">
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
      )}
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            color: '#f6f6f6',
            backgroundColor: '#212121',
          },
          duration: 1000,
        }}
      />
    </main>
  );
}
