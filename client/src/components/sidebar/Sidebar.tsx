import { Card, Typography, List } from "@material-tailwind/react";
import {
  DocumentDuplicateIcon,
  UserGroupIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import { ChevronRightIcon, PowerIcon } from "@heroicons/react/24/outline";

import SidebarListItem from "./SidebarListItem";
import SidebarAccordion from "./SidebarAccordion";

export default function SidebarWithContentSeparator({ user }: { user: any }) {
  return (
    <Card className="min-h-[calc(100vh)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 rounded-none row-span-2">
      <div className="mb-2 p-4">
        <Typography variant="h5" color="blue-gray">
          Welcome, {user.name}
        </Typography>
      </div>

      <List>
        <SidebarListItem
          key="All Employees"
          title="All Employees"
          icon={<UserGroupIcon className="h-5 w-5" />}
          href="/dashboard"
        />
        <SidebarAccordion
          title="Reports"
          icon={<DocumentDuplicateIcon className="h-5 w-5" />}
          list={[
            {
              title: "Activity Log",
              icon: <ChevronRightIcon className="h-5 w-5" />,
              href: "reports/activity-log",
            },
            {
              title: "Drivers",
              icon: <ChevronRightIcon className="h-5 w-5" />,
              href: "reports/driver",
            },
            {
              title: "ID",
              icon: <ChevronRightIcon className="h-5 w-5" />,
              href: "reports/id",
            },
            {
              title: "Expired ID",
              icon: <ChevronRightIcon className="h-5 w-5" />,
              href: "reports/expired-id",
            },
            {
              title: "Passport",
              icon: <ChevronRightIcon className="h-5 w-5" />,
              href: "reports/passport",
            },
            {
              title: "Vacations",
              icon: <ChevronRightIcon className="h-5 w-5" />,
              href: "reports/vacations",
            },
            {
              title: "Status",
              icon: <ChevronRightIcon className="h-5 w-5" />,
              href: "reports/status",
            },
          ]}
        />
        <hr className="my-2 border-blue-gray-50" />
        {[
          {
            title: "profile",
            icon: <UserIcon className="h-5 w-5" />,
            href: "profile",
          },
          {
            title: "Log Out",
            icon: <PowerIcon className="h-5 w-5" />,
            onClick: () => console.log("a7a"),
          },
        ].map((item) => (
          <SidebarListItem
            key={item.title}
            title={item.title}
            icon={item.icon}
            href={item.href}
            onClick={item.onClick}
          />
        ))}
      </List>
    </Card>
  );
}
