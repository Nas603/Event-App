import React from 'react';
import '../assets/styles/Contact.css';

const Contact = () => {
  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <p>If you have any questions or need assistance, feel free to reach out to us:</p>
      
      <h2>Our Information</h2>
      <ul className="contact-info">
        <li><strong>Email:</strong> support@example.com</li>
        <li><strong>Phone:</strong> (123) 456-7890</li>
        <li><strong>Address:</strong> 123 Event Street, Event City, EC 12345</li>
      </ul>

      <p>We look forward to hearing from you!</p>
    </div>
  );
};

export default Contact;