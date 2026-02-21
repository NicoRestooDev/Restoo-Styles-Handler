import Form from "./Form.jsx"
import { Link } from "react-router-dom"
import "./BackOffice.css"
import Logo from "../../assets/restoo-logo.svg?react"
import NavItem from "./NavItem.jsx"
import {sidebarNav} from "../../assets/sidebar.js"

export default function BackOffice(){
    return(
        <div>
            <aside className="sidebar-wrap">
                <Logo/>
                <section className="sidebar-nav-top">
                    <h1>Best Burger</h1>
                    <p>Nombre de usuario</p> {/*ADMIN//CAMARERO POR IMPLEMENTAR*/}
                </section>
                <section className="sidebar-nav-main">
                    {sidebarNav.map((group) => (
                        <section key={group.title}>
                            <h2>{group.title}</h2>
                            <ul>
                                {group.items.map((item) => (
                                    <NavItem
                                        key={item.href}
                                        href={item.href}
                                        iconClass={item.iconClass}
                                        label={item.label}
                                    />
                                ))}
                            </ul>
                        </section>
                        
                    ))} 
                </section>
                
                
            </aside>
            <main>
                <Form/>
            </main>
            
            <Link to="/">Ir a la landing page a oseibar cómo quedós 💄</Link>
        </div>
    )
}