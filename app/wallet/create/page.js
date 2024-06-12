// CreateWalletPage.jsx

'use client';
import { useState } from 'react';
import { useCreateWalletMutation, useGetCurrenciesQuery } from '@/app/services/walletApi';

const CreateWalletPage = () => {
  const [name, setName] = useState('');
  const [currencyId, setCurrencyId] = useState('');
  const { data: currencyData, error, isLoading } = useGetCurrenciesQuery();
  const [createWallet, { isLoading: isCreatingWallet }] = useCreateWalletMutation();

  const currencies = currencyData?.data || [];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const walletData = { name, currency_id: currencyId };
      const { data: createdWallet } = await createWallet(walletData).unwrap();
      
      console.log('Wallet created:', createdWallet);
      // Optionally, you can redirect to another page after successful creation
    } catch (error) {
      console.error('Error creating wallet:', error);
      // Handle error appropriately
    }
  };

  return (
    <div className="container">
      <h1>Create Wallet</h1>
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
