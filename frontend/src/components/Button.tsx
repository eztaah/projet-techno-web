'use client';
import { FC, ReactNode } from 'react';

interface ButtonProps {
  onClick: () => void;
  className?: string;
  children: ReactNode;
}

const Button: FC<ButtonProps> = ({ onClick, className, children }) => (
  <button onClick={onClick} className={`px-4 py-2 rounded ${className}`}>
    {children}
  </button>
);

export default Button;
