// authApi.js

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SERVER_ENDPOINT } from '../lib/ApiEndpoint';
import { setCredentials, setToken } from '../redux/features/auth/authSlice';
import { getCookie } from '../utils/cookieUtils';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: SERVER_ENDPOINT,
    prepareHeaders: (headers, { getState }) => {
        const token = getCookie('access_token');
        if (token) {
          headers.set('Authorization', `Bearer ${token}`)
        }
        return headers;
      },
   }),
 
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
      onSuccess: (data, { dispatch }) => {
        dispatch(setToken(data.token)); // Dispatch action to store token in Redux store
        setCookie('token', data.token); // Set token to cookie
      },
    }),
    validateOtp: builder.mutation({
      query: (otpData) => ({
        url: '/validate-otp',
        method: 'POST',
        body: otpData,
      }),
    }),
    logout: builder.mutation({
        query: () => ({
          url: '/logout',
          method: 'POST',
        }),
        async onQueryStarted(arg, { dispatch }) {
          try {
            await queryFulfilled;
            dispatch(reset());
            removeCookie('token');
          } catch (error) {
            console.error('Logout error:', error);
          }
        },
      }),
    getUserDetails: builder.query({
        query: () => '/user/profile',
        // async onQueryStarted(args, { dispatch, queryFulfilled }) {
        //   try {
        //     const { data } = await queryFulfilled;
        //     dispatch(setCredentials({ user: data })); // Store user details in Redux store
        //   } catch (error) {
        //     if (error.status === 401) {
        //       dispatch(logout());
        //     }
        //   }
        // },
      }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useValidateOtpMutation,useGetUserDetailsQuery,useLogoutMutation } = authApi;
