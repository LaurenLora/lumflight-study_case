/* eslint-disable @typescript-eslint/no-explicit-any */
import { TFlight } from "@/types";
import { Button } from "@heroui/react";
import React, { useState } from "react";
import { GiCommercialAirplane } from "react-icons/gi";
import FlightModal from "./FlightModal";
import { formatTime } from "@/lib";

interface FlightCardProps {
  flight: TFlight;
}

const FlightCard: React.FC<FlightCardProps> = ({ flight }) => {
  const [openFlightModal, setOpenFlightModal] = useState<boolean>(false);

  const handleOpenFlightModal = () => {
    setOpenFlightModal(true);
  };

  return (
    <>
      <FlightModal
        isOpen={openFlightModal}
        onClose={() => setOpenFlightModal(false)}
        flight={flight}
      />
      <div className="w-full flex justify-center ">
        <Button
          onPress={handleOpenFlightModal}
          className="flex xl:w-3/4 w-full h-auto bg-transparent px-0 ">
          <div className="w-full flex xl:flex-row flex-col justify-between items-center p-4 gap-5 xl:gap-0 border-b">
            <div className="flex-1 flex h-full  w-full  items-center gap-5">
              <div className="flex items-center h-full justify-center">
                <GiCommercialAirplane className="text-4xl" />
              </div>

              <div className="">
                <p className="xl:text-xl text-sm font-bold text-blue-500">
                  {flight.airline}
                </p>
                <p className="xl:text-lg text-sm text-start font-thin">
                  {flight.flightNumber}
                </p>
              </div>
            </div>

            <div className="flex-[0.5] xl:w-auto w-full  flex justify-between items-center">
              <div className="w-full text-start ">
                <p className="font-semibold text-xl text-blue-700">
                  {flight.departure}
                </p>
                <p className="text-lg">{formatTime(flight.departureTime)}</p>
              </div>
              <div className="mx-4">→</div>
              <div className="w-full text-end">
                <p className="font-semibold text-xl text-blue-700">
                  {flight.destination}
                </p>
                <p className="text-lg">{formatTime(flight.arrivalTime)}</p>
              </div>
            </div>

            <div className="flex-1 text-end  hidden xl:block">
              <p className="text-3xl font-bold text-blue-500">
                {flight.price} TL
              </p>
            </div>
          </div>
        </Button>
      </div>
    </>
  );
};

export default FlightCard;
