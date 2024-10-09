// app/page.tsx
"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";

const flowerPatternBg = "bg-[url('/path-to-flower-pattern.png')]";
const mainTitle = "Welcome to My Portfolio";
const introductionText =
  "This is a cute and aesthetic portfolio website created using Next.js 14, shadcn/ui, Tailwind CSS, and framer-motion.";
const aboutMeText =
  "I'm a web developer with a passion for building beautiful and functional websites.";

export default function PortfolioPage() {
  const [contactInfo, setContactInfo] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContactInfo({ ...contactInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    alert("Your message has been submitted!");
  };

  return (
    <div className={`min-h-screen p-10 ${flowerPatternBg} bg-cover bg-center`}>
      {/* Header Section */}
      <header className="text-center mb-10">
        <h1 className="text-5xl font-bold text-pink-500 animate-bounce">
          {mainTitle}
        </h1>
        <p className="text-xl mt-4 text-gray-700">{introductionText}</p>
      </header>

      {/* About Me Section */}
      <section className="mb-16">
        <Card className="max-w-3xl mx-auto shadow-lg">
          <CardHeader>
            <h2 className="text-3xl font-semibold text-pink-600">About Me</h2>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-gray-600">{aboutMeText}</p>
          </CardContent>
        </Card>
      </section>

      {/* Portfolio Section */}
      <section className="mb-16">
        <Card className="max-w-3xl mx-auto shadow-lg">
          <CardHeader>
            <h2 className="text-3xl font-semibold text-pink-600">
              My Work
            </h2>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg"
            >
              <h3 className="text-xl font-semibold mb-2">Project 1</h3>
              <p className="text-gray-600">
                A description of the first project goes here.
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg"
            >
              <h3 className="text-xl font-semibold mb-2">Project 2</h3>
              <p className="text-gray-600">
                A description of the second project goes here.
              </p>
            </motion.div>
          </CardContent>
        </Card>
      </section>

      {/* Contact Form */}
      <section>
        <Card className="max-w-3xl mx-auto shadow-lg">
          <CardHeader>
            <h2 className="text-3xl font-semibold text-pink-600">Contact Me</h2>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-lg text-gray-600">
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={contactInfo.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-lg text-gray-600">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={contactInfo.email}
                  onChange={handleInputChange}
                  className="mt-1 block w-full"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-lg text-gray-600">
                  Message
                </label>
                <Input
                  id="message"
                  name="message"
                  type="text"
                  value={contactInfo.message}
                  onChange={handleInputChange}
                  className="mt-1 block w-full"
                />
              </div>
              <Button onClick={handleSubmit} className="bg-pink-500 w-full">
                Submit
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
