"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { toast } from "sonner";

const VerificationCodeInput: React.FC = () => {
  const [code, setCode] = useState<string>("");
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const [focusedIndex, setFocusedIndex] = useState<number>(0);
  const codeLength = 5;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    const newCode = code.split("");
    
    if (value && value.length === 1) {
      newCode[index] = value;
      setCode(newCode.join("") + (index < codeLength - 1 ? "" : ""));
      
      if (index < codeLength - 1) {
        inputRefs.current[index + 1]?.focus();
        setFocusedIndex(index + 1);
      }
    } else {
      newCode[index] = "";
      setCode(newCode.join("") + (index < codeLength - 1 ? "" : ""));
      
      if (index > 0) {
        inputRefs.current[index - 1]?.focus();
        setFocusedIndex(index - 1);
      }
    }
  };

  useEffect(() => {
    if (focusedIndex >= 0 && focusedIndex < codeLength) {
      inputRefs.current[focusedIndex]?.focus();
    }
  }, [focusedIndex]);

  const getPlaceholder = (index: number): string => {
    return code[index] ? "" : "_";
  };

  const handleConfirm = () => {
    toast.success("Código confirmado");
  };

  const handleResend = () => {
    setCode("");
    toast.success("Reenviando código");
  };

  const handleClose = () => {
    toast.error("Saindo");
  };

  return (
    <section className="flex relative flex-col gap-2.5 justify-center items-center bg-blend-normal min-h-screen">
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/7b111fbabf0891ab0a671a7888ec71303d82a0de?placeholderIfAbsent=true"
        alt="Background"
        className="object-cover absolute inset-0 size-full"
      />

      <article className="flex relative z-0 flex-col justify-center p-[30px] my-auto rounded-2xl bg-background-dark min-w-60 w-fit max-md:px-5 max-md:max-w-full">
        <div className="flex overflow-hidden z-0 justify-center items-center self-center bg-primary shadow aspect-[1/1] h-[41px] rounded-[999px] w-[41px]">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/2f78f74fe625cfd2f07e723367ef47a2cdf15fc6?placeholderIfAbsent=true"
            alt="Lock icon"
            className="object-contain self-stretch my-auto aspect-square stroke-[2px] stroke-background w-4"
          />
        </div>

        <header className="flex z-0 mt-5 flex-col w-full text-center">
          <h1 className="text-base font-medium text-grey-darker">
            Digite o código e <br />
            clique em{" "}
            <span className="text-primary">"Confirmar"<br /></span>
            para avançar
          </h1>
          <p className="self-center mt-2.5 text-base text-grey-light w-[289px]">
            Ou clique em "Reenviar"
            <br />
            para receber o código por email
          </p>
        </header>

        <div className="flex z-0 gap-1.5 items-start self-center p-2.5 mt-9 text-center whitespace-nowrap">
          {[...Array(codeLength)].map((_, index) => (
            <input
              key={index}
              ref={(el) => {
                if (el) {
                  inputRefs.current[index] = el;
                }
              }}
              maxLength={1}
              value={code[index] || ""}
              placeholder={getPlaceholder(index)}
              onChange={(e) => handleInputChange(e, index)}
              className="self-stretch px-3 py-3 rounded-xl shadow bg-background min-h-[59px] w-[46px] flex justify-center items-center text-center text-3xl font-medium text-grey-darker"
              inputMode="numeric"
            />
          ))}
        </div>

        <div className="flex z-0 gap-5 items-center justify-between mt-9 w-full">
          <Button variant="secondary" className="bg-grey-light/10 h-7 rounded-md" onClick={handleResend}>Reenviar</Button>
          <Button className="h-7 rounded-md" onClick={handleConfirm}>Confirmar</Button>
        </div>

        <button
          aria-label="Close"
          className="absolute top-5 right-5 z-0 px-3.5 w-8 h-8 rounded-sm bg-grey-light/10 bg-opacity-30 min-h-8 flex items-center justify-center flex-col"
          onClick={handleClose}
        >
          <X className="text-grey-dark" />
        </button>
      </article>
    </section>
  );
};

export default VerificationCodeInput;
