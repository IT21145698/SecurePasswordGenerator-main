import React, { useEffect, useState } from 'react';
import './passwordGenerator.css'; //import passwordGenerator css file
import copyIcon from '../icon/copy.png'; 
import { ToastContainer, toast } from 'react-toastify'; 
//Pop-up messages from Toast or Toastify notifications show the user some information.

const symbolsList = "!@#$%^&*()?";
const lowercaseList = 'abcdefghijklmnopqrstuvwxyz';
const uppercaseList = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numbersList = '0123456789';

function PasswordGenerator() {
    const [customerName, setCustomerName] = useState('');//new change
    const [generatedPassword, setGeneratedPassword] = useState('');//new change
    // Declare a state variable called 'password' and a function to update it
    const [password, setPassword] = useState('');
    // Declare a state variable called 'lowerCase' and a function to update it
    const [lowerCase, setLowerCase] = useState(true);
    // Declare a state variable called 'upperCase' and a function to update it
    const [upperCase, setUpperCase] = useState(true);
    // Declare a state variable called 'numbers' and a function to update it
    const [numbers, setNumbers] = useState(true);
    // Declare a state variable called 'symbols' and a function to update it
    const [symbols, setSymbols] = useState(true);
    // Declare a state variable called 'passwordLength' and a function to update it
    const [passwordLength, setPasswordLength] = useState(8);
    // Declare a state variable called 'selectedChoices' and a function to update it
    // Initialize it with an array containing the strings 'lowercase', 'uppercase', 'numbers', and 'symbols'
    const [selectedChoices, setSelectedChoices] = useState(['lowercase', 'uppercase', 'numbers', 'symbols']);

    // Declare an effect that runs after every render
    useEffect(() => {
        generatePassword();// Call the 'generatePassword' function
    },[passwordLength]);

    // Define a function called 'handleCheckbox' that takes a 'type' parameter
    const handleCheckbox = (type) => {
        // Make a copy of the 'selectedChoices' array and assign it to 'tempChoices'
        let tempChoices = selectedChoices;
        // Check if 'tempChoices' includes the 'type' parameter
        if(tempChoices.includes(type)){
            // If it does, find the index of 'type' in 'tempChoices' and remove it
            const index = tempChoices.indexOf(type);
            tempChoices.splice(index,1);
        }
        else{
            // If it doesn't, add 'type' to 'tempChoices'
            tempChoices.push(type);
        }
        // Log the new 'tempChoices' array to the console
        console.log(tempChoices);
        // Update the 'selectedChoices' state variable with the new 'tempChoices' array
        setSelectedChoices(tempChoices);
    }

    // Define a function called 'generatePassword'
    const generatePassword = () => {
        // Create an empty string called 'characterList'
        let characterList = customerName.toLowerCase();
        //let characterList = '';
        // Check if the 'lowerCase' state variable is true. If it is, add the lowercase letters to 'characterList'
        if (lowerCase) {
            characterList += lowercaseList;
        }
        // Check if the 'upperCase' state variable is true. If it is, add the uppercase letters to 'characterList'
        if (upperCase) {
            characterList += uppercaseList;
        }
        // Check if the 'numbers' state variable is true. If it is, add the numbers to 'characterList'
        if (numbers) {
            characterList += numbersList;
        }
        // Check if the 'symbols' state variable is true. If it is, add the symbols to 'characterList'
        if (symbols) {
            characterList += symbolsList;
        }
        // Create an empty string called 'tempPassword'
        let tempPassword = '';
        // Get the length of the 'characterList' string and assign it to 'characterListLength'
        const characterListLength = characterList.length;
        // Loop 'passwordLength' number of times to generate the password
        for (let i = 0; i < passwordLength; i++) {
            // Generate a random number between 0 and 'characterListLength' and round it to the nearest integer. Assign it to 'characterIndex'
            const characterIndex = Math.round(Math.random() * characterListLength);
            // Get the character at the 'characterIndex' position in 'characterList' and add it to 'tempPassword'
            tempPassword += characterList.charAt(characterIndex);
        }
        //new change
        tempPassword = tempPassword.split('').sort(() => Math.random() - 0.5).join('');

        // Update the 'password' state variable with the new password stored in 'tempPassword'
        setPassword(tempPassword);
    }
    //new change
    const handleCustomerNameChange = (event) => {
        setCustomerName(event.target.value);
      };

    // Define a function called 'copyPassword'
    const copyPassword = async () => {
        // Call the 'readText' method of the 'navigator.clipboard' API and store the result in 'copiedText'
        const copiedText = await navigator.clipboard.readText();
        // Check if 'password' has a length and the value of 'copiedText' is not equal to 'password'
        if (password.length && copiedText !== password) {
            // If the conditions are met, call the 'writeText' method of the 'navigator.clipboard' API and pass in 'password' as the argument
            navigator.clipboard.writeText(password);
            // Show a success toast notification using the 'react-toastify' library
            toast.success('Password copied to clipboard', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
    }

    return (
        <>
            <div className='con'>
                <h2 className='title'>Secure Password Generator</h2>
                <div className="password-wrapper">
                    <div className="password-area">
                        <div className="password">
                            <input type="text" id="passwordInput" value={password} disabled placeholder='Click on the Generate Password' />
                            <img src={copyIcon} alt="copyicon" className='copyIcon' onClick={copyPassword} /><br></br>
                            <label htmlFor="customerName">Customer Name:</label>
                            <input
                                type="text"
                                id="customerName"
                                value={customerName}
                                onChange={handleCustomerNameChange}
                            />
                            <div className="buttons">
                            <button onClick={generatePassword}>Generate Password</button><br></br><br></br><br></br>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="setting"><br></br><br></br><br></br><br></br><br></br>
                    <h3>Customize New Password</h3>
                    <div className="customize">
                        <div className="checkboxes">
                            <div className="left">
                                <div className="checkbox-field">
                                    <input type="checkbox" name="lower" id="lower" checked={lowerCase} disabled={selectedChoices.length === 1 && selectedChoices.includes("lowercase")} onChange={() => { setLowerCase(!lowerCase); handleCheckbox('lowercase');}} />
                                    <label htmlFor="lower">LowerCase(a-z)</label>
                                </div>
                                <div className="checkbox-field">
                                    <input type="checkbox" name="upper" id="upper" checked={upperCase} disabled={selectedChoices.length === 1 && selectedChoices.includes('uppercase')} onChange={() => { setUpperCase(!upperCase); handleCheckbox('uppercase');}} />
                                    <label htmlFor="upper">UpperCase(A-Z)</label>
                                </div>
                            </div>
                            <div className="right">
                                <div className="checkbox-field">
                                    <input type="checkbox" name="numbers" id="numbers" checked={numbers} disabled={selectedChoices.length === 1 && selectedChoices.includes('numbers')} onChange={() => { setNumbers(!numbers); handleCheckbox('numbers');}} />
                                    <label htmlFor="numbers">Numbers(0-9)</label>
                                </div>
                                <div className="checkbox-field">
                                    <input type="checkbox" name="symbols" id="symbols" checked={symbols} disabled={selectedChoices.length === 1 && selectedChoices.includes('symbols')} onChange={() => { setSymbols(!symbols); handleCheckbox('symbols');}} />
                                    <label htmlFor="symbols">Symbols(&-#)</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="password-length">
                    <h3>Password Size(8-64)</h3>
                    <div className="slider">
                        <p className="Value">{passwordLength}</p>
                        <div className="range">
                            <input type="range" min={8} max={64} defaultValue={passwordLength} onChange={(event) => setPasswordLength(event.currentTarget.value)} />
                        </div>
                    </div>
                </div>
                <div className="buttons">
                    <button type='button' onClick={copyPassword}>Copy Password</button>
                    <button type='button' onClick={generatePassword}>Generate Password</button>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default PasswordGenerator;