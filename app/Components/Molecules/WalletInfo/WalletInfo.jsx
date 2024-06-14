import React from 'react'

function WalletInfo({userName,walletName,currencySymbol, walletBalance}) {
  return (
    <div className=" mb-4">
                            <div className="card-body">
                                <p className="card-title">{userName}'s <strong>{walletName}</strong> Wallet</p>
                                {/* <p className="card-subtitle mb-2 text-muted">
                                    Currency: {currencyName} {currencySymbol}
                                </p> */}
                                <p className="card-text">Balance: {walletBalance} {currencySymbol}</p>
                            </div>
                        </div>
  )
}

export default WalletInfo