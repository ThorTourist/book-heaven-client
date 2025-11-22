// src/Pages/AboutUs.jsx
import React from "react";

const AboutUs = () => {
  return (
    <div className="p-6 md:p-12 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-center">About Us</h1>
      <p className="mb-4 text-lg">
        Welcome to <strong>Book Haven</strong>, your ultimate digital library
        where book lovers can explore, add, and manage books easily. Our mission
        is to create a community for readers, writers, and enthusiasts to share
        their love for literature.
      </p>
      <p className="mb-4 text-lg">We provide a platform where users can:</p>
      <ul className="list-disc ml-6 mb-4 text-lg">
        <li>Discover a wide variety of books across genres.</li>
        <li>Add and manage their personal book collection.</li>
        <li>View details and reviews of books added by others.</li>
        <li>Connect with other book enthusiasts in the community.</li>
      </ul>
      <p className="mb-4 text-lg">
        Our goal is to make reading more accessible and fun. Whether you're
        looking for your next favorite novel or want to share your own
        recommendations,
        <strong> Book Haven</strong> is the perfect place to start.
      </p>
      <p className="text-lg font-semibold">Happy Reading! 📚</p>
    </div>
  );
};

export default AboutUs;
