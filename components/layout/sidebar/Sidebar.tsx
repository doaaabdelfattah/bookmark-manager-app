import { sidebarTabs } from "@/lib/constants";
import TabLink from "./TabLink";
import SideBarNav from "./SideBarNav";

function Sidebar() {
  return (
    <nav className=" text-preset-3 h-full gap-1 flex-col">
      {sidebarTabs.map((tab) => {
        const Icon = tab.icon;
        return (
          <TabLink key={tab.value} value={tab.value} href={tab.href}>
            <Icon />
            {tab.label}
          </TabLink>
        );
      })}

      <div className="mt-4 h-full flex-1 min-h-0 hide-scrollbar overflow-y-auto pb-6">
        <h2 className="font-bold uppercase text-xs pl-3">Tags</h2>
        <SideBarNav />
      </div>
    </nav>
  );
}

export default Sidebar;
