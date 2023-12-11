import { FC } from "react";
import { LabLayout } from "../../LabLayout";
import { DescriptionLayout } from "../../DescriptionLayout";
import { LabContent2 } from "./LabContent2";

import Lab2Desc from './images/lab2-desc.png'

export const PhysicLab2: FC = () => {
  return (
    <LabLayout
      Description={
        <DescriptionLayout
          goal={"Убедиться на опыте, что сила тока в различных последовательно соединенных участках цепи одинакова."}
          staff={"Источник питания, низковольтная лампа на подставке, ключ, амперметр, соединительные провода."}
          steps={[
            "Соберите схему (источник > лампа > амперметр > ключ) и запишите соответствующие показания амперметра.",
            "Затем включите амперметр в цепь, изменив его позицию (до лампы/после источника тока). Запишите соответствующие показания амперметра.",
            "Включите амперметр в цепь, опять изменив его позицию (после лампы/до источника тока). Запишите соответствующие показания амперметра.",
          ]}
          bottom={<img src={Lab2Desc} style={{ width: '100%', paddingTop: 20 }} alt="" />}
        />
      }
      Lab={<LabContent2 />}
    />
  );
};
