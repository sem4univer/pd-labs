import { FC } from "react";

import Title from "antd/es/typography/Title";
import { Container } from "../../common/Container/Container";

interface Props {
  goal: string;
  staff: string;
  steps: string[];
}

export const DescriptionLayout: FC<Props> = ({ goal, staff, steps }) => {
  return (
    <Container>
      <div>
        <Title level={4}>Цель работы: </Title>
        {goal}
      </div>
      <div>
        <Title level={4}>Приборы и материалы: </Title>
        {staff}
      </div>
      <div>
        <Title level={4}>Ход работы</Title>
        <div>
          {steps.map((step, index) => (
            <div key={index} style={{marginTop: '5px'}}>
              <b>{index + 1}</b>. {step}
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};
