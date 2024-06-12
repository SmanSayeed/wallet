'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { useGetWalletByIdQuery } from '@/app/services/walletApi';
import { setSelectedWallet } from '@/app/redux/features/wallet/walletSlice';

const WalletDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const { data: wallet, isLoading, error } = useGetWalletByIdQuery(id);

  useEffect(() => {
    dispatch(setSelectedWallet(wallet)); // Set selected wallet in Redux store
  }, [wallet, dispatch]);

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {wallet && (
        <div>
          <h1>{wallet.name}</h1>
          <p>Balance: {wallet.balance}</p>
          {/* Add more wallet details as needed */}
        </div>
      )}
    </div>
  );
};

export default WalletDetails;
