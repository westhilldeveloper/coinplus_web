"use client";

import { Youtube, Linkedin, Instagram, Facebook } from "lucide-react";
import { useEffect, useState } from "react";

export default function TopBar() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formattedTime = now.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
      setTime(formattedTime);
    };

    updateTime(); // initial call
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-gradient-to-r from-primary/60 to-primary text-white py-2">
      <div className="container mx-auto flex items-center justify-between px-4">

        {/* Left Section: Current Time */}
        <div className="flex items-center gap-3">
          <span className="font-medium">&nbsp;</span>

          {/* TIME DIGITS */}
          <div className="flex gap-1">
            {time.split("").map((char, i) => (
              <span
                key={i}
                className={`font-bold px-2 py-1 rounded-md text-sm
                  ${char === ":" 
                    ? "text-white px-1" 
                    : "bg-white text-green-800"}
                `}
              >
                {char}
              </span>
            ))}
          </div>
        </div>

        {/* Right Section: Social Icons */}
       <div className="flex items-center gap-4 opacity-80 hover:opacity-100 transition">
  <a
    href="https://www.youtube.com/@Coinplusindia"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="YouTube"
  >
    <Youtube className="cursor-pointer hover:text-red-500 transition" size={20} />
  </a>

  <a
    href="https://www.linkedin.com/uas/login?session_redirect=https%3A%2F%2Fwww.linkedin.com%2Fcompany%2F105320084%2Fadmin%2Fdashboard%2F"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="LinkedIn"
  >
    <Linkedin className="cursor-pointer hover:text-blue-400 transition" size={20} />
  </a>

  <a
    href="https://www.instagram.com/coinplus.co.in/"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Instagram"
  >
    <Instagram className="cursor-pointer hover:text-pink-400 transition" size={20} />
  </a>

  <a
    href="https://www.facebook.com/profile.php?id=61570839085680"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Facebook"
  >
    <Facebook className="cursor-pointer hover:text-blue-500 transition" size={20} />
  </a>
</div>


      </div>
    </div>
  );
}
