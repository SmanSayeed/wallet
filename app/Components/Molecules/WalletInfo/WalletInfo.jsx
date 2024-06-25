import React from 'react'

function WalletInfo({userName,walletName,currencySymbol, walletBalance,deposited_balance}) {
  return (
    <div className=" mb-4">
                            <div className="card-body">
                                <p className="card-title">{userName}'s <strong>{walletName}</strong> Wallet</p>
                                {/* <p className="card-subtitle mb-2 text-muted">
                                    Currency: {currencyName} {currencySymbol}
                                </p> */}
                                <p className="card-text"> Balance to deposit: {walletBalance} {currencySymbol}</p>
                                <p className="card-text text-default bg-warning p-2 rounded text-center">Deposited Balance: {deposited_balance || 0} {currencySymbol}</p>
                            </div>
                        </div>
  )
}

export default WalletInfo