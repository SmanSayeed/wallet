import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SERVER_ENDPOINT } from "../lib/ApiEndpoint";
import { getCookie } from "../utils/cookieUtils";

export const transactionApi = createApi({
  reducerPath: "transactionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: SERVER_ENDPOINT,
    prepareHeaders: (headers, { getState }) => {
      const token = getCookie("access_token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      console.log("Headers:", headers);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTransactions: builder.query({
      query: () => "/transactions",
    }),
  }),
});

export const {
  useGetTransactionsQuery,
} = transactionApi;
