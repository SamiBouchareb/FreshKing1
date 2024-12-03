import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = 'font-semibold rounded-full transition-all duration-200 shadow-sm hover:shadow-md';
  
  const variants = {
    primary: 'bg-green-600 text-white hover:bg-green-700 shadow-green-200/20',
    secondary: 'bg-orange-500 text-white hover:bg-orange-600 shadow-orange-200/15',
    outline: 'border-2 border-green-600 text-green-600 hover:bg-green-50 shadow-green-100/10'
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}