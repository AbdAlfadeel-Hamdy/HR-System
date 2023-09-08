import { ReactNode, useState } from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import SidebarListItem from "./SidebarListItem";

interface SidebarAccordionProps {
  title: string;
  list: { title: string; icon: ReactNode; href: string }[];
  icon: ReactNode;
}

const SidebarAccordion: React.FC<SidebarAccordionProps> = ({
  title,
  list,
  icon,
}) => {
  const [open, setOpen] = useState(0);

  const handleOpen = (value: any) => {
    setOpen(open === value ? 0 : value);
  };
  return (
    <Accordion
      open={open === 1}
      icon={
        <ChevronDownIcon
          strokeWidth={2.5}
          className={`mx-auto h-4 w-4 transition-transform ${
            open === 1 ? "rotate-180" : ""
          }`}
        />
      }
    >
      <ListItem className="p-0" selected={open === 1}>
        <AccordionHeader
          onClick={() => handleOpen(1)}
          className="border-b-0 p-3"
        >
          <ListItemPrefix>{icon}</ListItemPrefix>
          <Typography color="blue-gray" className="mr-auto font-normal">
            {title}
          </Typography>
        </AccordionHeader>
      </ListItem>
      <AccordionBody className="py-1">
        <List className="p-0">
          {list.map((item) => (
            <SidebarListItem
              key={item.title}
              title={item.title}
              icon={item.icon}
              href={item.href}
            />
          ))}
        </List>
      </AccordionBody>
    </Accordion>
  );
};

export default SidebarAccordion;
