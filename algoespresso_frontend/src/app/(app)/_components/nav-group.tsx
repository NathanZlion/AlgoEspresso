"use client"

import { ChevronRight } from "lucide-react"
import Link from "next/link";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { HTMLAttributeAnchorTarget } from "react"


export type NavMenuItem = {
  title: string
  url: string
  icon?: JSX.Element
  isActive?: boolean
  target?: HTMLAttributeAnchorTarget | undefined,
  items?: {
    title: string
    url: string
  }[]
}

export function NavGroup({
  title,
  items
}: {
  title?: string,
  items: NavMenuItem[]
}) {
  return (
    <SidebarGroup>
      {title && <SidebarGroupLabel>{title}</SidebarGroupLabel>}
      <SidebarMenu>
        {items.map((item, index) =>
          item.items && item.items.length > 0 ? (
            <CollapsibleMenuItem key={index} item={item} />
          ) : (
            <MenuButton key={index} item={item} />
          )
        )}
      </SidebarMenu>
    </SidebarGroup>
  );
}



const CollapsibleMenuItem = ({ item }: { item: NavMenuItem }) => {
  return <Collapsible
    key={item.title}
    asChild
    defaultOpen={item.isActive}
    className="group/collapsible"
  >
    <SidebarMenuItem>


      <CollapsibleTrigger asChild>
        <SidebarMenuButton tooltip={item.title}>
          {item.icon}
          <span>{item.title}</span>
          {
            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
          }
        </SidebarMenuButton>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <SidebarMenuSub>
          {item.items?.map((subItem) => (
            <SidebarMenuSubItem key={subItem.title}>
              <SidebarMenuSubButton asChild>
                <Link href={item.url + "/" + subItem.url}>
                  <span>{subItem.title}</span>
                </Link>
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
          ))}
        </SidebarMenuSub>
      </CollapsibleContent>

    </SidebarMenuItem>
  </Collapsible>
}

const MenuButton = ({ item }: { item: NavMenuItem }) => {
  return < SidebarMenuItem key={item.title} >
    <SidebarMenuButton asChild tooltip={item.title}>
      <Link href={item.url} target={item.target}>
        {item.icon}
        <span>{item.title}</span>
      </Link>
    </SidebarMenuButton>
  </SidebarMenuItem >
}
