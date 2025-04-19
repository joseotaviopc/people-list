import { useState, useRef } from "react";
import { Button } from "../ui/button";
import { ScrollLeft, ScrollRight, Search, TotalForms } from "@/assets";
import { Input } from "../ui/input";

const initialTypeData = [
  { text: "Holding Patrimonial (85)", active: false },
  { text: "Ativos fundiários (100)", active: false },
  { text: "Planejamento Tributário (85)", active: false },
  { text: "Recuperação Tributária", active: false },
  { text: "Holding Patrimonial (85)", active: false },
  // { text: "Ativos fundiários (100)", active: false },
  // { text: "Planejamento Tributário (85)", active: false },
  // { text: "Recuperação Tributária", active: false },
]
const initialStatusData = [
  { value: "120", label: "Completos", active: false },
  { value: "50", label: "Pendentes", active: false },
  { value: "75", label: "Aguardando doc", active: false },
  { value: "50", label: "Notas Fiscais", active: false },
]
export function StatusCards() {
  const [typeData, setTypeData] = useState(initialTypeData)
  const [, setActiveType] = useState<string | null>(null)
  const [statusData, setStatusData] = useState(initialStatusData)
  const [, setActiveStatus] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft -= 200; // Adjust the scroll amount as needed
    }
  };

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft += 200; // Adjust the scroll amount as needed
    }
  };

  const handleTypeClick = (selected: typeof initialTypeData[0]) => {
    setActiveType(selected.text)
    setTypeData(prev => prev.map(type => ({
      ...type,
      active: type.text === selected.text
    })))
  }

  const handleStatusClick = (selected: typeof initialStatusData[0]) => {
    setActiveStatus(selected.label)
    setStatusData(prev => prev.map(status => ({
      ...status,
      active: status.label === selected.label
    })))
  }

  const handleSearch = () => {
    console.log("Search: ", search)
  }

  return (
    <section className="flex flex-col mt-12 max-md:mt-10">
      <h2 className="gap-2.5 self-start text-2xl font-semibold tracking-tight leading-6 whitespace-nowrap text-zinc-800">
        Status
      </h2>

      <div className="flex relative gap-6 items-center mt-6 w-full">
        <div className="flex z-0 flex-col justify-center self-stretch p-6 my-auto rounded-2xl bg-background min-h-[174px] min-w-[250px] w-[250px] max-md:px-5 border shadow-xs">
          <div className="flex flex-col flex-1 justify-center w-full">
            <div className="flex flex-col flex-1 h-full">
              <span className="flex h-14 w-16 ">
                <TotalForms />
              </span>
              <p className="text-3xl font-bold text-left text-grey-darker ">270</p>
            </div>
            <p className="self-start mt-1 text-base text-grey-light">
              Total de Formulários
            </p>
          </div>
        </div>

        <div className="z-0 flex-1 shrink self-stretch my-auto basis-[50px] min-w-60">
          <div className="flex items-center relative">
            <div className="absolute left-3" onClick={handleSearch}>
              <Search />
            </div>
            <Input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Pesquisar em todo o sistema..."
              className="flex flex-1 shrink gap-2 items-center self-stretch my-auto w-full basis-0 bg-background h-11 min-w-60 pl-9 outline-none"
            />
          </div>

          {/* STATUS FILTER */}
          <div className="flex justify-center items-center mt-6 w-full relative">
            {statusData.length > 4 && <div className="absolute -left-3 cursor-pointer">
              <ScrollRight />
            </div>}
            <div className="flex flex-wrap flex-1 shrink gap-6 items-center self-stretch my-auto w-full basis-0 min-w-60">
              {statusData.map((card, index) => (
                <Button
                  variant="outline"
                  key={index}
                  className={`flex overflow-hidden flex-1 flex-col shrink justify-center self-stretch px-4 my-auto whitespace-nowrap rounded-lg shadow min-h-[105px] bg-background ${card.active ? 'border border-primary' : ''}`}
                  onClick={() => handleStatusClick(card)}
                >
                  <div className="flex flex-col flex-1 justify-between items-start w-full">
                    <div className="flex flex-col flex-1 justify-center w-full max-w-[200px]">
                      <p className="text-3xl font-bold self-start text-zinc-800">
                        {card.value}
                      </p>
                      <p className={`self-start text-base font-normal ${card.active ? 'text-primary' : 'text-grey-light'}`}>
                        {card.label}
                      </p>
                    </div>
                  </div>
                </Button>
              ))}
            </div>
            {statusData.length > 4 && <div className="absolute -right-3 cursor-pointer">
              <ScrollLeft />
            </div>}
          </div>
        </div>
      </div>

      {/* TYPE FILTER */}
      <div
        className="flex relative gap-5 items-center self-center  mt-6 w-full px-4"
      >
        {typeData.length > 4 && <div className="absolute left-1 cursor-pointer" onClick={handleScrollLeft}>
          <ScrollRight />
        </div>}
        <div className="flex gap-5 items-center self-center overflow-x-hidden" ref={scrollContainerRef}>
          {typeData.map((item, index) => (
            <Button
              variant="outline"
              key={index}
              className={`flex overflow-hidden flex-col justify-center items-center self-stretch px-4 my-auto whitespace-nowrap rounded-lg shadow bg-background ${item.active ? 'border border-primary' : ''}`}
              onClick={() => handleTypeClick(item)}
            >
              <span className={`px-5 ${item.active ? 'text-primary' : ''}`}>
                {item.text}
              </span>
            </Button>
          ))}
        </div>
        {typeData.length > 4 && <div className="absolute right-1 cursor-pointer" onClick={handleScrollRight}>
          <ScrollLeft />
        </div>}
      </div>
    </section>
  );
};
