import { FC, ReactNode } from "react";

import Title from "antd/es/typography/Title";
import { Container } from "../../common/Container/Container";
import { Button } from "antd";
import { Link } from "react-router-dom";

interface Props {
  goal: string;
  staff: string;
  steps: string[];
  bottom?: ReactNode;
}

export const DescriptionLayout: FC<Props> = ({ goal, staff, steps, bottom }) => {
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
            <div key={index} style={{ marginTop: '5px' }}>
              <b>{index + 1}</b>. {step}
            </div>
          ))}
        </div>
      </div>
      {bottom}
      <Link to="/labs">
        <Button style={{ marginTop: 20, marginBottom: 40 }}>Вернуться к списку лабораторных</Button>
      </Link>
    </Container>
  );
};
