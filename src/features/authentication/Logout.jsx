import { HiArrowRightOnRectangle } from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon.jsx";
import { useLogout } from "./useLogout.js";
import SpinnerMini from "../../ui/SpinnerMini.jsx";

function Logout() {
  const { mutateLogout, isLoggingOut } = useLogout();

  return (
    <ButtonIcon disabled={isLoggingOut} onClick={mutateLogout}>
      {!isLoggingOut ? <HiArrowRightOnRectangle /> : <SpinnerMini />}
    </ButtonIcon>
  );
}

export default Logout;
