import { FC } from "react";
import { Input, Button } from 'antd'

import classes from './Registration.module.css'

import { Link } from "react-router-dom";

export const Registration: FC = () => {
  return (
    <div className={classes.container}>
      <span className={classes.title}>Виртуальная лаборатория</span>
      <div className={classes.inputContainer}>
        <Input size="large" placeholder="Электронная почта" />
        <Input size="large" placeholder="Имя пользователя" />
        <Input size="large" placeholder="Пароль" type="password" />
        <Input size="large" placeholder="Повторите пароль" type="password" />
        <div className={classes.buttonContainer}>
          <Link to="/login" className={classes.button}>
            <Button size="large">Вход</Button>
          </Link>
          <Link to="/login" className={classes.button}>
            <Button size="large" type="primary">Регистрация</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}