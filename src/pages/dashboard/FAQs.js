// FAQs.js
import React, { useState } from 'react';
import { faqsData } from './faqsData';
import FAQ from './FAQ';
import OverlayNavbar from '../OverlayNavbar';
import SessionCheck from '../session';

const FAQs = () => {
  const [faqs, setFaqs] = useState(faqsData);

  return (
    <main>
      <section>
        <SessionCheck />
        <OverlayNavbar />
        <h1 className='text-center text-[#2FB261] mt-10 text-4xl font-bold ml-10'>FAQS</h1>
        {faqs.map((faq) => (
          <FAQ key={faq.id} {...faq} />
        ))}
      </section>
    </main>
  );
};

export default FAQs;