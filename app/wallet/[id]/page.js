'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { 
    useGetWalletByIdQuery, 
    useGetCurrenciesQuery, 
    useGetDenominationsByCurrencyIdQuery,
    useGetWalletDenominationsQuery, 
    useCreateDenominationMutation,
    useRemoveDenominationMutation, 
} from '@/app/services/walletApi';
import { setSelectedWallet } from '@/app/redux/features/wallet/walletSlice';
import { setCurrencies } from '@/app/redux/features/currency/currencySlice';
import { setDenominations } from '@/app/redux/features/denomination/denominationSlice';
import { getCookie } from '@/app/utils/cookieUtils';
import Alert from '@/app/Components/Atoms/Alert/Alert';
import Spinner from 'react-bootstrap/Spinner';
import DenominationForm from '@/app/Components/Molecules/DenominationForm/DenominationForm';
import DenominationList from '@/app/Components/Molecules/DenominationList/DenominationList';

const WalletDetails = ({ params }) => {
    const router = useRouter();
    const { id } = params;
    const dispatch = useDispatch();
    
    const { data: wallet, isLoading: isLoadingWallet, refetch: refetchWallet, error: walletError } = useGetWalletByIdQuery(id);
    const { data: currenciesData, isLoading: isLoadingCurrencies, error: currenciesError } = useGetCurrenciesQuery();
    const { data: denominationsData, error: denominationError, refetch: refetchWalletDenominations } = useGetWalletDenominationsQuery(id);

    const [walletData, setWalletData] = useState({});
    const [denominationRecord, setDenominationRecord] = useState({ denomination_id: '', amount: '' });
    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [createDenomination] = useCreateDenominationMutation();
    const [removeDenomination] = useRemoveDenominationMutation();

    const currencies = useSelector((state) => state.currency.currencies);
    const denominations = useSelector((state) => state.denomination.denominations);

    const { data: currencyDenominations, error: currencyDenominationsError } = useGetDenominationsByCurrencyIdQuery(walletData.currency_id, {
        skip: !walletData.currency_id,
    });

    useEffect(() => {
        if (!currenciesData || currenciesError) return;
        dispatch(setCurrencies(currenciesData.data));
    }, [currenciesData, currenciesError, dispatch]);

    useEffect(() => {
        dispatch(setSelectedWallet(wallet)); // Set selected wallet in Redux store
        if (wallet && wallet.data) {
            setWalletData(wallet.data);
        }
    }, [wallet, dispatch]);

    useEffect(() => {
        if (currencyDenominations && currencyDenominations.data) {
            dispatch(setDenominations(currencyDenominations.data));
        }
    }, [currencyDenominations, currencyDenominationsError, dispatch]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setDenominationRecord((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);

        try {
            const user = JSON.parse(getCookie('user'));
            await createDenomination({
                user_id: user.id,
                wallet_id: walletData.id,
                currency_id: walletData.currency_id,
                denomination_id: denominationRecord.denomination_id,
                amount: denominationRecord.amount,
            });

            // Refresh wallet data and denominations
            await refetchWallet();
            await refetchWalletDenominations();
            dispatch(setSelectedWallet(wallet));
            setWalletData(wallet.data);
            setDenominationRecord({ denomination_id: '', amount: '' });
        } catch (error) {
            console.error('Error adding denomination:', error);
            setError('Failed to add denomination. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    const handleRemoveDenomination = async (denomId) => {
        try {
            await removeDenomination(denomId);
            await refetchWallet();
            await refetchWalletDenominations();
            dispatch(setSelectedWallet(wallet));
            setWalletData(wallet.data);
        } catch (error) {
            console.error('Error removing denomination:', error);
            setError('Failed to remove denomination. Please try again.');
        }
    };

    const currencyName = currencies.find((c) => c.id === walletData.currency_id)?.name || 'Unknown Currency';

    return (
        <div className="container my-4">
            {isLoadingWallet ? (
                <div className="text-center">
                    <Spinner animation="border" variant="primary" />
                </div>
            ) : walletError ? (
                <Alert message="Failed to fetch wallet details" variant="danger" />
            ) : (
                <>
                    {walletData && (
                        <div className="card mb-4">
                            <div className="card-body">
                                <h3 className="card-title">{walletData.name}</h3>
                                <h5 className="card-subtitle mb-2 text-muted">
                                    {currencyName}
                                </h5>
                                <p className="card-text">Balance: {walletData.balance}</p>
                            </div>
                        </div>
                    )}

                    <DenominationForm 
                        denominations={denominations}
                        denominationRecord={denominationRecord}
                        handleInputChange={handleInputChange}
                        handleSubmit={handleSubmit}
                        submitting={submitting}
                    />
                    {error && <Alert message={error} variant="danger" />}

                    <DenominationList 
                        denominationsData={denominationsData} 
                        handleRemoveDenomination={handleRemoveDenomination} 
                    />
                </>
            )}
        </div>
    );
};

export default WalletDetails;