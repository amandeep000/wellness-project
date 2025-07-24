import React, { Children, ReactNode } from "react";
import { Link } from "react-router-dom";
type LinkButtonProps = {
  className?: string;
  to: string;
  children: ReactNode;
};

const LinkButton = ({ children, to, className = "" }: LinkButtonProps) => {
  return (
    <Link to={to} className={`rounded-lg uppercase ${className}`}>
      {children}
    </Link>
  );
};

export default LinkButton;
