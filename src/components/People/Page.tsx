"use client";

import * as React from "react";
import { Sidebar } from "../Sidebar";
import { PeopleList } from "./PeopleList";

export const PeopleListPage: React.FC = () => {
  const [hideMenu, setHideMenu] = React.useState(false);
  return (
    <div className="flex h-auto flex-wrap bg-zinc-100">
      <div className={hideMenu ? "flex gap-5 h-auto" : "min-w-60"}>
      <Sidebar setHideMenu={setHideMenu} hideMenu={hideMenu} />
      </div>
      <PeopleList />
    </div>
  );
};

export default PeopleListPage;
