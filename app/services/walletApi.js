// services/walletApi.js

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SERVER_ENDPOINT } from '../lib/ApiEndpoint';
import { getCookie } from '../utils/cookieUtils';

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
      query: () => '/v1/wallets',
    }),
    createWallet: builder.mutation({
      query: (newWallet) => ({
        url: '/v1/wallets',
        method: 'POST',
        body: newWallet,
      }),
    }),
    getWalletById: builder.query({
      query: (walletId) => `/v1/wallets/${walletId}`,
    }),
  }),
});

export const { useGetWalletsQuery, useCreateWalletMutation, useGetWalletByIdQuery } = walletApi;
