import AppLayout from "@/components/app/AppLayout";
import ChildrenInterface from "@/interfaces/children-interface";
import { FC } from "react";

const AppRouterLayout: FC<ChildrenInterface> = ({ children }) => {
  return <AppLayout>{children}</AppLayout>;
};

export default AppRouterLayout;
