import './App.css';
import { Routes } from './Routes';
import UserContext from './UserContext.js';

const App = () => {
  return (
    <UserContext>
      <Routes />
    </UserContext>
  );
};

export default App;
