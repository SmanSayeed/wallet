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
    makeDepositAndSendOtp: builder.mutation({
      query: (payload) => ({
        url: "/make-deposit-and-send-otp",
        method: "POST",
        body: payload,
      }),
    }),
    verifyTransactionOtp: builder.mutation({
      query: (payload) => ({
        url: "/verify-transaction-otp",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const {
  useGetTransactionsQuery,
  useMakeDepositAndSendOtpMutation,
  useVerifyTransactionOtpMutation,
} = transactionApi;
