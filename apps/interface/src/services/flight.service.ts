/* eslint-disable @typescript-eslint/no-explicit-any */

import { axiosAuth } from "@/plugins/axios";
import { Session } from "next-auth";

class Flight {
  async fetchFlights(query: {
    page?: number;
    limit?: number;
    session?: Session | any;
  }) {
    try {
      const response = await axiosAuth.get("/flight", {
        params: {
          page: query.page || 1,
          limit: query.limit || 10
        },
        headers: query.session
          ? { Authorization: `Bearer ${query.session.accessToken}` }
          : {}
      });

      return response.data;
    } catch (error) {
      console.error("err", error);
      throw error;
    }
  }
}

const FlightInstance = new Flight();
export default FlightInstance;
