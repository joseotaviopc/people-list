"use client";

import * as React from "react";
import { Input } from "./ui/input";
import { mockPeople } from "./People/PeopleList";
import { People } from "./People/PeopleCard";

interface SearchBarProps {
  setFilteredPeople: React.Dispatch<React.SetStateAction<People[]>>
  setHighlightedQuery: React.Dispatch<React.SetStateAction<string>>
}

export function SearchBar({ setFilteredPeople, setHighlightedQuery }: SearchBarProps) {
  function handleSearch(query: React.ChangeEvent<HTMLInputElement>){
    const queryValue = query.target.value;
    setHighlightedQuery(queryValue);
    if (queryValue.length === 0) {
      return setFilteredPeople(mockPeople);
    }
    setFilteredPeople(prev => prev.filter(person => person.role.toLowerCase().includes(queryValue.toLowerCase()) || person.description.toLowerCase().includes(queryValue.toLowerCase())))
  }

  return (
    <Input 
      className="border border-gray-300 focus:border-gray-300 focus:shadow-none focus:outline-none focus:ring-0 focus-visible:shadow-none focus-visible:outline-none focus-visible:ring-0 px-2.5 pl-8.5 py-2 w-full rounded-xl shadow-xs basis-0 bg-zinc-50 min-h-10 min-w-60 max-md:max-w-full text-base text-zinc-600 placeholder:text-zinc-400" 
      placeholder="Pesquise aqui..."
      onChange={handleSearch}
    />
  );
};
