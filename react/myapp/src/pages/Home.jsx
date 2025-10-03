import React from "react";
import BlogCard from "../components/BlogCard";

const Home = () => {
  return (
    <div className="container my-4">
      
      <BlogCard
        author="Reena Chaturvedi"
        title="Why Most Programmer Burnt Out After the Age of 40"
        desc="I’ve been programming since I was 14. It started as a hobby and eventually became my profession."
        img="/blogspaze_logo.png"
        views="380"
        likes="121"
        comments="12"
      />

      <BlogCard
        author="Virpalsinh Chavda"
        title="Coding in the Debugger: A Unique Way to Shorten Your Feedback Loop"
        desc="I’ve been programming since I was 14. It started as a hobby and eventually became my profession."
        img="/blogspaze_logo.png"
        views="1.8k"
        likes="523"
        comments="56"
      />

      <BlogCard
        author="Henry Calvin"
        title="Coding in the Debugger: A Unique Way to Shorten Your Feedback Loop"
        desc="I’ve been programming since I was 14. It started as a hobby and eventually became my profession."
        img="/blogspaze_logo.png"
        views="1.8k"
        likes="523"
        comments="56"
      />
    </div>
  );
};

export default Home;
