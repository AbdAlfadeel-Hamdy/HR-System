import { ReactNode } from "react";

interface TableButtonProps {
  children: ReactNode;
}

const TableButton: React.FC<TableButtonProps> = ({ children }) => {
  return <button>{children}</button>;
};

export default TableButton;
