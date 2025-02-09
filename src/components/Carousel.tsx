import React, { useState, useCallback } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface CarouselProps {
  showControls?: boolean;
  carouselContent?: React.ReactNode[] | any[];
  autoSlideInterval?: number;
  children?: React.ReactNode;
}

export const Carousel: React.FC<CarouselProps> = ({
  showControls = true,
  //   autoSlideInterval = 5000,
  carouselContent = [],
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setActiveIndex((prevIndex) =>
      prevIndex < carouselContent.length - 1 ? prevIndex + 1 : 0
    );
  }, [carouselContent.length]);

  const prevSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : carouselContent.length - 1
    );
  };

  //   useEffect(() => {
  //     const slideTimer = setInterval(() => {
  //       nextSlide();
  //     }, autoSlideInterval);

  //     return () => clearInterval(slideTimer);
  //   }, [autoSlideInterval, nextSlide]);

  return (
    <section className="w-full overflow-hidden relative py-2">
      {/* Container Grid Layout */}
      <div className="items-center w-full">
        {/* Text and Controls */}
        <div className="flex flex-col dark:text-white justify-end space-y-3">
          <div className="flex items-center gap-6 justify-center w-full mb-4">
            {/* Dots Indicator */}
            <div className="flex items-center w-full space-x-2">
              {carouselContent?.map((_, index) => (
                <div
                  key={index}
                  className={`${
                    activeIndex === index ? "bg-primary" : "bg-[#E5E7EB]"
                  } h-2 w-full rounded-full`}
                ></div>
              ))}
            </div>
          </div>
          {/* Overlay Text */}
          <div className="">
            {carouselContent && carouselContent[activeIndex] && (
              <div>
                <div className="w-full lg:px-12 xl:px-16 md:px-8 px-6">
                  <div className="mb-5">
                    <h4 className="font-bold text-center text-black text-xl sm:text-2xl mb-1">
                      {carouselContent[activeIndex]?.title}
                    </h4>
                    <p className="text-zinc-600 text-center">
                      {carouselContent[activeIndex]?.text}
                    </p>
                  </div>
                  <div className="rounded-xl w-full h-full max-w-[632px] max-h-[306px]">
                    <img
                      src={carouselContent[activeIndex]?.image}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="w-full">
            {/* Controls */}
            {showControls && (
              <div className="flex w-full items-center justify-between space-x-4 py-3 lg:px-12 xl:px-16 md:px-8 px-6">
                {activeIndex + 1 > 1 && <button
                  className="relative z-40 flex px-4 py-1.5 items-center justify-center disabled:opacity-50"
                  onClick={prevSlide}
                >
                  <IoIosArrowBack /> Previous
                </button>}

                <p className="text-lg">
                  Step {activeIndex + 1} of {carouselContent.length}
                </p>
                {activeIndex + 1 === carouselContent.length ? (
                  <button
                    className="rounded-md flex justify-center px-4 py-1.5 items-center gap-1 text-white font-medium group disabled:hover:scale-100 max-sm:text-sm bg-green-500 duration-300 ease-in-out border-none"
                    onClick={() => {
                      window.location.href = "/signup";
                    }}
                  >
                    Get Started
                  </button>
                ) : (
                  <button
                    className="rounded-md flex justify-center px-4 py-1.5 items-center gap-1 text-white font-medium group disabled:hover:scale-100 max-sm:text-sm disabled:bg-opacity-60 bg-gradient-to-b hover:bg-gradient-to-t duration-300 ease-in-out from-[#5272EA] to-[#394FC0] border-none"
                    onClick={nextSlide}
                  >
                    Next <IoIosArrowForward />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
