import { useState } from "react";
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
 
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const initialFiltersData = [
  { text: "Hoje", active: false },
  { text: "7D", active: false },
  { text: "15D", active: false },
  { text: "30D", active: false },
  { text: "Essa semana (10)", active: false },
]

export function FilterSection() {
  const [filtersData, setFiltersData] = useState(initialFiltersData)
  const [, setActiveFilter] = useState<string | null>(null)
  const [, setActiveSubItem] = useState<string | null>(null)
  const [initialDate, setInitialDate] = useState<Date>()
  const [finalDate, setFinalDate] = useState<Date>()

  const handleFilterClick = (selected: typeof initialFiltersData[0]) => {
    setActiveFilter(selected.text)
    setFiltersData(prev => prev.map(filter => ({
      ...filter,
      active: filter.text === selected.text
    })))
  }

  return (
    <section className="flex flex-col justify-center w-full">
      <h2 className="self-start text-2xl font-semibold whitespace-nowrap text-zinc-800">
        Filtros
      </h2>

      <div className="flex flex-wrap flex-1 gap-2.5 items-center justify-between mt-4 size-full">
        <div className="flex flex-wrap gap-2.5 items-center self-stretch my-auto text-sm text-grey-light font-normal min-w-60">
          {filtersData.map(
            (filter, index) => (
              <Button
                variant="outline"
                key={index}
                className={`flex overflow-hidden flex-col justify-center items-center self-stretch px-4 my-auto whitespace-nowrap rounded-lg shadow bg-background ${filter.active ? 'border border-primary' : ''}`}
                onClick={() => handleFilterClick(filter)}
              >
                <span className={`px-5 ${filter.active ? 'text-primary' : ''}`}>
                  {filter.text}
                </span>
              </Button>
            ),
          )}
        </div>

        {/* <div className="flex flex-col flex-1 shrink justify-center items-center self-stretch px-2.5 basis-0 rotate-[3.141592653589793rad]">
          <div className="w-0 bg-slate-500 min-h-[37px]" />
        </div> */}

        

        <div className="flex gap-2.5 items-center self-stretch my-auto text-sm text-gray-700 min-w-60">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "justify-start text-left font-normal",
                !initialDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon />
              {initialDate ? format(initialDate, "dd/MM/yy") : <span className="self-stretch my-auto">Data Inicial</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={initialDate}
              onSelect={setInitialDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "justify-start text-left font-normal",
                !finalDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon />
              {finalDate ? format(finalDate, "dd/MM/yy") : <span className="self-stretch my-auto">Data Final</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={finalDate}
              onSelect={setFinalDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
          {/* {["Data inicial", "Data Final"].map((date, index) => (
            <Button
              variant="outline"
              key={index}
              className="flex overflow-hidden flex-col justify-center items-center self-stretch px-4 my-auto whitespace-nowrap rounded-lg shadow bg-background"
            >
              <div className="flex gap-1.5 justify-center items-center px-5 min-h-10">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/a957b64922e04ac2a23d8b53cd42fbd2/4c0ef7d40ddc1d826b09dfa9c5810769fa8f4b39?placeholderIfAbsent=true"
                  className="object-contain shrink-0 self-stretch my-auto w-3 aspect-square"
                  alt="Calendar"
                />
                <span className="self-stretch my-auto">{date}</span>
              </div>
            </Button>
          ))} */}
        </div>
      </div>
    </section>
  );
};
