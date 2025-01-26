import { formatDuration, formatTime } from "@/lib";
import { Role, TCustomer, TFlight } from "@/types";
import {
  Accordion,
  AccordionItem,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader
} from "@heroui/react";
import { useSession } from "next-auth/react";
import React from "react";
import { FaPlaneDeparture } from "react-icons/fa";

interface FlightModalProps {
  isOpen: boolean;
  onClose: () => void;
  flight: TFlight;
}

const FlightModal: React.FC<FlightModalProps> = ({
  isOpen,
  onClose,
  flight
}: FlightModalProps) => {
  const { data: session } = useSession();
  return (
    <Modal
      hideCloseButton
      size="2xl"
      placement="center"
      isOpen={isOpen}
      onClose={onClose}>
      <ModalContent>
        <>
          <ModalHeader className="flex flex-col gap-1 bg-sky">
            <div className="w-full justify-between items-center flex">
              <p className="text-white text-xl font-bold">LumFlight</p>
              <div className=" flex flex-col">
                <p className="text-white/60 text-sm ">Flight</p>
                <p className="text-white">{flight.flightNumber}</p>
              </div>
            </div>
          </ModalHeader>
          <ModalBody className="border-b relative">
            <div className="flex justify-between">
              <div className=" flex flex-col">
                <p className="text-lg font-normal">{flight.departure}</p>
                <p className="xl:text-7xl text-4xl">
                  {flight.departureAirportCode}
                </p>
              </div>
              <div className="airplane">
                <FaPlaneDeparture />
              </div>
              <div className=" flex flex-col">
                <p className="text-lg font-normal">{flight.destination}</p>
                <p className="xl:text-7xl text-4xl">
                  {flight.destinationAirportCode}
                </p>
              </div>
            </div>
          </ModalBody>
          <ModalBody className="border-b">
            <div className="flex justify-between gap-5  w-full">
              <div className=" flex flex-col">
                <p className="text-sm">Departure Time</p>
                <p className="text-lg font-bold">
                  {formatTime(flight.departureTime)}
                </p>
              </div>
              <div>
                <p className="text-sm">Arrival Time</p>
                <p className="text-lg font-bold">
                  {" "}
                  {formatTime(flight.arrivalTime)}
                </p>
              </div>
              <div>
                <p>Duration</p>
                <p className="text-lg font-bold">
                  {formatDuration(flight.duration)}
                </p>
              </div>
            </div>
          </ModalBody>
          <ModalBody>
            {session?.role === Role.Admin ? (
              <div>
                <Accordion>
                  <AccordionItem
                    classNames={{
                      title: "font-bold"
                    }}
                    title="Customer List">
                    {flight.customers?.map((item: TCustomer, index: number) => (
                      <div
                        className="w-full flex justify-between"
                        key={`Customer_${index}`}>
                        <div className="w-full">
                          <p className="text-sky text-lg">Full Name</p>
                          <p className="xl:text-xl text-sm">
                            {item.name} {item.lastname}
                          </p>
                        </div>
                        <div className="w-full flex flex-col justify-end items-end">
                          <p className="text-sky text-lg"> Email</p>
                          <p className="xl:text-xl text-sm">{item.email}</p>
                        </div>
                      </div>
                    ))}
                  </AccordionItem>

                  <AccordionItem
                    classNames={{
                      title: "font-bold"
                    }}
                    title="Customer Comments">
                    {flight.customers?.map((item: TCustomer, index: number) => (
                      <div
                        className="w-full flex  gap-2 mb-4"
                        key={`CustomerComment_${index}`}>
                        <div className="w-full">
                          <p className="xl:text-xl text-sm">
                            <span className="text-sky">
                              {item.name} {item.lastname}
                            </span>
                            : {item.comment}
                          </p>
                        </div>
                      </div>
                    ))}
                  </AccordionItem>
                </Accordion>
              </div>
            ) : (
              <div></div>
            )}
          </ModalBody>
        </>
      </ModalContent>
    </Modal>
  );
};

export default FlightModal;
