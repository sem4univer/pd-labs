import { FC, useState } from "react";
import { Input, Button, Modal } from 'antd'

import classes from './AnswerPlace.module.css';
import { Link } from "react-router-dom";

const { TextArea } = Input;

interface AnswerPlaceProps {
  placeholder?: string;
}

export const AnswerPlace: FC<AnswerPlaceProps> = ({ placeholder }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div className={classes.container}>
      <span>Введите свой ответ здесь</span>
      <TextArea rows={4} placeholder={placeholder ?? 'Ваш ответ'} />

      <Button type="primary" size="middle" onClick={showModal}>Отправить ответ</Button>

      <Modal title="Ваши результаты" open={isModalOpen} onOk={handleOk} footer={(_, { OkBtn, CancelBtn }) => (
        <>
          <Link to="/labs">
            <Button type="primary">Перейти в списку лабораторных</Button>
          </Link>
        </>
      )}>
        <p>Отлично! Ваша работа была отправлена на проверку. Вам придет уведомление в личном кабинете, когда ее проверят.</p>
      </Modal>
    </div>
  );
}