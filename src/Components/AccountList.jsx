import { useState } from 'react'

const AccountList = ({ accounts, setAccount }) => {
    const [filtered, setFiltered] = useState('all');
    const [modal, setModal] = useState({ class: 'hidden', msg: '', color: '' });

    const deleteHandler = id => {
        if (accounts.filter(acc => acc.id === id)[0].sum > 0) {
            setModal({
                class: 'visible',
                msg: 'Cannot delete account with balance above 0.',
                color: 'hsl(350, 75%, 60%)',
            });
            setTimeout(() => {
                setModal({ class: 'hidden', msg: '', color: '' });
            }, 2000);
        } else {
            setModal({ class: 'visible', msg: 'Successfully deleted.', color: 'hsl(181, 82%, 37%)' });
            setTimeout(() => {
                setModal({ class: 'hidden', msg: '', color: '' });
            }, 2000);
            setAccount(prev => prev.filter(acc => acc.id !== id));
        }
    };

    const filterHandler = e => {
        setFiltered(e.target.value);
    };

    const filteredAccounts = accounts.filter(acc =>
        filtered === 'empty' ? acc.sum === 0 : filtered === 'positive' ? acc.sum > 0 : true
    );

    return (
        <div className="accounts-container">
            {/* ----------------modal---------------------------- */}
            <div className={`${modal.class} modal`}>
                <p style={{ backgroundColor: modal.color }}>{modal.msg} </p>
            </div>

            <section className="accounts">
                {filteredAccounts.length === 0 ? (
                    <p className="none">No items to show.</p>
                ) : (
                    [...filteredAccounts]
                        .sort((a, b) => a.lastName.localeCompare(b.lastName))
                        .map(acc => (
                            <div
                                className="accounts-item"
                                key={acc.id}>
                                <div className="info">
                                    <p>
                                        Merchandise:{' '}
                                        <span>
                                            {acc.name} {acc.lastName}
                                        </span>
                                    </p>
                                    <p> Weight: {acc.lastName} kg </p>
                                    <p>Flameable:<select class="form-select" aria-label="Default select example">
                                                 <option selected>Select option</option>
                                                <option value="1">Yes</option>
                                                 <option value="2">No</option>
                                                </select></p>
                                     <p>Quickly Perish:<select class="form-select" aria-label="Default select example">
                                                 <option selected>Select option</option>
                                                <option value="1">Yes</option>
                                                 <option value="2">No</option>
                                                </select></p>
                                    
                                    <button
                                        className="delete"
                                        onClick={() => deleteHandler(acc.id)}>
                                        Delete Acc
                                    </button>
                                </div>
                                    
                                </div>

                        ))
                )}
            </section>
        </div>
    );
};

export default AccountList;
