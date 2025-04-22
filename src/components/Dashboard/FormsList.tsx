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

const COLUMNS = {
  cols4: {cols: 4, class: 'grid-cols-4'},
  cols3: {cols: 3, class: 'grid-cols-3'},
  cols2: {cols: 2, class: 'grid-cols-2'},
  cols1: {cols: 1, class: 'grid-cols-1'}
}

export function FormsList({ hideMainMenu, hideSecondMenu }: FormListProps) {
  const [columns, setColumns] = useState(COLUMNS.cols3);

  const getGridColumns = () => {
    if (window.innerWidth >= 1536) return COLUMNS.cols4;
    
    if (window.innerWidth >= 1280 && !hideMainMenu && !hideSecondMenu) return COLUMNS.cols2;
    if (window.innerWidth >= 1280 && (hideMainMenu || hideSecondMenu)) return COLUMNS.cols3;
    
    if (window.innerWidth >= 1024  && !hideMainMenu && !hideSecondMenu) return COLUMNS.cols1;
    if (window.innerWidth >= 1024 && (hideMainMenu || hideSecondMenu)) return COLUMNS.cols2;
    
    if (window.innerWidth >= 768  && (hideMainMenu && hideSecondMenu)) return COLUMNS.cols2;
    
    return COLUMNS.cols1;
  };
  
  const shouldShowBorder = (index: number, items: typeof formItems) => {
    const totalItems = items.length;
    const itemsPerRow = Math.ceil(totalItems / columns.cols);
    
    const rowIndex = Math.floor(index / columns.cols);
    const isLastRow = rowIndex === itemsPerRow - 1;
    
    return !isLastRow;
  };

  useEffect(() => {
    const handleResize = () => {
      const newColumns = getGridColumns();
      setColumns(newColumns);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const newColumns = getGridColumns();
    setColumns(newColumns);
  }, [hideMainMenu, hideSecondMenu])

  return (
    <section className="px-1 border-[16px] 2xl py-8 mt-6 w-full rounded-2xl shadow-xs bg-background border-background max-h-80  overflow-y-auto">
      <div className={`grid ${columns.class} gap-5`}>
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
