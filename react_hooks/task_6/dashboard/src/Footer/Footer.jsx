import { getCurrentYear, getFooterCopy } from '../utils/utils.js';

function Footer({
  isIndex,
  user = { email: '', password: '', isLoggedIn: false },
}) {
  return (
    <footer className="App-footer mt-auto relative flex flex-row items-center justify-center border-t-3 border-[var(--main-color)] py-4">
      <p className="italic text-xs tablet:text-sm desktop:text-base">
        Copyright {getCurrentYear()} - {getFooterCopy(isIndex)}
      </p>
      {user.isLoggedIn && (
        <p className="absolute right-4">
          <a href="#">Contact us</a>
        </p>
      )}
    </footer>
  );
}

export default Footer;
