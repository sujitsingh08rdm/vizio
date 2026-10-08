import ChildrenInterface from "@/interfaces/children-interface";
import { FC } from "react";

const MainLayout: FC<ChildrenInterface> = ({ children }) => {
  return <div>{children}</div>;
};

export default MainLayout;
