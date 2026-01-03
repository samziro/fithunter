'use client';

import Title from '@/components/Title';
import React from 'react';

interface Faq {
  question: string;
  answer: string;
}

const faqs: Faq[] = [
  {
    question: 'What services does Fit Hunter offer?',
    answer:
      'I provide personalized one-on-one training, group classes, beach workouts, and online coaching—all tailored to help you reach your fitness goals with effective, evidence-based plans.',
  },
  {
    question: 'How much do the programs cost?',
    answer:
      'Prices vary by type: One-on-one sessions start at KSh 2,000, group classes at KSh 1,000 per person, and online packages from KSh 5,000 monthly. Contact me for custom quotes.',
  },
  {
    question: 'Where are the sessions held?',
    answer:
      'Based in Watamu, Kenya, with no fixed location—I come to you! Choose your home, beach, park, or any spot that suits you for motivating coastal workouts.',
  },
  {
    question: 'How can I book a session?',
    answer:
      'Book easily through the website for a free consultation, select a program, or reach out via WhatsApp or email for personalized help.',
  },
  {
    question: 'What makes Fit Hunter unique?',
    answer:
      'With 5+ years as a certified trainer, I bring a passion for fitness and a growth mindset, creating unique, adaptive workouts that build real confidence and results.',
  },
];

const FaqSection: React.FC = () => (
  <section className="py-12 p-6 bg-lightBg">
    <Title heading="Frequently Asked Questions" />
    <div className="space-y-6 max-w-4xl mx-auto mt-8">
      {faqs.map((faq, index) => (
        <div key={index} className="pb-4 border-b border-[#4a4a4a]">
          <h3 className="font-semibold text-textSecondary mb-2 text-lg font-poppins">
            {index + 1}. {faq.question}
          </h3>
          <p className="text-textMain font-inter text-base leading-relaxed">{faq.answer}</p>
        </div>
      ))}
    </div>
  </section>
);

export default FaqSection;