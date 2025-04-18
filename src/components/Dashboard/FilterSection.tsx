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
        </div>
      </div>
    </section>
  );
};
