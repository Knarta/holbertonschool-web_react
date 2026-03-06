import { getCurrentYear, getFooterCopy } from "../utils/utils.js";

function Footer() {
  return (
    <footer className="App-footer flex justify-center border-t-2 border-[var(--main-color)] py-4 text-center mt-auto">
      <p className="text-xs sm:text-sm md:text-base italic">
        Copyright {getCurrentYear()} - {getFooterCopy(true)}
      </p>
    </footer>
  );
}

export default Footer;