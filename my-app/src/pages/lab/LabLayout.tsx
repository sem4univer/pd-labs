import { Tabs, TabsProps } from "antd";
import { FC, ReactNode, useMemo } from "react";

interface Props {
  Description: ReactNode;
  Lab: ReactNode;
}

enum LabView {
  DESCRIPTION = "discription",
  LAB = "lab",
}

export const LabLayout: FC<Props> = ({ Description, Lab }) => {
  const items: TabsProps["items"] = useMemo(
    () => [
      {
        key: LabView.DESCRIPTION,
        label: "Описание",
        children: Description,
      },
      {
        key: LabView.LAB,
        label: "Работа",
        children: Lab,
      },
    ],
    [Description, Lab]
  );

  return (
    <div>
      <Tabs defaultActiveKey="1" items={items} centered />
    </div>
  );
};
