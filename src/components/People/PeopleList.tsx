"use client";

import * as React from "react";
import { People, PeopleCard } from "./PeopleCard";
import { SearchBar } from "../SearchBar";
import { Pagination } from "../Pagination";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

const formSchema = z.object({
  role: z.string().min(2, "Deve ter pelo menos 2 caracteres").max(50, "Deve ter no máximo 50 caracteres"),
  description: z.string().min(2, "Deve ter pelo menos 2 caracteres").max(100, "Deve ter no máximo 100 caracteres"),
})

export const mockPeople = [
  {
    id: 0,
    image: "https://cdn.builder.io/api/v1/image/assets/a957b64922e04ac2a23d8b53cd42fbd2/0516083e9b5feffaadb7f7f1401ab0d6b0a948a3?placeholderIfAbsent=true",
    role: "Contador responsável",
    description: "Responsável pela contabilidade geral da empresa."
  },
  {
    id: 1,
    image: "https://cdn.builder.io/api/v1/image/assets/a957b64922e04ac2a23d8b53cd42fbd2/39bcbc0ea0490b6d86086041833c1321ceed2497?placeholderIfAbsent=true",
    role: "Advogado responsável",
    description: "Responsável pelas questões jurídicas e legais."
  },
  {
    id: 2,
    image: "https://cdn.builder.io/api/v1/image/assets/a957b64922e04ac2a23d8b53cd42fbd2/dbe05d9a7d74d1748e6a2f86e45cf8e8e8b3448d?placeholderIfAbsent=true",
    role: "Partner",
    description: "Parceiros comerciais com a Lima Neto Advogados"
  },
  {
    id: 3,
    image: "https://cdn.builder.io/api/v1/image/assets/a957b64922e04ac2a23d8b53cd42fbd2/1599c2a65ca19f56a83bc9c881a5ad4e7f088fff?placeholderIfAbsent=true",
    role: "Advogado responsável",
    description: "Responsável pelas questões jurídicas e legais."
  },
  {
    id: 4,
    image: "https://cdn.builder.io/api/v1/image/assets/a957b64922e04ac2a23d8b53cd42fbd2/6740c25393c7cbd9cda2efd545626d2b149ebe27?placeholderIfAbsent=true",
    role: "Contador responsável",
    description: "Responsável pela contabilidade geral da empresa."
  },
  {
    id: 5,
    image: "https://cdn.builder.io/api/v1/image/assets/a957b64922e04ac2a23d8b53cd42fbd2/0e6275d731b6220176b3b4588142545ef8f3aaaf?placeholderIfAbsent=true",
    role: "Partner",
    description: "Parceiro estratégico de negócios."
  },
  {
    id: 6,
    image: "https://cdn.builder.io/api/v1/image/assets/a957b64922e04ac2a23d8b53cd42fbd2/080af3af3e7ad2d53e38d548265a541766ca3b13?placeholderIfAbsent=true",
    role: "Advogado responsável",
    description: "Responsável pelas questões jurídicas e legais."
  },
  {
    id: 7,
    image: "https://cdn.builder.io/api/v1/image/assets/a957b64922e04ac2a23d8b53cd42fbd2/24b6039bd60c7d315f4c0f8f688789b88ebd0223?placeholderIfAbsent=true",
    role: "Contador responsável",
    description: "Responsável pela contabilidade geral da empresa."
  },
];

export const PeopleList: React.FC = () => {
  const [filteredPeople, setFilteredPeople] = React.useState(mockPeople);
  const [highlightedQuery, setHighlightedQuery] = React.useState("");

  function handleDelete(id: number) {
    setFilteredPeople(prev => prev.filter(person => person.id !== id));
    toast.success("Pessoa excluida com sucesso");
  }

  function handleEdit(id: number, editedPerson: Omit<People, "id">) {
    setFilteredPeople(prev => prev.map(person => person.id === id ? { ...person, ...editedPerson } : person));
    toast.success("Pessoa editada com sucesso");
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role: "",
      description: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setFilteredPeople(prev => [...prev, { id: prev.length, image: "", ...values }])
    toast.success("Pessoa adicionada com sucesso");
  }

  return (
    <main className="flex flex-col flex-1 shrink  self-stretch px-6 py-8 basis-0 min-w-60 max-md:px-5 max-md:max-w-full max-w-[1128px]">
      <div className="flex flex-col gap-4 flex-1 w-full max-md:max-w-full">
        {/* HEADER */}
        <div className="flex flex-wrap gap-4  max-md:max-w-full">
          <h1 className="flex-1 shrink self-stretch h-full text-2xl font-semibold basis-0 min-w-60 text-zinc-800 max-md:max-w-full">
            Pessoas envolvidas
          </h1>
          <div className="flex flex-col w-[120px]">
            <AlertDialog>
              <AlertDialogTrigger >
                <Button className="flex overflow-hidden justify-center items-center w-full">
                  <div className="flex overflow-hidden justify-center items-center self-stretch pt-1 pb-1 my-auto w-3">
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets/a957b64922e04ac2a23d8b53cd42fbd2/3c2f9bde013612f331a1ae0618c657307acc7135?placeholderIfAbsent=true"
                      className="object-contain self-stretch my-auto w-3 aspect-[1.09] fill-zinc-50"
                      alt="Add"
                    />
                  </div>
                  <span className="self-stretch my-auto text-base font-bold text-center whitespace-nowrap w-[58px]">
                    Novo
                  </span>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Novo</AlertDialogTitle>
                  <AlertDialogDescription>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                          control={form.control}
                          name="role"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Role</FormLabel>
                              <FormControl>
                                <Input placeholder="role" {...field} />
                              </FormControl>
                              {/* <FormDescription>
                            This is your public display name.
                          </FormDescription> */}
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="description"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Descrição</FormLabel>
                              <FormControl>
                                <Textarea placeholder="Descrição" {...field} />
                              </FormControl>
                              {/* <FormDescription>
                            This is your public display name.
                          </FormDescription> */}
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction type="submit" disabled={!!form.formState.errors.description || !!form.formState.errors.role}>
                            Salvar
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </form>
                    </Form>
                  </AlertDialogDescription>
                </AlertDialogHeader>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        {/* SEARCHBAR */}
        <SearchBar setFilteredPeople={setFilteredPeople} setHighlightedQuery={setHighlightedQuery} />

        {/* LIST */}
        <div className="flex flex-1 flex-col gap-4 mt-4">
          {filteredPeople.length === 0 && (
            <p className="text-base text-zinc-600">Nenhum resultado encontrado</p>
          )}
          {filteredPeople.map((person, index) => (
            <PeopleCard
              key={index}
              person={person}
              highlightedQuery={highlightedQuery}
              handleEdit={handleEdit}
              handleDelete={() => handleDelete(person.id)}
            />
          ))}
        </div>
        <Pagination />
      </div>
    </main>
  );
};
