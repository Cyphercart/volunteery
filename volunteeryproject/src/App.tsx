import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
import './App.css';

// ContactForm component
function ContactForm() {
  const [state, handleSubmit] = useForm("meoadqwe");

  const currentDate = new Date().toLocaleDateString();

  if (state.succeeded) {
    return <p className="success-message">Patient's information and serial has succsessfully taken!</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      {/* Date Field */}
      <label htmlFor="date">Date</label>
      <input id="date" name="date" type="text" value={currentDate} readOnly />

      {/* Name */}
      <label htmlFor="name">Name</label>
      <input id="name" name="name" type="text" required />

      {/* Age */}
      <label htmlFor="age">Age</label>
      <input id="age" name="age" type="number" required />

      {/* Mobile Number */}
      <label htmlFor="mobile">Mobile Number</label>
      <input
        id="mobile"
        name="mobile"
        type="tel"
        pattern="[0-9]{11}"
        placeholder="Enter 10-digit number"
        required
      />

      {/* Gender */}
      <label htmlFor="gender">Gender</label>
      <select id="gender" name="gender" required>
        <option value="">--Select Gender--</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>

      {/* Problem Title */}
      <label htmlFor="problemTitle">Problem Title</label>
      <input id="problemTitle" name="problemTitle" type="text" required />

      {/* Problem Description */}
      <label htmlFor="message">Patient Problem in Detail</label>
      <textarea id="message" name="message" required />
      <ValidationError prefix="Message" field="message" errors={state.errors} />

      {/* Submit */}
      <button type="submit" disabled={state.submitting}>
        Submit
      </button>
    </form>
  );
}

// Main App component
function App() {
  return (
    <>
      <div className="heading-section">
        <h1><q title='AUTOMATIC PATIENT ENTRY SYSTEM'>A.P.E.s</q></h1>
        <h2>Automate your patient entry process with ease</h2>
        <p>v1-t</p>
      </div>

      <ContactForm />
    </>
  );
}

export default App;
