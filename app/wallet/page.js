'use client'

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetWalletsQuery } from '@/app/services/walletApi';
import { setSelectedWallet } from '@/app/redux/features/wallet/walletSlice';
import Link from 'next/link';

const Wallets = () => {
  const dispatch = useDispatch();
  const { data: wallets, isLoading, error } = useGetWalletsQuery();
  console.log("wallet",wallets)
  useEffect(() => {
    dispatch(setSelectedWallet(null)); // Clear selected wallet when component mounts
  }, [dispatch]);

  return (
    <div>
      <h1>Wallets</h1>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {(wallets && wallets.length>0)?(
        <ul>
          {wallets.map((wallet, index) => (
            <React.Fragment key={index}>
             <li key={wallet.id}>
              <Link href={`/wallets/${wallet.id}`}>
                <span>{wallet.name}</span>
              </Link>
              <Link href={`/wallets/${wallet.id}/manage`}>
                <span>Manage Wallet</span>
              </Link>
            </li>
            </React.Fragment>          
          ))}
        </ul>
      )
      :
      (
        <>
        <h4 className='alert alert-warning'>No wallets found</h4>
        </>
      )
    
    }
      <Link href="/wallet/create">
        <span>Create Wallet</span>
      </Link>
    </div>
  );
};

export default Wallets;
