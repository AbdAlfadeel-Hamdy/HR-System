import { NavLink } from "react-router-dom";
import { ListItem, ListItemPrefix } from "@material-tailwind/react";
const SidebarListItem = ({ title, icon, href, onClick, }) => {
    if (!href)
        return (<ListItem onClick={onClick} className={"font-cairo"}>
        <ListItemPrefix>{icon}</ListItemPrefix>
        {title}
      </ListItem>);
    return (<NavLink to={href} className={"font-cairo"}>
      <ListItem>
        <ListItemPrefix>{icon}</ListItemPrefix>
        {title}
      </ListItem>
    </NavLink>);
};
export default SidebarListItem;
