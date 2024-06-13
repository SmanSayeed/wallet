'use client';
import { useState } from 'react';
import { useCreateWalletMutation, useGetCurrenciesQuery } from '@/app/services/walletApi';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { getCookie } from '@/app/utils/cookieUtils';
import axios from 'axios';
import Env from '@/app/lib/Env';
import Alert from '@/app/Components/Atoms/Alert/Alert';  // Assuming you have an Alert component

const CreateWalletPage = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [currencyId, setCurrencyId] = useState('');
  const [error, setError] = useState(null);
  const { data: currencyData, error: currencyError, isLoading: isLoadingCurrencies } = useGetCurrenciesQuery();
  const [createWallet, { isLoading: isCreatingWallet }] = useCreateWalletMutation();

  const currencies = currencyData?.data || [];

  const userData = JSON.parse(getCookie('user'));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset any previous errors

    try {
      const currencyIdInt = parseInt(currencyId);

      const walletData = {
        name,
        currency_id: currencyIdInt,
        slug: name.toLowerCase().replace(/\s+/g, '-'),
        user_id: userData.id,
        balance: 0,
      };

      const response = await axios.post(Env.SERVER_ENDPOINT + '/wallets', walletData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getCookie('access_token')}`,
        },
      });

      const createdWallet = response.data;
      console.log('Wallet created:', createdWallet);

      // Redirect to wallet list page after successful creation
      router.push('/wallet');
    } catch (error) {
      console.error('Error creating wallet:', error);
      setError('Failed to create wallet. Please try again.');
    }
  };

  return (
    <div className="container">
      <h1>Create Wallet</h1>
      {userData && <p>Hi {userData.name}, create wallet</p>}
      <form onSubmit={handleSubmit}>
        {currencyError && <Alert message="Failed to fetch currencies" variant="danger" />}
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="currency" className="form-label">Currency</label>
          <select
            className="form-select"
            id="currency"
            value={currencyId}
            onChange={(e) => setCurrencyId(e.target.value)}
            required
          >
            <option value="">Select Currency</option>
            {isLoadingCurrencies ? (
              <option disabled>Loading...</option>
            ) : (
              currencies.map((currency) => (
                <option key={currency.id} value={currency.id}>{currency.name}</option>
              ))
            )}
          </select>
        </div>
        <button type="submit" className="btn btn-primary" disabled={isCreatingWallet}>
          {isCreatingWallet ? 'Creating Wallet...' : 'Create Wallet'}
        </button>
      </form>
      {error && <Alert message={error} variant="danger" />}
    </div>
  );
};

export default CreateWalletPage;