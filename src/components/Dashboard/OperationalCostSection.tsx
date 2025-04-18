import { CostEconomy, CostProfessional, CostTutorial } from "@/assets";
import { Button } from "../ui/button";
import { useState } from "react";

const initialCostItems = [
  {
    icon: () => <CostProfessional />,
    title: "Profissional",
    hours: "235",
    amount: "6.256,00",
    description: "Remuneração Técnica",
    active: false
  },
  {
    icon: () => <CostTutorial />,
    title: "Tutorial Executor",
    hours: "5",
    amount: "1.256,00",
    description: "Remuneração Técnica",
    active: false
  },
  {
    icon: () => <CostEconomy />,
    title: "Economia",
    hours: "230",
    amount: "5.000,00",
    description: "Remuneração Técnica",
    active: false
  },
];
export function OperationalCostSection() {
  const [costData, setCostData] = useState(initialCostItems)
  const [, setActiveCost] = useState<string | null>(null)

  const handleCostClick = (selected: typeof initialCostItems[0]) => {
    setActiveCost(selected.title)
    setCostData(prev => prev.map(filter => ({
      ...filter,
      active: filter.title === selected.title
    })))
  }

  return (
    <section className="mt-6 w-full">
      <h2 className="gap-2.5 self-stretch px-2.5 w-full text-2xl font-semibold tracking-tight leading-6 text-zinc-800">
        Custo operacional
      </h2>

      <div className="flex flex-wrap gap-5 items-center mt-6 w-full">
        {costData.map((item, index) => (
          <Button
            variant="outline"
            key={index}
            className={`flex overflow-hidden flex-col justify-center items-center self-stretch px-6 py-3 min-h-[160px] min-w-60 whitespace-nowrap rounded-2xl shadow bg-background has-[>svg]:px-0 ${item.active ? 'border border-primary' : ''}`}
            onClick={() => handleCostClick(item)}
          >
            <header className="w-9 h-9 flex gap-4 items-center self-start">
              {item.icon()}
              <h3 className="self-stretch text-xl whitespace-nowrap text-zinc-800">
                {item.title}
              </h3>
            </header>

            <div className="flex gap-8 justify-between items-center mt-6 w-full">
              <div className="self-stretch my-auto w-[89px]">
                <div className="flex flex-col justify-center w-full">
                  <p className="self-stretch text-base font-bold text-gray-700">
                    {item.hours} Horas
                  </p>
                  <p className="self-stretch mt-1.5 text-sm text-slate-500">
                    Horas Gastas
                  </p>
                </div>
              </div>

              <div className="flex flex-col justify-center self-stretch my-auto w-[146px]">
                <div className="flex flex-col justify-center">
                  <p className="self-start text-base font-bold text-gray-700">
                    R$ {item.amount}
                  </p>
                  <p className="self-stretch mt-1.5 text-sm text-slate-500">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          </Button>
        ))}
      </div>
    </section>
  );
};
