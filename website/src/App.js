import logo from './logo.svg';
import "./App.css";
import Main from "./components/main/main";
import NavBar from "./components/navBar/navbar";
import Right from "./components/right/right";
import ConnectWalletButton from './components/connectwalletbutton';
function App() {
  return (
    <div id="container">
      <div id="nav-box">
        <NavBar />
      </div>
      <Main />
      <Right />
    </div>
  );
}

export default App;
