import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCookie } from '../utils/cookieUtils';
import { SERVER_ENDPOINT } from '../lib/ApiEndpoint';

export const walletApi = createApi({
  reducerPath: 'walletApi',
  baseQuery: fetchBaseQuery({
    baseUrl: SERVER_ENDPOINT,
    prepareHeaders: (headers, { getState }) => {
      const token = getCookie('access_token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getWallets: builder.query({
      query: () => '/wallets',
    }),
    getWalletById: builder.query({
      query: (walletId) => `/wallets/${walletId}`,
    }),
    getCurrencies: builder.query({
      query: () => '/currencies',
    }),
    createDenomination: builder.mutation({
      query: (newDenomination) => ({
        url: '/wallets/attach-denomination',
        method: 'POST',
        body: newDenomination,
      }),
    }),
    removeDenomination: builder.mutation({
      query: (denomination) => ({
        url: '/wallets/detach-denomination',
        method: 'DELETE',
        body: denomination,
      }),
    }),
  }),
});

export const {
  useGetWalletsQuery,
  useGetWalletByIdQuery,
  useGetCurrenciesQuery,
  useCreateDenominationMutation,
  useRemoveDenominationMutation,
} = walletApi;