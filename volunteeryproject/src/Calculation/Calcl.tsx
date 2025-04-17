import React, { useState } from 'react';
import { useForm } from '@formspree/react';
import './Calcl.css';

const Calcl = ({ onSubmit }) => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [customerPaid, setCustomerPaid] = useState('');
  const [change, setChange] = useState('');
  const [remainingAmount, setRemainingAmount] = useState(null);

  const handleClick = (value) => {
    setInput((prev) => prev + value);
  };

  const handleClear = () => {
    setInput('');
    setResult('');
    setCustomerPaid('');
    setChange('');
    setRemainingAmount(null);
  };

  const handleDelete = () => {
    setInput((prev) => prev.slice(0, -1));
  };

  const calculate = () => {
    try {
      const evalResult = eval(input); // Be cautious with eval
      setResult(evalResult);
      const cm = parseFloat(customerPaid);

      if (!isNaN(cm)) {
        const diff = cm - evalResult;
        if (diff < 0) {
          setChange('Not enough cash given!');
        } else {
          setChange(`Change to return: ₹${diff}`);
        }
      } else {
        setChange('Enter valid amount customer paid');
      }
    } catch {
      setResult('Error');
      setChange('');
    }
  };

  const handleAddMoney = (amount) => {
    const current = parseFloat(customerPaid) || 0;
    setCustomerPaid((current + amount).toString());
  };

  const handleOk = () => {
    const cm = parseFloat(customerPaid);
    const total = parseFloat(result);

    if (!isNaN(cm) && !isNaN(total)) {
      const remaining = cm - total;
      if (remaining < 0) {
        setRemainingAmount('Customer needs to pay more!');
      } else {
        setRemainingAmount(`Remaining balance to pay: ₹${remaining}`);
      }
    } else {
      setRemainingAmount('Enter a valid amount paid and total');
    }
  };

  // This function is called when the form is submitted
  const handleSubmitForm = (e) => {
    e.preventDefault();

    // You can pass the data back to the parent ContactForm
    if (onSubmit) {
      onSubmit({ input, result, customerPaid, change, remainingAmount });
    }
  };

  return (
    <form className="calc-container" onSubmit={handleSubmitForm}>
      <h2>Basic Calculator</h2>

      <input type="text" value={input} readOnly placeholder="0" />

      <div className="buttons">
        {'123+456-789*0./'.split('').map((char, index) => (
          <button type="button" key={index} onClick={() => handleClick(char)}>
            {char}
          </button>
        ))}
        <button type="button" onClick={handleClear}>C</button>
        <button type="button" onClick={handleDelete}>Del</button>
        <button type="button" onClick={calculate}>=</button>
      </div>

      <div className="result">Total amount to give: {result}</div>

      <div className="customer-input">
        <label htmlFor="customertopaid">Customer Paid: ₹</label>
        <input
          id="customertopaid"
          type="number"
          value={customerPaid}
          onChange={(e) => setCustomerPaid(e.target.value)}
        />
        <button type="button" className="ok-button" onClick={handleOk}>
          OK
        </button>
      </div>

      <div className="money-buttons">
        {[50, 100, 200, 500].map((amt) => (
          <button type="button" key={amt} onClick={() => handleAddMoney(amt)}>
            +₹{amt}
          </button>
        ))}
      </div>

      <div className="remaining">{remainingAmount}</div>
      <div className="change">{change}</div>

      {/* Hidden form fields to pass to Formspree */}
      <input type="hidden" name="input" value={input} />
      <input type="hidden" name="result" value={result} />
      <input type="hidden" name="customerPaid" value={customerPaid} />
      <input type="hidden" name="change" value={change} />
      <input type="hidden" name="remainingAmount" value={remainingAmount || ''} />

      {/* Submit to Formspree */}
      <button type="submit" className="submit-form-button">Submit Info</button>
    </form>
  );
};

const ContactForm = () => {
  const [state, handleSubmit] = useForm('xpwpgzye');

  if (state.succeeded) {
    return <p>Thanks for submitting the transaction!</p>;
  }

  const handleCalcFormSubmit = (formData) => {
    // You could handle the data here or just let it go to Formspree via the form
    console.log('Form submitted with:', formData);
  };

  return (
    <div>
      <Calcl onSubmit={handleSubmit} />
      {/* Hidden real form to submit to Formspree */}
      <form onSubmit={handleSubmit} style={{ display: 'none' }}>
        {/* These inputs will be auto-populated via JS if needed */}
      </form>
    </div>
  );
};

export default ContactForm;
