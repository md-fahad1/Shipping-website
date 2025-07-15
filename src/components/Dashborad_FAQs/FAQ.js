import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';

const FAQ = ({ id, title, desc }) => {
  const [toggle, setToggle] = useState(false);

  return (
    <Card className="mb-1 w-full p-1 bg-gray-700">
      <div >
        <Button
        variant='gray-widget'
          onClick={() => setToggle(!toggle)}
          aria-controls={`faq-${id}`}
          aria-expanded={toggle}
         
        >
          <h4 className='text-sm text-gray-300 '>{title}</h4>
        </Button>
      </div>
      {toggle && (
        <Card.Body>
          <p className='text-sm text-gray-200'>{desc}</p>
        </Card.Body>
      )}
    </Card>
  );
};

export default FAQ;
