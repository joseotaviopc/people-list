"use client";

import { FilterSection } from "./FilterSection";
import { StatusCards } from "./StatusCards";
import { FormsList } from "./FormsList";
import { OperationalCostSection } from "./OperationalCostSection";
import { useState } from "react";
import { Sidebar } from "../Sidebar";

export default function DashboardPage() {
  const [hideMenu, setHideMenu] = useState(false);

  return (
    <main className="flex h-auto flex-wrap bg-background">
      <div className={hideMenu ? "flex gap-5 h-auto" : "min-w-60"}>
      <Sidebar setHideMenu={setHideMenu} hideMenu={hideMenu} />
      </div>

      <div className="flex flex-col flex-1 shrink justify-center self-stretch px-6 py-7 basis-0 min-w-60 max-md:px-5 bg-background-dark">
        <div className="flex-1 w-full">
          <div className="w-full">
            <FilterSection />
            <StatusCards />
            <FormsList />
          </div>
          <OperationalCostSection />
        </div>
      </div>
    </main>
  );
};
