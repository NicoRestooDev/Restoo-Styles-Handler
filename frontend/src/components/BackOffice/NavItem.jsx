import {Link} from "react-router-dom"

export default function NavItem({href, iconClass, label}){
    const isExternal = href.startsWith("http");

    return(
        <li>
            {isExternal ? (
                <a href={href} target="_blank" rel="noopener noreferrer">
                    <i className = {iconClass}></i>
                    <p>{label}</p>
                </a>
            ) : (
                <Link to={href}>
                    <i className={iconClass}></i>
                    <p>{label}</p>
                </Link>
            )}
        </li>
    )
}