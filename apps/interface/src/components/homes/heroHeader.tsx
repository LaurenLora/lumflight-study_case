import React from "react";
import Marquee from "react-fast-marquee";
import Image from "next/image";

const HeroHeader = () => {
  return (
    <>
      <div className="h-full w-full flex flex-col justify-between items-center">
        <Marquee className="w-full flex flex-col">
          <div className="flex w-full h-full">
            <div className="w-[1920px] h-[60px] bg-no-repeat bg-[url('/img/cloud.png')] transform rotate-180" />
            <div className="w-[1920px] h-[60px] bg-no-repeat bg-[url('/img/cloud.png')] transform rotate-180" />
          </div>
        </Marquee>
        <div className="flex justify-center flex-col items-center gap-5 xl:px-0 px-4">
          <h1 className="font-bold text-7xl">LumFlight</h1>
          <p className="text-white/90 w-auto xl:w-1/2">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim rem
            tempore illo nulla cupiditate nobis dicta id porro aut nihil.
          </p>
        </div>
        <div className="w-full flex flex-col">
          <Marquee direction="right" speed={20} className="w-full">
            <Image
              width={100}
              height={50}
              src={"/img/airplane.svg"}
              alt="air-plane"
            />
          </Marquee>
          <Marquee className="w-full flex flex-col">
            <div className="flex w-full h-full">
              <div className="w-[1920px] h-[60px] bg-no-repeat bg-[url('/img/cloud.png')]" />
              <div className="w-[1920px] h-[60px] bg-no-repeat bg-[url('/img/cloud.png')]" />
            </div>
          </Marquee>
        </div>
      </div>
    </>
  );
};
export default HeroHeader;
