"use client";

import { FilterSection } from "./FilterSection";
import { StatusCards } from "./StatusCards";
import { FormsList } from "./FormsList";
import { OperationalCostSection } from "./OperationalCostSection";
import { useState } from "react";
import { Sidebar } from "../Sidebar";
import { MainSidebar } from "../MainSidebar";

export default function DashboardPage() {
  const [hideMenu, setHideMenu] = useState(true);
  const [hideMenu2, setHideMenu2] = useState(true);

  return (
    <main className="flex h-auto flex-wrap bg-background">
      <div className="flex gap-6 h-auto bg-background-dark">
        <MainSidebar setHideMenu={setHideMenu} hideMenu={hideMenu} />
        <Sidebar setHideMenu={setHideMenu2} hideMenu={hideMenu2} />
      </div>

      <div className="flex flex-col flex-1 shrink justify-center self-stretch px-6 py-7 basis-0 min-w-60 max-md:px-5 bg-background-dark">
        <div className="flex-1 w-full">
          <div className="w-full">
            <FilterSection />
            <StatusCards hideMainMenu={hideMenu} hideSecondMenu={hideMenu2}/>
            <FormsList hideMainMenu={hideMenu} hideSecondMenu={hideMenu2}/>
          </div>
          <OperationalCostSection />
        </div>
      </div>
    </main>
  );
};
