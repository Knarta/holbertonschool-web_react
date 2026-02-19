import { getCurrentYear, getFooterCopy } from "../utils/utils.js";

function Footer() {
  return (
    <footer className="App-footer flex justify-center border-t-2 border-[var(--main-color)] mt-auto py-4 text-center">
      <p className="text-sm italic">
        Copyright {getCurrentYear()} - {getFooterCopy(true)}
      </p>
    </footer>
  );
}

export default Footer;