import { useState } from 'react';

const AddNewAcccount = ({ accountListGenerator }) => {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [modal, setModal] = useState({ class: 'hidden', msg: '', color: '' });

    // Name and lastname validation
    function inputIsValidInput(name) {
        return name.trim()  ;
    }

    const addNameHandler = e => {
        setName(e.target.value);
    };

    const addLastNameHandler = e => {
        setLastName(e.target.value);
    };

    const submitHandler = e => {
        e.preventDefault();
        if (inputIsValidInput(name) && inputIsValidInput(lastName)) {
            accountListGenerator(name, lastName);
            setName('');
            setLastName('');
            setModal({
                class: 'visible',
                msg: 'New box successfully created.',
                color: 'hsl(181, 82%, 37%)',
            });
            setTimeout(() => {
                setModal({ class: 'hidden', msg: '' });
            }, 2500);
        } else {
            setModal({
                class: 'visible',
                msg: 'Only LETTERS and SPACES are allowed.',
                color: 'hsl(350, 75%, 60%)',
            });
            setTimeout(() => {
                setModal({ class: 'hidden', msg: '' });
            }, 2500);
        }
    };

    return (
        <form onSubmit={submitHandler}>
            <div>
                <label htmlFor="name">Merchadise</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={addNameHandler}
                    placeholder="Enter box name"
                    title="Must contain at least one letter."
                    required
                />
            </div>
            <div>
                <label htmlFor="lastname">Weight</label>
                <input
                    type="text"
                    id="lastname"
                    value={lastName}
                    placeholder="Enter your surname"
                    title="Must contain at least one number."
                    onChange={addLastNameHandler}
                    required
                />
            </div>
            <button
                className="add"
                type="submit">
                Create box
            </button>
            {/* ----------------modal---------------------------- */}
            <div className={`${modal.class} modal`}>
                <p style={{ backgroundColor: modal.color }}>{modal.msg} </p>
            </div>
        </form>
    );
};

export default AddNewAcccount;
