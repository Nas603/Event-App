import React from 'react';
import '../assets/styles/TermsPage.css';

const TermsPage = () => {
  return (
    <div className="terms-of-service-container">
      <h1>Terms of Service</h1>
      <p>Effective date: [Insert Date]</p>
      <p>Welcome to our website! These Terms of Service govern your access to and use of our services.</p>

      <h2>Acceptance of Terms</h2>
      <p>By using our services, you agree to comply with and be bound by these Terms of Service.</p>

      <h2>Modifications to the Terms</h2>
      <p>We reserve the right to modify these Terms of Service at any time. Your continued use of the service after any changes constitutes acceptance of those changes.</p>

      <h2>User Responsibilities</h2>
      <p>As a user, you agree to:</p>
      <ul>
        <li>Provide accurate and complete information.</li>
        <li>Use the services in compliance with all applicable laws.</li>
        <li>Respect the rights of other users.</li>
      </ul>

      <h2>Termination</h2>
      <p>We reserve the right to terminate or suspend your access to our services if you violate these Terms of Service.</p>

      <h2>Disclaimer of Warranties</h2>
      <p>Our services are provided on an "as is" and "as available" basis. We do not guarantee the availability, reliability, or accuracy of our services.</p>

      <h2>Limitation of Liability</h2>
      <p>To the fullest extent permitted by law, we shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our services.</p>

      <h2>Governing Law</h2>
      <p>These Terms of Service shall be governed by and construed in accordance with the laws of [Insert Jurisdiction].</p>

      <h2>Contact Us</h2>
      <p>If you have any questions about these Terms of Service, please contact us at support@example.com.</p>
    </div>
  );
};

export default TermsPage;