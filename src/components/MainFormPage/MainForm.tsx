"use client";
import * as React from "react";
import { WelcomeSection } from "./WelcomeSection";
import { FormDescription } from "./FormDescription";
import { NavigationButton } from "./NavigationButton";
import { SidePanel } from "./SidePanel";

export default function MainForm() {
  return (
    <main className="flex relative flex-col gap-2.5 justify-center items-center bg-blend-normal min-h-[1024px] text-foreground">
      <img
        src="https://cdn.builder.io/api/v1/image/assets/a957b64922e04ac2a23d8b53cd42fbd2/7b111fbabf0891ab0a671a7888ec71303d82a0de?placeholderIfAbsent=true"
        alt="Background"
        className="object-cover absolute inset-0 size-full"
      />
      <section className="flex relative flex-wrap gap-7 justify-center self-stretch my-auto min-h-[880px] min-w-60 w-[1049px]">
        <article className="flex overflow-hidden relative grow shrink justify-center items-start h-full rounded-2xl min-w-60 w-[639px] max-md:max-w-full">
          <div className="flex absolute bottom-0 -right-px z-0 shrink-0 rounded-2xl bg-white bg-opacity-10 h-[880px] min-w-60 w-[703px] max-md:max-w-full" />
          <div className="flex overflow-hidden z-0 flex-col px-10 py-2 rounded-2xl shadow-lg bg-blend-normal min-h-[880px] min-w-60 w-[702px] max-md:px-5 max-md:max-w-full">
            <WelcomeSection />
            <FormDescription />
            <div className="flex flex-1 self-center max-w-full min-h-[230px] w-[622px]" />
            <NavigationButton />
          </div>
        </article>
        <SidePanel />
      </section>
    </main>
  );
}
