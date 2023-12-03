import { FC } from 'react';
import './App.css';
import { AppRouter } from './providers/router/Router';


const App: FC = () => {
  return (
    <div className="">
      <AppRouter />
    </div>
  );
}

export default App;
