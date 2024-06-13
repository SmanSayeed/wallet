import React from 'react';

const DenominationList = ({ denominationsData, handleRemoveDenomination }) => {
    return (
        <div>
            <h4 className="mt-5 mb-3">Added Denominations</h4>
            {denominationsData?.data && denominationsData.data.length > 0 ? (
                <ul className="list-group">
                    {denominationsData.data.map((denom) => (
                        <li key={denom.id} className="list-group-item d-flex justify-content-between align-items-center">
                            <span>{denom.title} - {denom.amount}</span>
                            <button
                                type="button"
                                className="btn btn-danger btn-sm"
                                onClick={() => handleRemoveDenomination(denom.id)}
                            >
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No denominations added.</p>
            )}
        </div>
    );
};

export default DenominationList;