// components/ContactForm.js
"use client";
import { useState } from 'react';

const ContactForm = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', form);
      sendMessageToWhatsApp();
      resetForm();
    } else {
      console.log('Form validation failed.');
    }
  };

  const validateForm = () => {
    return form.name && form.email && form.message;
  };

  const resetForm = () => {
    setForm({
      name: '',
      email: '',
      message: ''
    });
  };

  const sendMessageToWhatsApp = () => {
    const phoneNumber = process.env.NEXT_PUBLIC_PHONE_NUMBER; 
    const message = encodeURIComponent(`Name: ${form.name}%0AEmail: ${form.email}%0AMessage: ${form.message}`);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappURL, '_blank');
  };

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 max-w-screen-lg mx-auto">
      <h2 className="mb-6 text-2xl font-bold text-white">Contact Us</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="name" className="text-sm font-medium text-white mb-2">Name</label>
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            type="text"
            id="name"
            placeholder="Your Name"
            className="bg-gruvbox-dark border border-gray-600 rounded-lg p-2 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" className="text-sm font-medium text-white mb-2">Email</label>
          <input
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            type="email"
            id="email"
            placeholder="Your Email"
            className="bg-gruvbox-dark border border-gray-600 rounded-lg p-2 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="message" className="text-sm font-medium text-white mb-2">Message</label>
          <textarea
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            id="message"
            placeholder="Your Message"
            className="bg-gruvbox-dark border border-gray-600 rounded-lg p-2 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
            rows="5"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-gray-700 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactForm;