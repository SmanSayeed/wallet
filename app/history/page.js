'use client'
import React from 'react'
import { useGetTransactionsQuery } from '../services/transactionApi';

function history() {
  const { data: transactionData, error: transactionError } = useGetTransactionsQuery();

  console.log("transactionData = ", transactionData);

  return (
    <div className="container">
      <div className="d-flex justify-content-between mb-5 p-3 shadow rounded my-3">
        <h1>History</h1>
      </div>

      <div className='row p-3 shadow rounded'>
        <div className="col-md-12">
          <table className='table table-striped'>
            <thead>
              <tr>
                <th>ID</th>
                <th>User ID</th>
                <th>Wallet ID</th>
                <th>Amount</th>
                <th>Currency</th>
                <th>Payment Gateway</th>
                <th>Status</th>
                <th>Type</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {transactionData && transactionData.data.length > 0 ? (
                transactionData.data.map((transaction) => (
                  <tr key={transaction.id}>
                    <td>{transaction.id}</td>
                    <td>{transaction.user_id}</td>
                    <td>{transaction.wallet_id}</td>
                    <td>{transaction.amount}</td>
                    <td>{transaction.currency_name} ({transaction.currency_symbol})</td>
                    <td>{transaction.payment_gateway}</td>
                    <td>{transaction.payment_gateway_status}</td>
                    <td>{transaction.type}</td>
                    <td>{new Date(transaction.created_at).toLocaleString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center">No Data Found</td>
                </tr>
              )}
            </tbody>
          </table>
          {transactionError && (
            <div className="alert alert-danger">
              Error fetching transactions: {transactionError.message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default history;
