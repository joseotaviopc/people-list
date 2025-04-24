export function WelcomeSection() {
  return (
    <>
      {/* <div className="flex flex-col justify-center self-center max-w-full">
        <hr className="w-full min-h-0 max-md:max-w-full" />
      </div> */}
      <header className="w-full font-semibold max-md:max-w-full">
        <h1 className="self-stretch w-full text-2xl max-md:max-w-full">
          Seja bem vindo!
        </h1>
        <h2 className="self-stretch mt-1.5 w-full text-sm font-normal max-md:max-w-full">
          Formulário Pré Diagnostico Holding Familiar
        </h2>
      </header>
      {/* <div className="flex flex-col justify-center self-center py-2.5 max-w-full">
        <hr className="w-full min-h-0 max-md:max-w-full" />
      </div> */}
      <section className="flex flex-col justify-center w-full mt-5 text-sm font-normal max-md:max-w-full">
        <p className="flex-1 shrink gap-2.5 self-stretch w-full basis-0 max-md:max-w-full">
          Este formulário possui a finalidade de um diagnóstico preliminar do
          seu conhecimento sobre os benefícios de uma holding patrimonial e
          identificar qual o seu atual cenário.
        </p>
      </section>
      {/* <div className="flex flex-col justify-center self-center py-10 max-w-full">
        <hr className="w-full min-h-0 max-md:max-w-full" />
      </div> */}
    </>
  );
}
