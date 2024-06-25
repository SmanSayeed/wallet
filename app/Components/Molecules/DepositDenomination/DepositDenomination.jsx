import React from 'react';

const DepositDenomination = ({ depositList, currencySymbol,userData,walletData,handleRemoveDeposit }) => {
    return (
        <div className='border p-2 rounded deposit-style'>
            <div className='d-flex justify-content-between align-items-center my-2'>
            <button className='btn btn-warning btn-sm deposit-now-btn'>
                Deposit now
            </button>
            </div>
           
            {depositList && depositList.length > 0 ? (
                <ul className="list-group">
                    {depositList.map((denom,index) => (
                        <li key={index} className="list-group-item d-flex justify-content-between align-items-center">                         <strong>{index+1}#{denom.pivot_id}</strong>
                            <span>{denom?.title}({denom?.amount} {currencySymbol}) - Amount: {denom?.pivot?.amount}</span>

                            <div className='d-flex gap-2'>


                            <button
                                type="button"
                                className="btn btn-danger btn-sm"
                                onClick={() => handleRemoveDeposit(denom.id)}
                            >
                                Remove
                            </button>
                            </div>
                          
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No denominations added.</p>
            )}
        </div>
    );
};

export default DepositDenomination;