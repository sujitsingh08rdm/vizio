"use client";
import React, { FC } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "../ui/sidebar";
import {
  AlignEndHorizontal,
  BellIcon,
  FileVideo,
  Home,
  Landmark,
  Settings,
} from "lucide-react";
import ChildrenInterface from "@/interfaces/children-interface";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CardDescription, CardHeader, CardTitle } from "../ui/card";
import { io } from "socket.io-client";
export const webSocket = io(process.env.NEXT_PUBLIC_SERVER);

const items = [
  {
    title: "Dashboard",
    url: "/app/dashboard",
    icon: AlignEndHorizontal,
  },
  {
    title: "Library",
    url: "/app/library",
    icon: FileVideo,
  },
  {
    title: "Payments",
    url: "/app/payments",
    icon: Landmark,
  },
  {
    title: "Notifications",
    url: "/app/notifications",
    icon: BellIcon,
  },
  {
    title: "Settings",
    url: "/app/settings",
    icon: Settings,
  },
];

const dockItems = [
  {
    title: "Dashboard",
    icon: (
      <Home className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    href: "/app/dashboard",
  },
  {
    title: "Library",
    icon: (
      <FileVideo className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    href: "/app/library",
  },
  {
    title: "Payments",
    icon: (
      <Landmark className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    href: "/app/payments",
  },
  {
    title: "Notifications",
    icon: (
      <BellIcon className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    href: "/app/notifications",
  },
  {
    title: "Settings",
    icon: (
      <Settings className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    href: "/app/settings",
  },
];

const AppLayout: FC<ChildrenInterface> = ({ children }) => {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="mb-3">Application</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-2">
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <main className="w-full">
        <div className="px-24 py-8 space-y-8">
          <CardHeader className="p-0">
            <CardTitle className="text-3xl capitalize-first">
              {pathname.split("/").pop()?.split("-").join(" ")}
            </CardTitle>
            <CardDescription>
              Here is showing your {pathname.split("/").pop()}
            </CardDescription>
          </CardHeader>
          {children}
        </div>
        {/* <div className='fixed bottom-0 left-0 w-full flex py-8 ml-[160px]'>
          <FloatingDock items={dockItems} />
        </div> */}
      </main>
    </SidebarProvider>
  );
};

export default AppLayout;
