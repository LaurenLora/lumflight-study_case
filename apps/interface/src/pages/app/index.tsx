/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import FlightInstance from "@/services/flight.service";
import { GetServerSideProps } from "next";
import React, { useEffect, useState } from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]";
import { FlightApiResponse, TFlight } from "@/types";
import FlightList from "@/components/app/FlightList";
import { Pagination } from "@heroui/react";
import { useRouter } from "next/router";
import { FaSpinner } from "react-icons/fa";
import { useSession } from "next-auth/react";

export default function Dashboard({
  flights: initialFlights,
  total: initialTotal
}: FlightApiResponse) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [flights, setFlights] = useState<TFlight[]>(initialFlights); // Uçuş verilerini state'te tut
  const [total, setTotal] = useState<number>(initialTotal); //
  const { data: session } = useSession();

  const handlePageChange = async (page: number) => {
    setLoading(true);
    setCurrentPage(page);
    await router.push(`/app?page=${page}&limit=5`);
    setLoading(false);
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const apiResponse = await FlightInstance.fetchFlights({
          page: currentPage,
          limit: 5,
          session: session
        });

        setFlights(apiResponse.flights);
        setTotal(apiResponse.total || 0);
      } catch (error) {
        console.error("errrr: ", error);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [currentPage]);

  return (
    <div className="flex flex-col  w-full items-center justify-start pb-24 px-5 gap-5 relative  min-h-[90vh]">
      <h2 className="text-5xl font-bold">All Flights</h2>

      {loading && (
        <div className="w-full flex justify-center items-center h-full ">
          <FaSpinner className="animate-spin text-5xl" />
        </div>
      )}

      {!loading && <FlightList flights={flights} />}
      <div className="xl:w-full bg-white  flex justify-center border-gray-200 absolute   bottom-10 z-10">
        <Pagination
          onChange={handlePageChange}
          showControls
          initialPage={currentPage}
          total={Math.ceil(total / 5)}
        />
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false
      }
    };
  }
  const page = parseInt(context.query.page as string) || 1;
  const limit = 5;
  try {
    const apiResponse = await FlightInstance.fetchFlights({
      page,
      limit,
      session
    });

    const flights = apiResponse.flights.map((flight: TFlight) => {
      if (session.role !== "admin") {
        const { customers, ...rest } = flight;
        return rest;
      }
      return flight;
    });

    return {
      props: {
        flights,
        total: apiResponse.total || 0
      }
    };
  } catch (error) {
    console.error("Error fetching flights:", error);
    return {
      props: {
        flights: [],
        total: 0
      }
    };
  }
};
