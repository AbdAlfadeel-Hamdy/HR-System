import { ListItem, ListItemPrefix } from "@material-tailwind/react";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { ReactNode } from "react";

interface SidebarListItemProps {
  children: ReactNode;
}

const SidebarListItem: React.FC<SidebarListItemProps> = ({ children }) => {
  return (
    <ListItem>
      <ListItemPrefix>
        <UserCircleIcon className="h-5 w-5" />
      </ListItemPrefix>
      {children}
    </ListItem>
  );
};

export default SidebarListItem;
