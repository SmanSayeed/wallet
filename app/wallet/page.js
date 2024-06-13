'use client';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetWalletsQuery } from '@/app/services/walletApi';
import { setSelectedWallet } from '@/app/redux/features/wallet/walletSlice';
import Link from 'next/link';
import Spinner from 'react-bootstrap/Spinner'; // Assuming you have react-bootstrap installed
import Alert from '@/app/Components/Atoms/Alert/Alert'; // Assuming you have an Alert component

const Wallets = () => {
  const dispatch = useDispatch();
  const [wallets, setWallets] = useState([]);
  const { data, isLoading, error } = useGetWalletsQuery();
  
  useEffect(() => {
    dispatch(setSelectedWallet(null)); // Clear selected wallet when component mounts
    if (data?.success) {
      setWallets(data.data);
    }
  }, [dispatch, data]);

  return (
    <div className="container">
      <div className="d-flex justify-content-between mb-5 p-3 shadow rounded">
        <h1>Wallets</h1>
        <Link href="/wallet/create" className="btn btn-success">
          <span>Create Wallet</span>
        </Link>
      </div>
      {isLoading && (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      )}
      {error && <Alert message="Error fetching wallets" variant="danger" />}
      {wallets && wallets.length > 0 ? (
        <ul className="list-group">
          {wallets.map((wallet) => (
            <li className="list-group-item d-flex justify-content-between align-items-center" key={wallet.id}>
              <span>{wallet.name}</span>
              <div className="btn-group">
                <Link href={`/wallet/${wallet.id}`} className="btn btn-primary">
                  View
                </Link>
                <Link href={`/wallet/${wallet.id}/manage`} className="btn btn-secondary">
                  Manage Wallet
                </Link>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <Alert message="No wallets found" variant="warning" />
      )}
    </div>
  );
};

export default Wallets;