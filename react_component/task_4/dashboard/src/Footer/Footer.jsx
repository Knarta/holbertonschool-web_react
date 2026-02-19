import { getCurrentYear, getFooterCopy } from "../utils/utils.js";

function Footer() {
  return (
    <footer className="flex justify-center border-t-2 border-main">
      <p>
        Copyright {getCurrentYear()} - {getFooterCopy(true)}
      </p>
    </footer>
  );
}

export default Footer;