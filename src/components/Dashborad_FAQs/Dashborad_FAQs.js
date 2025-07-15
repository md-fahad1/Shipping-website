// FAQs.js
import React, { useState } from 'react';
import { faqsData } from './faqsData';
import FAQ from './FAQ';

const Dashborad_FAQs = () => {
  const [faqs, setFaqs] = useState(faqsData);

  return (
    <main>
      <section>
        <h1 className='text-center text-[#FFFFFF] mt-1 mb-2 text-sm '>FAQS</h1>
        {faqs.map((faq) => (
          <FAQ key={faq.id} {...faq} />
        ))}
      </section>
    </main>
  );
};

export default Dashborad_FAQs;