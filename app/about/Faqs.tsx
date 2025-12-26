'use client'

import Title from '@/components/Title'
import React from 'react'

interface Faq {
  question: string
  answer: string
}

const faqs: Faq[] = [
  {
    question: 'What services does Fit Hunter offer?',
    answer:
      'Fit Hunter provides personal training, defined abs programs, custom workout plans, and online coaching, all designed to help you achieve your fitness goals through tailored guidance.',
  },
  {
    question: "How much do Fit Hunter's programs cost?",
    answer:
      'All programs, including personal training and online coaching, are priced at KES 2000, making professional fitness accessible for locals and visitors in Watamu.',
  },
  {
    question: 'Where is Fit Hunter located?',
    answer:
      'Fit Hunter is based in Watamu, Kenya, with sessions often incorporating the coastal environment for unique beach workouts.',
  },
  {
    question: 'How can I book a session with Fit Hunter?',
    answer:
      'You can book a free consultation or purchase a program directly through the website, or contact via email for personalized support.',
  },
  {
    question: 'What makes Fit Hunter unique?',
    answer:
      'As a passionate bodybuilder and dedicated trainer, Fit Hunter emphasizes transformative, beyond-standard training with a focus on building muscle, endurance, and overall wellness in a coastal setting.',
  },
]

const FaqSection: React.FC = () => (
  <section className="  my-12 p-6 bg-[#292929]">
    <Title heading={'Frequently Asked Questions'}/>
   
    <div className="space-y-6 max-w-4xl mx-auto">
      {faqs.map((faq, index) => (
        <div key={index}>
          <h3 className="font-semibold text-white mb-2">
            {index + 1}. {faq.question}
          </h3>
          <p className='text-slate-100'>{faq.answer}</p>
          <hr/>
        </div>
      ))}
    </div>
  </section>
)

export default FaqSection