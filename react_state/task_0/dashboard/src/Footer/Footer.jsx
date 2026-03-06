import { getCurrentYear, getFooterCopy } from "../utils/utils.js";
import "./Footer.css";

function Footer() {
  return (
    <footer className="App-footer">
      <p>
        Copyright {getCurrentYear()} - {getFooterCopy(true)}
      </p>
    </footer>
  );
}

export default Footer;