import React from "react";
import { TFlight } from "@/types";
import FlightCard from "./FlightCard";

interface FlightListProps {
  flights: TFlight[];
}

const FlightList: React.FC<FlightListProps> = ({ flights }) => {
  return (
    <div className="flex flex-col w-full  gap-5">
      {flights.map((flight, index) => (
        <FlightCard key={index} flight={flight} />
      ))}
    </div>
  );
};

export default FlightList;
