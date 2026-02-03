import "./App.css";
import Notifications from "../Notifications/Notifications.jsx";
import Header from "../Header/Header.jsx";
import Login from "../Login/Login.jsx";
import Footer from "../Footer/Footer.jsx";
import { getLatestNotification } from "../utils/utils.js";

function App() {
  const notificationsList = [
    {
      id: 1, title: "New course available", type: "default", value: "New course available"},
    {
      id: 2, title: "New resume available", type: "urgent", value: "New resume available"},
    {
      id: 3, title: "New course available", type: "urgent", html: getLatestNotification()
    },
  ];
  return (
    <>
      <Notifications notification={notificationsList} />
      <Header />
      <Login />
      <Footer />
    </>
  );
}

export default App;