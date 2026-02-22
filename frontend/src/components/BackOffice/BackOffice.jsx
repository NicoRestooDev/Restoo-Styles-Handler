import Form from "./Form.jsx"
import { Link } from "react-router-dom"
import "./BackOffice.css"
import Logo from "../../assets/restoo-logo.svg?react"
import NavItem from "./NavItem.jsx"
import {sidebarNav} from "../../assets/sidebar.js"

export default function BackOffice(){
    return(
        <div className="app-wrapper">
            <aside className="sidebar-wrap">
                <Link className="logo-restoo-link" title="Tu Libro de reservas inteligente. Sin comisiones."  to="/">
                    <Logo className="logo-restoo"/>
                </Link>
                <section className="sidebar-nav-top">
                    <span className="shop-name txt-ellipsis">Best Burger</span>
                    <div className="user-name txt-ellipsis">
                        <span >Nico Richards</span> {/*ADMIN//CAMARERO POR IMPLEMENTAR*/}
                        <i className="fa fa-caret-down"></i>
                    </div>
                    
                </section>
                <section className="sidebar-nav-main">
                    {sidebarNav.map((group) => (
                        <section className="sidebar-nav-group" key={group.title}>
                            <span>{group.title.toUpperCase()}</span>
                            <ul>
                                {group.items.map((item) => (
                                    <NavItem
                                        className="no-bullet list-unstyled"
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
            
            
            <Form/>
            
            
            
        </div>
    )
}