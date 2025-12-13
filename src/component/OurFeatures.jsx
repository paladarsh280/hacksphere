import React, { useState } from "react";

const ourfeatures = [
  {
    question: "Create Digital Time Capsules",
    answer:
      "Craft deeply personal memory capsules by uploading text, cherished images, heartwarming audio, and nostalgic videos.",
  },
  {
    question: "Unlock Conditions",
    answer: "Set precise, meaningful conditions for your capsule to unlock, such as a specific date, or life milestones like a graduation or a marriage.",
  },
  {
    question: "Recipient Assignment",
    answer: "Designate intended recipients who will automatically receive the capsules the moment they unlock, ensuring your memories reach the right people.",
  },
  {
    question: "Email Notifications",
    answer: "We automatically send timely email notifications to you and your recipients when a capsule is moments away from becoming available.",
  },
  {
    question: "Themed Memory Collections",
    answer: "Organize and group your capsules under inspiring themes like 'Childhood,' 'Family History,' or 'College Years' for a structured archive.",
  },
  {
    question: "Collaboration Mode",
    answer: "Enable multiple family members to collaboratively contribute their unique memories and perspectives to shared capsules.",
  },
  {
    question: "Countdown Timer",
    answer: "Build anticipation by displaying a real-time countdown showing the exact remaining time before a capsule unlocks.",
  },
  {
    question: "AI Memory Assistant",
    answer: "Leverage the power of Gemini to suggest perfect captions, create insightful summaries, or accurately transcribe your old audio files.",
  },
  {
    question: "Scheduled Email Delivery",
    answer: "The complete contents of the capsule are automatically and securely delivered to the designated recipients the instant it unlocks.",
  },
  {
    question: "Post-Unlock Interaction",
    answer: "We encourage connection! Family members can react, comment, and add personal reflections to newly opened capsules.",
  },
  {
    question: "Privacy Controls",
    answer: "You maintain total control: set each capsule as public, completely private, or exclusively visible to only selected family members.",
  }
];

const OurFeatures = () => {
  const [openIndex, setOpenIndex] = useState(null);

const toggleFAQ = (index) => {
  setOpenIndex((prevIndex) =>
    prevIndex === index ? null : index
  );
};

  return (
    <div className="w-full max-w-7xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-extrabold text-white mb-6" 
      >OUR FEATURES</h2>

      <div className="space-y-4">
        {ourfeatures.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={index}
              className={`bg-white rounded-xl shadow-sm border transition-all duration-300 
              ${isOpen ? "p-6" : "p-4"} cursor-pointer relative`}
              onClick={() => toggleFAQ(index)}
            >
              {/* Right Indicator Circle */}
              <div
                className={`absolute top-4 right-4 w-5 h-5 rounded-full transition-all 
                ${isOpen ? "bg-[#7C4DFF]" : "bg-purple-100"}`}
              ></div>

              {/* Question */}
              <p className="text-lg font-semibold">{faq.question}</p>

              {/* Answer (Collapsible) */}
              <div
                className={`overflow-hidden transition-all duration-300 
                ${isOpen ? "max-h-[300px] mt-3 opacity-100" : "max-h-0 opacity-0"}`}
              >
                <p className="text-bold text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OurFeatures;