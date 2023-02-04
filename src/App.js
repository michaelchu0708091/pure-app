import SignIn from './login/login.tsx';
import React from 'react';
import './App.css';
export const UserContext = React.createContext();
export const ClassContext = React.createContext();
function App() {
  const [userObject, setUserObject] = React.useState({})
  const [classList, setClassList] = React.useState([])
  return (
    <>
      <UserContext.Provider value={{ userObject, setUserObject }}>
        <ClassContext.Provider value={{ classList, setClassList }}>
          <SignIn />
        </ClassContext.Provider>
      </UserContext.Provider>
    </>
  );
}

export default App;


/*
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
*/