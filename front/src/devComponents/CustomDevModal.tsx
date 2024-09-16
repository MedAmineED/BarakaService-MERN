import React, { useState } from 'react';

const CustomDevModal: React.FC = ({children}) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className='relativDiv'>
      {isOpen && <div className='devModal'>
      <h1>Custom Dev Modal</h1>
      <p>This is a custom development modal.</p>
      <button onClick={() => setIsOpen(false)}>Close</button>
    </div>}
    {children}
    </div>
  );
};

export default CustomDevModal;
