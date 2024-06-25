import React, { useState } from 'react';
import { useMakeDepositAndSendOtpMutation,useVerifyTransactionOtpMutation } from '@/app/services/transactionApi';

const DepositDenomination = ({ depositList, currencySymbol, userData, walletData, handleRemoveDeposit }) => {
    
    const [makeDepositAndSendOtp, { isLoading: isSendingOtp, isError: isErrorSendingOtp, error: sendOtpError, isSuccess: isOtpSent, data: otpData }] = useMakeDepositAndSendOtpMutation();

    const [verifyTransactionOtp, { isLoading: isVerifyingOtp, isError: isErrorVerifyingOtp, error: verifyOtpError, isSuccess: isOtpVerified, data: verifyData }] = useVerifyTransactionOtpMutation();

    const [otp, setOtp] = useState('');
    const [showOtpForm, setShowOtpForm] = useState(false);

    const handleDepositNow = async () => {
        if (depositList.length === 0) return;

        const payload = {
            user_id: userData.id,
            wallet_denomination_pivot_ids: depositList.map(denom => denom.pivot_id),
        };

        try {
            const result = await makeDepositAndSendOtp(payload).unwrap();
            alert("OTP sent successfully. Please verify OTP to proceed.");
            setShowOtpForm(true);
        } catch (err) {
            console.error("Failed to deposit: ", err);
            alert("Failed to make deposit. Please try again.");
        }
    };

    const handleOtpSubmit = async (e) => {
        e.preventDefault();

        console.log("depositList: ",depositList);

        if (!otp || !otpData?.data?.id) return;

        const payload = {
            transaction_id: otpData.data.id,
            otp: otp,
            wallet_denomination_pivot_ids: depositList.map(denom => denom.pivot_id),
        };

        try {
            await verifyTransactionOtp(payload).unwrap();
            alert("Transaction verified successfully.");
        } catch (err) {
            console.error("Failed to verify OTP: ", err);
            alert("Failed to verify OTP. Please try again.");
        }
    };

    return (
        <div className='border p-2 rounded deposit-style'>
            <div className='d-flex justify-content-between align-items-center my-2'>
                <button 
                    className='btn btn-warning btn-sm deposit-now-btn' 
                    onClick={handleDepositNow}
                    disabled={isSendingOtp}
                >
                    {isSendingOtp ? 'Processing...' : 'Deposit now'}
                </button>
            </div>

            {showOtpForm && (
                <form onSubmit={handleOtpSubmit} className="my-3">
                    <div className="form-group">
                        <label htmlFor="otp">Enter OTP</label>
                        <input
                            type="text"
                            className="form-control"
                            id="otp"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={isVerifyingOtp}>
                        {isVerifyingOtp ? 'Verifying...' : 'Submit OTP'}
                    </button>
                </form>
            )}

            {depositList && depositList.length > 0 ? (
                <ul className="list-group">
                    {depositList.map((denom, index) => (
                        <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                            <strong>{index + 1}#{denom.pivot_id}</strong>
                            <span>{denom?.title}({denom?.amount} {currencySymbol}) - Amount: {denom?.pivot?.amount}</span>
                            <div className='d-flex gap-2'>
                                <button
                                    type="button"
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleRemoveDeposit(denom.pivot_id)}
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

            {isErrorSendingOtp && <div className="alert alert-danger">Error: {sendOtpError.message}</div>}
            {isErrorVerifyingOtp && <div className="alert alert-danger">Error: {verifyOtpError.message}</div>}
            {isOtpVerified && <div className="alert alert-success">Transaction verified successfully!</div>}
        </div>
    );
};

export default DepositDenomination;
