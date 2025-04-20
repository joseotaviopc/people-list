import { useEffect, useState } from "react";

const formItems = [
  { number: "01", name: "Pré-Diagnostico", count: 10 },
  { number: "02", name: "Croqui de viabilidade", count: 10 },
  { number: "03", name: "Croqui de viabilidade", count: 10 },
  { number: "04", name: "Pré-Diagnostico", count: 10 },
  { number: "05", name: "Croqui de viabilidade", count: 10 },
  { number: "06", name: "Croqui de viabilidade", count: 10 },
  { number: "07", name: "Pré-Diagnostico", count: 10 },
  { number: "08", name: "Croqui de viabilidade", count: 10 },
  { number: "09", name: "Croqui de viabilidade", count: 10 },
  { number: "04", name: "Pré-Diagnostico", count: 10 },
  { number: "05", name: "Croqui de viabilidade", count: 10 },
  { number: "06", name: "Croqui de viabilidade", count: 10 },
  { number: "07", name: "Pré-Diagnostico", count: 10 },
  { number: "08", name: "Croqui de viabilidade", count: 10 },
  { number: "09", name: "Croqui de viabilidade", count: 10 },
  { number: "09", name: "Croqui de viabilidade", count: 10 },
];
interface FormListProps {
  hideMainMenu: boolean;
  hideSecondMenu: boolean;
}

export function FormsList({ hideMainMenu, hideSecondMenu }: FormListProps) {
  const [columns, setColumns] = useState(() => {
    if (window.innerWidth >= 1536) return 4;
    if (window.innerWidth >= 1280) return 3;
    if (window.innerWidth >= 1024) return 2;
    return 1;
  });

  useEffect(() => {
    const handleResize = () => {
      const newColumns = getGridColumns();
      setColumns(newColumns);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    console.log('MainMenu: ', hideMainMenu, 'SecondMenu: ', hideSecondMenu, getGridColumns())
    if (!hideMainMenu && !hideSecondMenu && getGridColumns() <= 3) {
      setColumns(getGridColumns());
    }
  }, [hideMainMenu, hideSecondMenu])

  const getGridColumns = () => {
    console.log('innerWidth', window.innerWidth)
    if (window.innerWidth >= 1536) return 4;
    if (window.innerWidth >= 1280) return 3;
    if (window.innerWidth >= 1024) return 2;
    return 1;
  };
  
  const shouldShowBorder = (index: number, items: typeof formItems) => {
    // const columns = getGridColumns();
    console.log('columns: ', columns)
    const totalItems = items.length;
    const itemsPerRow = Math.ceil(totalItems / columns);
    
    // Calculate the position in the grid
    const rowIndex = Math.floor(index / columns);
    const isLastRow = rowIndex === itemsPerRow - 1;
    
    return !isLastRow;
  };

  return (
    <section className="px-1 border-[16px] 2xl py-8 mt-6 w-full rounded-2xl shadow bg-background border-background max-h-80  overflow-y-auto">
      <div className={`grid md:grid-cols-${columns} lg:grid-cols-${columns} xl:grid-cols-${columns} gap-5`}>
        {formItems.map((item, index) => (
          <article
            key={index}
            className={`my-auto basis-0 w-full pr-8 ${shouldShowBorder(index, formItems) ? 'border-b' : ''}`}
          >
            <div className="flex overflow-hidden  items-center px-1.5 ">
              <div className="flex gap-2.5 items-center my-auto min-h-[65px]  ">
                <div className="flex gap-2.5 justify-center items-center my-auto text-base font-medium text-center whitespace-nowrap text-slate-500">
                  <span className="my-auto min-w-[21px]">
                    {item.number}
                  </span>
                  <div className="shrink-0 self-stretch my-auto w-0 border border-solid bg-slate-200 bg-opacity-50 border-slate-200 border-opacity-50 h-[43px]" />
                </div>
                <div className="flex flex-col justify-center self-stretch my-auto">
                  <h3 className="text-base text-ellipsis whitespace-nowrap font-medium text-gray-700">
                    {item.name}
                  </h3>
                  <p className="gap-2 self-start mt-1 text-sm min-h-5 text-zinc-400">
                    {item.count} Formulários
                  </p>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
