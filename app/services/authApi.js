import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SERVER_ENDPOINT } from '../lib/ApiEndpoint';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: SERVER_ENDPOINT }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (credentials) => ({
        url: '/register',
        method: 'POST',
        body: credentials,
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    validateOtp: builder.mutation({
      query: (otpData) => ({
        url: '/validate-otp',
        method: 'POST',
        body: otpData,
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useValidateOtpMutation } = authApi;
