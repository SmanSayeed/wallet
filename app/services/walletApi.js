import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SERVER_ENDPOINT } from "../lib/ApiEndpoint";
import { getCookie } from "../utils/cookieUtils";

export const walletApi = createApi({
  reducerPath: "walletApi",
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
    getWallets: builder.query({
      query: () => "/wallets",
    }),
    createWallet: builder.mutation({
      query: (newWallet) => ({
        url: "/wallets",
        method: "POST",
        body: newWallet,
      }),
      // Include prepareHeaders function to add token to headers
      prepareHeaders: (headers, { getState }) => {
        const token = getCookie("access_token");
        if (token) {
          // 'Content-Type': 'application/json',
          headers.set("Content-Type", "application/json");
          headers.set("Authorization", `Bearer ${token}`);
        }
        return headers;
      },
    }),
    getWalletById: builder.query({
      query: (walletId) => `/wallets/${walletId}`,
    }),
    getCurrencies: builder.query({
      query: () => "/currencies",
    }),
    getWalletDenominations: builder.query({
      query: (walletId) => `/wallets/${walletId}/get-denominations`,
    }),
    getDenominationsByCurrencyId: builder.query({
      query: (currencyId) => `/currencies/${currencyId}/denominations`,
    }),
    createDenomination: builder.mutation({
      query: (newDenomination) => ({
        url: "/wallets/attach-denomination",
        method: "POST",
        body: newDenomination,
      }),
    }),
    removeDenomination: builder.mutation({
      query: () => ({
        url: `/wallets/detach-denomination`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetWalletsQuery,
  useCreateWalletMutation,
  useGetWalletByIdQuery,
  useGetCurrenciesQuery,
  useGetDenominationsByCurrencyIdQuery,
  useCreateDenominationMutation,
  useRemoveDenominationMutation,
  useGetWalletDenominationsQuery,
} = walletApi;
