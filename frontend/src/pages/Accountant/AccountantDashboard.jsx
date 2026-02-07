import {Link} from "react-router-dom";


export default function AccountantDashboard(){
    return(
        <div>
            <h3>Accountant Dashboard</h3>
            <ul>
                <li> <Link to="/accountant/bills" >View Bills</Link> </li>
                <li> <Link to="/accountant/payment">Payments</Link> </li>
                <li> <Link to="/accountant/reports">Monthly Report</Link> </li>
                <li> <Link to="/accountant/reports/pdf">Reports</Link> </li>
            </ul>
        </div>
    )
}