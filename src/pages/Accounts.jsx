import AccountList from "../components/AccountList";
import { useOutletContext } from "react-router-dom";

function Accounts() {
    const { darkMode } = useOutletContext();
    return <AccountList darkMode={darkMode} />;
}

export default Accounts;