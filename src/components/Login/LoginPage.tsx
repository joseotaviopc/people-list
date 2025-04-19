"use client";
// import * as React from "react";
import { BrandSection } from "./BrandSection";
import { LoginForm } from "./LoginForm";

export default function LoginPage() {
  return (
    <main className="flex overflow-hidden min-h-screen justify-center items-center px-11 py-6 max-md:px-5">
      <section className="flex flex-wrap gap-10 justify-center xl:justify-between items-center self-stretch my-auto min-w-60 max-md:px-5 max-md:max-w-full">
        <BrandSection />
        <LoginForm />
      </section>
    </main>
  );
}
