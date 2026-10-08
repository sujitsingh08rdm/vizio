"use client";

import ChildrenInterface from "@/interfaces/children-interface";
import { FC } from "react";
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
} from "../ui/sidebar";
import {
  Bell,
  FileVideo,
  Landmark,
  LayoutDashboard,
  Settings,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { FloatingDock } from "../ui/floating-dock";

const AppLayout: FC<ChildrenInterface> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();

  const items = [
    {
      title: "Dashboard",
      url: "/app/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Library",
      url: "/app/library",
      icon: FileVideo,
    },
    {
      title: "Bill & Payments",
      url: "/app/payments",
      icon: Landmark,
    },
    {
      title: "Notifications",
      url: "/app/notifications",
      icon: Bell,
    },
    {
      title: "Setting",
      url: "/app/settings",
      icon: Settings,
    },
  ];

  const dockItems = [
    {
      title: "Dashboard",
      icon: (
        <LayoutDashboard className="w-full h-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/app/dashboard",
    },
    {
      title: "Library",
      href: "/app/library",
      icon: (
        <FileVideo className="w-full h-full text-neutral-500 dark:text-neutral-300" />
      ),
    },
    {
      title: "Bill & Payments",
      href: "/app/payments",
      icon: (
        <Landmark className="w-full h-full text-neutral-500 dark:text-neutral-300" />
      ),
    },
    {
      title: "Notifications",
      href: "/app/notifications",
      icon: (
        <Bell className="w-full h-full text-neutral-500 dark:text-neutral-300" />
      ),
    },
    {
      title: "Setting",
      href: "/app/settings",
      icon: (
        <Settings className="w-full h-full text-neutral-500 dark:text-neutral-300" />
      ),
    },
  ];

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="mb-4">Application</SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu className="space-y-2">
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      onClick={() => router.push(item.url)}
                      isActive={pathname === item.url}
                    >
                      <item.icon />
                      <span>{item.title}</span>
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
          <CardHeader>
            <CardTitle className="text-3xl font-bold capitalize-first">
              {pathname.split("/").pop()?.split("-").join(" ")}
            </CardTitle>
            <CardDescription>
              Here is showing your{" "}
              {pathname.split("/").pop()?.split("-").join(" ")}
            </CardDescription>
          </CardHeader>
          {children}
        </div>
        <div className="fixed bottom-0 left-0 w-full flex py-8">
          <FloatingDock items={dockItems} />
        </div>
      </main>
    </SidebarProvider>
  );
};

export default AppLayout;
