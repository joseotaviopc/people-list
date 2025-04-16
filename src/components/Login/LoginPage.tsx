"use client";
import * as React from "react";
import { BrandSection } from "./BrandSection";
import { LoginForm } from "./LoginForm";

export default function LoginPage() {
  return (
    <main className="flex overflow-hidden gap-10 justify-center items-center px-11 py-20  max-md:px-5">
      <section className="flex flex-wrap gap-10 justify-center xl:justify-between items-center self-stretch py-8 my-auto  min-w-60 rounded-[54px] max-md:px-5 max-md:max-w-full">
        <BrandSection />
        <LoginForm />
      </section>
    </main>
  );
}
