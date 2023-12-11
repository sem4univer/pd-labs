import { FC } from "react";
import { Input, Button } from 'antd'

import classes from './Login.module.css'
import { Link } from "react-router-dom";

import LogoImage from './logo.png';

export const Login: FC = () => {
  return (
    <div className={classes.container}>
      <span className={classes.title}>Виртуальная лаборатория</span>
      <img src={LogoImage} alt="" width="180" />
      <div className={classes.inputContainer}>
        <Input size="large" placeholder="Электронная почта" />
        <Input size="large" placeholder="Пароль" type="password" />
        <div className={classes.buttonContainer}>
          <Link to="/registration" className={classes.button}>
            <Button size="large">Регистрация</Button>
          </Link>
          <Link to="/labs" className={classes.button}>
            <Button size="large" type="primary">Вход</Button>
          </Link>
        </div>
        <div className={classes.grayText}>Забыли пароль?</div>
      </div>
    </div>
  )
}