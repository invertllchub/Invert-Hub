"use client";

import React from "react";
import { IoLogoYoutube, IoLogoLinkedin, IoMailOutline } from "react-icons/io5";
import { FaInstagramSquare, FaMapPin, FaPaperPlane } from "react-icons/fa";
import { FiMapPin, FiPhone } from "react-icons/fi";
import ContactForm from "@/components/main/ContactPage/ContactForm";
import Link from "next/link";

const ContactPage = () => {
  const socialMedia = [
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
  ]

  const reachUS = [
    {
      icon : <IoMailOutline className="text-black text-xl" />,
      label : "General Inquiries",
      link : {
        href: "mailto:hi@inverthub.com",
        label: "hi@inverthub.com"
      }
    },
    {
      icon : <IoMailOutline className="text-black text-xl" />,
      label : "Partnerships & Business",
      link : {
        href: "mailto:contact@inverthub.com",
        label: "contact@inverthub.com"
      }
    },
    {
      icon : <FiPhone className="text-black text-xl" />,
      label : "Phone",
      link : {
        href: "tel:+11234567890",
        label: "xxxxxxxxxxxx"
      }
    },
    {
      icon : <FiMapPin className="text-black text-xl" />,
      label : "Street Name",
      link : {
        href: "",
        label: "Countery"
      }
    }
  ]
  return (
    <div className="w-full min-h-screen bg-white text-black py-30 overflow-hidden">
      <div className="w-full px-4 md:px-16">
        {/* Header Section */}
        <header className="text-left mb-16">
          <div className="relative inline-block mb-6">
            <h1
              className="text-2xl md:text-4xl  font-black text-gray-900 mb-6 tracking-tight"
              style={{
                fontSize: "clamp(2rem, 0.3723rem + 7.234vw, 6.25rem)",
                lineHeight: 1.1,
              }}
            >
              Let's Build Something Unexpected
            </h1>
            <div className="absolute -bottom-3 left-0 w-1/3 h-1 bg-black z-0"></div>
          </div>

          <p
            className="text-lg md:text-2xl font-medium text-gray-600"
          >
            Whether you're exploring a collaboration, applying for a role, or
            just curious about our work, we're always open to conversations that
            lead to new ideas.
          </p>
        </header>

        {/*  Contact Sections - Two Columns */}
        <div className="flex flex-col lg:flex-row gap-12 items-stretch">
          {/* Contact Info & Social Section */}
          <div className="w-full md:w-2/5">
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200 h-full">
              <h2 className="text-2xl font-bold mb-8 pb-2 border-b border-gray-300 inline-block">
                Reach Us Directly
              </h2>

              <div className="space-y-6">
                {reachUS.map((item, i) => {
                  return (
                    <div key={i} className="flex items-start">
                      <div className="bg-gray-200 p-3 rounded-full mr-4">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-600">
                          {item.label}
                        </h3>
                        <a
                          href={item.link.href}
                          className="text-lg font-medium text-black hover:underline"
                        >
                          {item.link.label}
                        </a>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="pt-6">
                <h3 className="font-medium text-gray-600 mb-4">
                  Connect With Us
                </h3>
                <div className="flex gap-4">
                  {socialMedia.map((social, i) => (
                    <Link
                      key={i}
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
                    </Link>
                  ))}
                </div>
              </div>

            </div>
          </div>


          {/* Enhanced Contact Form Section */}
          <div className="w-full md:w-3/5">
            <div className="bg-white rounded-2xl p-8 border border-gray-200 h-full">
              <div className="flex items-center mb-8">
                <div className="bg-gray-200 p-3 rounded-full mr-4">
                  <FaPaperPlane className="text-black text-xl" />
                </div>
                <h2 className="text-3xl font-bold">
                  Let's Start the Conversation
                </h2>
              </div>
              <div>
                <ContactForm />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ContactPage;
