import Form from "./Form.jsx"
import { Link } from "react-router-dom"

export default function BackOffice(){
    return(
        <div>
            <h1>Back Office</h1>
            <Form/>
            <Link to="/landing">Ir a la landing page a oseibar cómo quedós 💄</Link>
        </div>
    )
}