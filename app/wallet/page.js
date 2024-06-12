'use client'

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetWalletsQuery } from '@/app/services/walletApi';
import { setSelectedWallet } from '@/app/redux/features/wallet/walletSlice';
import Link from 'next/link';

const Wallets = () => {
  const dispatch = useDispatch();
  const [wallets,setWallets] = useState([]);
  const { data, isLoading, error } = useGetWalletsQuery();
  console.log("data",data)
  useEffect(() => {
    dispatch(setSelectedWallet(null)); // Clear selected wallet when component mounts
    if(data?.success){
        setWallets(data.data);
    }
  }, [dispatch,data]);

  return (
    <div>
      
      <div className='d-flex justify-content-between mb-5 p-3 shadow rounded'>
      <h1>Wallets</h1>
      <Link href="/wallet/create" className='btn btn-success'>
        <span>Create Wallet</span>
      </Link>
      </div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {(wallets && wallets.length>0)?(
    <ul class="list-group">
          {wallets.map((wallet, index) => (
            <React.Fragment key={index}>
             <li class="list-group-item d-flex justify-content-center align-items-center gap-3" key={wallet.id}>
             <span>{wallet.name}</span>
             <div className='d-flex justify-content-center align-items-center gap-3'>
             <Link href={`/wallets/${wallet.id}`} className='btn btn-primary'>
             View
              </Link>
              <Link href={`/wallets/${wallet.id}/manage`} className='btn btn-primary'>
                <span>Manage Wallet</span>
              </Link>
             </div>
            
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
     
    </div>
  );
};

export default Wallets;
