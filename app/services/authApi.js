import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SERVER_ENDPOINT } from '../lib/ApiEndpoint';
import { setEmail, setCredentials, validateOtp } from '../redux/features/auth/authSlice';
import { getCookie, setCookie, removeCookie } from '../utils/cookieUtils';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: SERVER_ENDPOINT,
    prepareHeaders: (headers) => {
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
      transformResponse: (response) => response.data,
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setEmail(data.email));
        } catch (error) {
          console.error('Login error:', error);
        }
      },
    }),
    validateOtp: builder.mutation({
      query: (otpData) => ({
        url: '/verify-otp',
        method: 'POST',
        body: otpData,
      }),
      transformResponse: (response) => response.data,
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const { token, user } = data;
          dispatch(setCredentials({ user, token }));
          setCookie('access_token', token, { expires: 7 });
        } catch (error) {
          console.error('OTP Validation error:', error);
        }
      },
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/logout',
        method: 'POST',
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(reset());
          removeCookie('access_token');
        } catch (error) {
          console.error('Logout error:', error);
        }
      },
    }),
    getUserDetails: builder.query({
      query: () => '/user/profile',
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useValidateOtpMutation,
  useGetUserDetailsQuery,
  useLogoutMutation,
} = authApi;