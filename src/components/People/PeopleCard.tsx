"use client";

import * as React from "react";
import { IconButton } from "../IconButton";
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
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback, AvatarImage } from "../ui/avatar";

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

const formSchema = z.object({
  role: z.string().min(2, "Deve ter pelo menos 2 caracteres").max(50, "Deve ter no máximo 50 caracteres"),
  description: z.string().min(2, "Deve ter pelo menos 2 caracteres").max(100, "Deve ter no máximo 100 caracteres"),
})

export interface People {
  id: number;
  image: string;
  role: string;
  description: string;
}

interface PeopleCardProps {
  person: People;
  highlightedQuery?: string;
  handleDelete(): void
  handleEdit(id: number, editedPerson: Omit<People, "id" | "image">): void
}

export const PeopleCard: React.FC<PeopleCardProps> = ({
  person,
  highlightedQuery = '',
  handleDelete,
  handleEdit
}) => {
  const { id, image, role, description } = person;
  function highlightText(text: string, query: string) {
    if (!query) return text;
    const index = text.toLowerCase().indexOf(query.toLowerCase());
    if (index === -1) return text;
    return (
      <>
        {text.substring(0, index)}
        <span className="py-1 rounded-sm bg-amber-100">
          {text.substring(index, index + query.length)}
        </span>
        {text.substring(index + query.length)}
      </>
    );
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role,
      description,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    handleEdit(id, values)
  }


  return (
    <article className="flex overflow-hidden flex-wrap items-center px-8 py-0.5 w-full rounded-2xl bg-zinc-50 max-w-[1128px] min-h-[85px] max-md:px-5 max-md:max-w-full">
      <div className="flex grow shrink gap-2.5 items-center self-stretch h-full min-w-60 w-[291px]">
        <Avatar className="object-contain shrink-0 self-stretch my-auto aspect-square w-[50px] ">
          <AvatarImage src={image} alt={role} />
          <AvatarFallback className="border-2 border-blue-500 rounded-full">{role[0].toUpperCase()}{role[1].toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex overflow-hidden flex-col justify-center self-stretch my-auto">
          <p className="text-sm text-ellipsis text-zinc-400">Nome</p>
          <p className={`mt-1.5 text-base text-gray-700 text-ellipsis`}>{highlightText(role, highlightedQuery)}</p>
        </div>
      </div>

      <div className="flex grow shrink items-center self-stretch pl-8 my-auto w-6">
        <div className="self-stretch my-auto w-0 min-h-[82px]" />
      </div>
      <div className="flex overflow-hidden grow shrink items-center self-stretch my-auto min-w-60 text-zinc-400 w-[339px]">
        <div className="overflow-hidden self-stretch my-auto text-ellipsis">
          {highlightText(description || "Descrição", highlightedQuery)}
        </div>
      </div>
      <div className="flex grow shrink items-center self-stretch pl-10 my-auto w-6">
        <div className="self-stretch my-auto w-0 min-h-[82px]" />
      </div>
      <div className="flex overflow-hidden grow shrink items-center self-stretch my-auto w-32">
        <div className="flex gap-5 items-center self-stretch my-auto">
          <div className="flex flex-col justify-center self-stretch my-auto">
            <p className="text-sm text-zinc-400">Dados adicionais</p>
            <p className="gap-2 self-start mt-1.5 text-base text-gray-700 text-ellipsis">
              02 Campos
            </p>
          </div>
        </div>
      </div>
      <div className="flex grow shrink items-center self-stretch pl-12 my-auto w-6">
        <div className="self-stretch my-auto w-0 min-h-[82px]" />
      </div>


      <div className="flex gap-4 items-center self-stretch">
        <AlertDialog>
          <AlertDialogTrigger >
            <IconButton
              icon="https://cdn.builder.io/api/v1/image/assets/a957b64922e04ac2a23d8b53cd42fbd2/235c68e085c292639ad63cec05d6bc5c64f1ebb8?placeholderIfAbsent=true"
            />
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Editar</AlertDialogTitle>
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
                      <AlertDialogAction disabled={!!form.formState.errors.description || !!form.formState.errors.role}>
                        <Button type="submit">Salvar</Button>
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </form>
                </Form>
              </AlertDialogDescription>
            </AlertDialogHeader>
          </AlertDialogContent>
        </AlertDialog>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <IconButton
              icon="https://cdn.builder.io/api/v1/image/assets/a957b64922e04ac2a23d8b53cd42fbd2/2ba48c6b6bd1f9471da003a43e28903bb279c41b?placeholderIfAbsent=true"
            />
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
              <AlertDialogDescription>
                Tem certeza de que deseja excluir esta pessoa?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>Excluir</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </article>
  );
};
