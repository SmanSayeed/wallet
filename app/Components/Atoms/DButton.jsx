import React from 'react';

const DButton = ({ children, onClick, className, variant, size }) => {
  // Define variant classes based on the variant prop
  const variantClasses = variant ? `btn-${variant}` : '';
  
  // Define size classes based on the size prop
  const sizeClasses = size ? `btn-${size}` : '';

  // Combine all classes
  const combinedClasses = `btn ${variantClasses} ${sizeClasses} ${className}`;

  return (
    <button type="button" className={combinedClasses} onClick={onClick}>
      {children}
    </button>
  );
};

export default DButton;

// Usage 
{/* 
  <DButton onClick={handleClick} variant="success" size="sm">Small Success Button</DButton>
<DButton onClick={handleClick} variant="danger">Default Size Danger Button</DButton> 
*/}
