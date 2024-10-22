import React from 'react';
import '../assets/styles/PrivacyPage.css';

const PrivacyPage= () => {
  return (
    <div className="privacy-policy-container">
      <h1>Privacy Policy</h1>
      <p>Effective date: [Insert Date]</p>
      <p>Your privacy is important to us. This Privacy Policy outlines how we collect, use, disclose, and protect your information when you use our website.</p>

      <h2>Information We Collect</h2>
      <ul>
        <li><strong>Personal Information:</strong> We may collect personal information that you provide directly to us, such as your name, email address, and contact details.</li>
        <li><strong>Usage Data:</strong> We may collect information about how you access and use our website, including your IP address, browser type, and operating system.</li>
      </ul>

      <h2>How We Use Your Information</h2>
      <p>We use the information we collect for various purposes, including:</p>
      <ul>
        <li>To provide and maintain our services.</li>
        <li>To notify you about changes to our services.</li>
        <li>To allow you to participate in interactive features of our website when you choose to do so.</li>
        <li>To provide customer support.</li>
      </ul>

      <h2>Disclosure of Your Information</h2>
      <p>We may disclose your personal information in the following circumstances:</p>
      <ul>
        <li>To comply with a legal obligation.</li>
        <li>To protect and defend our rights and property.</li>
        <li>To prevent or investigate possible wrongdoing in connection with the service.</li>
      </ul>

      <h2>Security of Your Information</h2>
      <p>We take the security of your information seriously and implement reasonable measures to protect it. However, please remember that no method of transmission over the internet or method of electronic storage is 100% secure.</p>

      <h2>Changes to This Privacy Policy</h2>
      <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>

      <h2>Contact Us</h2>
      <p>If you have any questions about this Privacy Policy, please contact us at support@example.com.</p>
    </div>
  );
};

export default PrivacyPage;