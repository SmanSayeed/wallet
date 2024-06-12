// CreateWalletPage.jsx

'use client';
import { useState } from 'react';
import { useCreateWalletMutation, useGetCurrenciesQuery } from '@/app/services/walletApi';
import { useSelector } from 'react-redux';
import { getCookie } from '@/app/utils/cookieUtils';
import axios from 'axios'; 
import Env from '@/app/lib/Env';
const CreateWalletPage = () => {
  const [name, setName] = useState('');
  const [currencyId, setCurrencyId] = useState('');
  const { data: currencyData, error, isLoading } = useGetCurrenciesQuery();
  const [createWallet, { isLoading: isCreatingWallet }] = useCreateWalletMutation();

  const currencies = currencyData?.data || [];

  const userData = JSON.parse(getCookie('user'));


 const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const currencyIdInt = parseInt(currencyId);

      const walletData = {
        name,
        currency_id: currencyIdInt, // Corrected field name with integer value
        slug: name.toLowerCase().replace(/\s+/g, '-'),
        user_id: userData.id, // Assuming user_id needs to be provided
        balance: 0, // Assuming balance needs to be provided
      };

      console.log(walletData);

      const response = await axios.post(Env.SERVER_ENDPOINT + '/wallets', walletData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getCookie('access_token')}`, // Include token in the header
        },
      });

      const createdWallet = response.data;

      console.log('Wallet created:', createdWallet);
      // Optionally, you can redirect to another page after successful creation
    } catch (error) {
      console.error('Error creating wallet:', error);
      // Handle error appropriately
    }
  };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     try {
//         const currencyIdInt = parseInt(currencyId);

//         const walletData = {
//           name,
//           currency_id: currencyIdInt, // Corrected field name with integer value
//           slug: name.toLowerCase().replace(/\s+/g, '-'),
//           user_id: userData.id, // Assuming user_id needs to be provided
//           balance: 0, // Assuming balance needs to be provided
//         };
//       console.log(walletData);
//       const response = await createWallet({
//         body: JSON.stringify(walletData),
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       });
  
//       const createdWallet = response.data;
  
      
//       console.log('Wallet created:', createdWallet);
//       // Optionally, you can redirect to another page after successful creation
//     } catch (error) {
//       console.error('Error creating wallet:', error);
//       // Handle error appropriately
//     }
//   };

  return (
    <div className="container">
      <h1>Create Wallet</h1>
      Hi {userData.name}, create wallet
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="currency" className="form-label">Currency</label>
          <select className="form-select" id="currency" value={currencyId} onChange={(e) => setCurrencyId(e.target.value)}>
            <option value="">Select Currency</option>
            {isLoading ? (
              <option disabled>Loading...</option>
            ) : error ? (
              <option disabled>Error fetching currencies</option>
            ) : (
              currencies.map(currency => (
                <option key={currency.id} value={currency.id}>{currency.name}</option>
              ))
            )}
          </select>
        </div>
        <button type="submit" className="btn btn-primary" disabled={!name || !currencyId || isCreatingWallet}>
          {isCreatingWallet ? 'Creating Wallet...' : 'Create Wallet'}
        </button>
      </form>
    </div>
  );
};

export default CreateWalletPage;
