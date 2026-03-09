import { useContext } from 'react';
import { getCurrentYear, getFooterCopy } from '../utils/utils.js';
import AppContext from '../Context/context.js';

function Footer() {
  const { user } = useContext(AppContext);

  return (
    <footer className="App-footer flex justify-center border-t-2 border-[var(--main-color)] py-4 text-center mt-auto">
      <p className="text-xs sm:text-sm md:text-base italic">
        Copyright {getCurrentYear()} - {getFooterCopy(true)}
      </p>
      {user.isLoggedIn && (
        <p>
          <a href="/contact">Contact us</a>
        </p>
      )}
    </footer>
  );
}

export default Footer;
