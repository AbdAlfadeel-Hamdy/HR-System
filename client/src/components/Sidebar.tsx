import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Card, Typography, List } from "@material-tailwind/react";
import {
  DocumentDuplicateIcon,
  PencilIcon,
  UserGroupIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import { ChevronRightIcon, PowerIcon } from "@heroicons/react/24/outline";

import SidebarListItem from "./SidebarListItem";
import SidebarAccordion from "./SidebarAccordion";
import customFetch from "../utils/customFetch";

export default function SidebarWithContentSeparator({ user }: { user: any }) {
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationKey: ["user"],
    mutationFn: async () => {
      await customFetch.get("/auth/logout");
    },
    onSuccess: () => {
      toast.success("Logged out successfully");
      navigate("/", { replace: true });
    },
    onError: (err) => {
      toast.error((err as any)?.response?.data.message);
    },
  });

  const actions = [
    {
      title: "Add Employee",
      icon: <ChevronRightIcon className="h-5 w-5" />,
      href: "actions/add-employee",
    },
  ];

  const auth: any[] = [
    {
      title: "Log Out",
      icon: <PowerIcon className="h-5 w-5" />,
      onClick: mutate,
    },
  ];

  if (user?.role === "admin") {
    actions.push({
      title: "Add User",
      icon: <ChevronRightIcon className="h-5 w-5" />,
      href: "actions/add-user",
    });
    auth.unshift({
      title: "Users",
      icon: <UserIcon className="h-5 w-5" />,
      href: "users",
    });
  }
  return (
    <Card className=" min-h-screen overflow-y-scroll w-[20rem] max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 rounded-none row-span-2">
      <div className="mb-2 p-4">
        <Typography variant="h5" color="blue-gray">
          Welcome, {user?.name}
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
              title: "Sponsor",
              icon: <ChevronRightIcon className="h-5 w-5" />,
              href: "reports/sponsor",
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
              title: "On Duty",
              icon: <ChevronRightIcon className="h-5 w-5" />,
              href: "reports/on-duty",
            },
            {
              title: "On Vacation",
              icon: <ChevronRightIcon className="h-5 w-5" />,
              href: "reports/on-vacation",
            },
            {
              title: "Cancelled",
              icon: <ChevronRightIcon className="h-5 w-5" />,
              href: "reports/cancelled",
            },
          ]}
        />
        <SidebarAccordion
          title="Actions"
          icon={<PencilIcon className="h-5 w-5" />}
          list={actions}
        />
        <hr className="my-2 border-blue-gray-50" />
        {auth.map((item) => (
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
