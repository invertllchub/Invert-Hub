"use client";

import React, { useState } from "react";
import { IoLogoYoutube, IoLogoLinkedin, IoMailOutline } from "react-icons/io5";
import { FaInstagramSquare, FaPaperPlane } from "react-icons/fa";
import { FiMapPin, FiPhone } from "react-icons/fi";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Thank you for your message! We'll get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="container mx-auto px-4 py-12 max-w-[1300px]">
        {/* Header Section */}
        <header className="text-left mb-16">
          <div className="relative inline-block mb-6">
            <h1
              className="text-4xl md:text-7xl font-black mb-6 relative z-10"
              style={{
                fontSize: "clamp(2rem, 0.3723rem + 7.234vw, 6.25rem)",
              }}
            >
              Let's Build Something Unexpected
            </h1>
            <div className="absolute -bottom-3 left-0 w-1/3 h-1 bg-black z-0"></div>
          </div>

          <p
            className="font-medium max-w-4xl text-gray-600"
            style={{ fontSize: "clamp(1rem, 0.617rem + 1.7021vw, 1.8rem)" }}
          >
            Whether you're exploring a collaboration, applying for a role, or
            just curious about our work, we're always open to conversations that
            lead to new ideas.
          </p>
        </header>

        {/*  Contact Sections - Two Columns */}
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Contact Info & Social Section */}
          <div className="lg:w-2/5">
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
              <h2 className="text-2xl font-bold mb-8 pb-2 border-b border-gray-300 inline-block">
                Reach Us Directly
              </h2>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-gray-200 p-3 rounded-full mr-4">
                    <IoMailOutline className="text-black text-xl" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-600">
                      General Inquiries
                    </h3>
                    <a
                      href="mailto:hi@inverthub.com"
                      className="text-lg font-medium text-black hover:underline"
                    >
                      hi@inverthub.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-gray-200 p-3 rounded-full mr-4">
                    <IoMailOutline className="text-black text-xl" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-600">
                      Partnerships & Business
                    </h3>
                    <a
                      href="mailto:contact@inverthub.com"
                      className="text-lg font-medium text-black hover:underline"
                    >
                      contact@inverthub.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-gray-200 p-3 rounded-full mr-4">
                    <FiPhone className="text-black text-xl" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-600">Phone</h3>
                    <a
                      href="tel:+11234567890"
                      className="text-lg font-medium text-black hover:underline"
                    >
                      xxxxxxxxxxxx
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-gray-200 p-3 rounded-full mr-4">
                    <FiMapPin className="text-black text-xl" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-600">Office</h3>
                    <p className="text-lg font-medium">
                      Street Name
                      <br />
                      Country
                    </p>
                  </div>
                </div>

                <div className="pt-6">
                  <h3 className="font-medium text-gray-600 mb-4">
                    Connect With Us
                  </h3>
                  <div className="flex gap-4">
                    {[
                      {
                        icon: <IoLogoYoutube size={26} />,
                        href: "#",
                        label: "YouTube",
                      },
                      {
                        icon: <FaInstagramSquare size={26} />,
                        href: "#",
                        label: "Instagram",
                      },
                      {
                        icon: <IoLogoLinkedin size={26} />,
                        href: "#",
                        label: "LinkedIn",
                      },
                    ].map((social, idx) => (
                      <a
                        key={idx}
                        href={social.href}
                        className="flex flex-col items-center group"
                        aria-label={social.label}
                      >
                        <div className="bg-gray-200 p-3 rounded-full group-hover:bg-gray-300 transition-colors duration-300">
                          {social.icon}
                        </div>
                        <span className="mt-2 text-sm text-gray-600 group-hover:text-black transition-colors">
                          {social.label}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Contact Form Section */}
          <div className="lg:w-3/5">
            <div className="bg-white rounded-2xl p-8 border border-gray-200">
              <div className="flex items-center mb-8">
                <div className="bg-gray-200 p-3 rounded-full mr-4">
                  <FaPaperPlane className="text-black text-xl" />
                </div>
                <h2 className="text-3xl font-bold">
                  Let's Start the Conversation
                </h2>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-2 font-medium text-gray-700"
                    >
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-black focus:border-black transition-all"
                      required
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 font-medium text-gray-700"
                    >
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-black focus:border-black transition-all"
                      required
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block mb-2 font-medium text-gray-700"
                  >
                    What are you reaching out about?
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-1 focus:ring-black focus:border-black transition-all"
                  >
                    <option value="">Select an option</option>
                    <option value="collaboration">Collaboration</option>
                    <option value="career">Career Opportunity</option>
                    <option value="partnership">Partnership</option>
                    <option value="inquiry">General Inquiry</option>
                    <option value="feedback">Feedback</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block mb-2 font-medium text-gray-700"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-black focus:border-black transition-all"
                    required
                    placeholder="Tell us about your project or inquiry..."
                  ></textarea>
                </div>

                <div className="flex items-center">
                  <button
                    type="submit"
                    className="flex items-center justify-center bg-black text-white py-3 px-8 rounded-lg hover:bg-gray-800 transition-colors duration-300 font-medium cursor-pointer"
                  >
                    <FaPaperPlane className="mr-2" />
                    Send Message
                  </button>
                  <p className="ml-4 text-gray-600 text-sm">
                    * Required fields
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
