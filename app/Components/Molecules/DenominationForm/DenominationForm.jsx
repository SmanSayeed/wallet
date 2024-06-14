import React from 'react';

const DenominationForm = ({ denominations, denominationRecord, handleInputChange, handleSubmit, submitting }) => {
    return (
        <form onSubmit={handleSubmit} className="form d-flex justify-content-start
         align-items-start flex-column border rounded p-3">
            <h4 className="mb-3">Add Denominations</h4>
            <div className="row g-3 align-items-center mb-3">
                <div className="col-md-5">
                    
                    <select
                        className="form-select"
                        id="denomination_id"
                        name="denomination_id"
                        value={denominationRecord.denomination_id}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Select Denomination</option>
                        {denominations.map((d,index) => (
                            <option key={index} value={d.id}>
                                {d.title} - {d.amount}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="col-md-5">
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
                <div className="col-md-2 d-flex align-items-center justify-content-start">
                <button type="submit" className="btn btn-primary" disabled={submitting}>
                        {submitting ? 'Saving...' : 'Save'}
                    </button>
                </div>
            </div>
           
        </form>
    );
};

export default DenominationForm;