
import React from 'react';

interface DianaLogoProps {
  className?: string;
  variant?: 'default' | 'white';
  withSmile?: boolean;
}

const DianaLogo = ({ className = "", variant = 'default', withSmile = true }: DianaLogoProps) => {
  // Usar a versão do logo apropriada dependendo da variante
  const logoPath = variant === 'white' 
    ? "/lovable-uploads/231970b0-2bb9-411f-8fd0-fc836eadac05.png" 
    : "/lovable-uploads/8608bfdc-de99-4292-8685-c85a58eeeb42.png";
  
  return (
    <div className={`inline-flex flex-col items-center ${className}`}>
      <img 
        src={logoPath} 
        alt="Diana Logo" 
        className={`h-12 ${className}`}
      />
    </div>
  );
};

export default DianaLogo;
