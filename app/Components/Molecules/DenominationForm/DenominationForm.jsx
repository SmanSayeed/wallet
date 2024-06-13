import React from 'react';

const DenominationForm = ({ denominations, denominationRecord, handleInputChange, handleSubmit, submitting }) => {
    return (
        <form onSubmit={handleSubmit}>
            <h4 className="mb-3">Add Denominations</h4>
            <div className="row g-3 align-items-center mb-3">
                <div className="col-md-5">
                    <label htmlFor="denomination_id" className="form-label">Denomination</label>
                    <select
                        className="form-select"
                        id="denomination_id"
                        name="denomination_id"
                        value={denominationRecord.denomination_id}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Select Denomination</option>
                        {denominations.map((d) => (
                            <option key={d.id} value={d.id}>
                                {d.title} - {d.amount}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="col-md-5">
                    <label htmlFor="amount" className="form-label">Amount</label>
                    <input
                        type="number"
                        className="form-control"
                        id="amount"
                        name="amount"
                        value={denominationRecord.amount}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="col-md-2 d-flex align-items-end">
                    <button type="submit" className="btn btn-primary" disabled={submitting}>
                        {submitting ? 'Saving...' : 'Save'}
                    </button>
                </div>
            </div>
        </form>
    );
};

export default DenominationForm;