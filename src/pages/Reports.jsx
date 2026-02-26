import { useOutletContext } from "react-router-dom";

function Reports() {
    const { darkMode } = useOutletContext();

    return (
        <div>
            <h3 className="fw-bold">Reports & Analytics</h3>
            <p>Transaction reports and analytics will appear here.</p>
        </div>
    );
}

export default Reports;