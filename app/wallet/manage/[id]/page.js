// pages/wallets/[id]/manage.js

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { useGetWalletByIdQuery } from '@/app/services/walletApi';
import { setSelectedWallet } from '@/app/redux/features/wallet/walletSlice';

const ManageWallet = () => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const { data: wallet, isLoading, error } = useGetWalletByIdQuery(id);

  useEffect(() => {
    dispatch(setSelectedWallet(wallet)); // Set selected wallet in Redux store
  }, [wallet, dispatch]);

  return (
    <div>
      <h1>Manage Wallet</h1>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {wallet && (
        <div>
          <h2>{wallet.name}</h2>
          <p>Balance: {wallet.balance}</p>
          {/* Add functionality to manage wallet here */}
        </div>
      )}
    </div>
  );
};

export default ManageWallet;
