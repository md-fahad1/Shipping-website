import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';

const FAQ = ({ id, title, desc }) => {
  const [toggle, setToggle] = useState(false);

  return (
    <Card className="mb-3 container px-12">
      <Card.Header>
        <Button
          variant="gray"
          onClick={() => setToggle(!toggle)}
          aria-controls={`faq-${id}`}
          aria-expanded={toggle}
        >
          <h4 className=' md:text-xl xl:text-xl lg:text-xl 2xl:text-xl text-[14px] text-gray-600 '>{title}</h4>
        </Button>
      </Card.Header>
      {toggle && (
        <Card.Body>
          <p className='ml-4 md:text-xl xl:text-xl lg:text-xl 2xl:text-xl text-[5px]'>{desc}</p>
        </Card.Body>
      )}
    </Card>
  );
};

export default FAQ;
