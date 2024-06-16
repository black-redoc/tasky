"use client";
import TryitForm from "../components/tryit-form";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <section className="flex justify-center flex-col mt-1 xl:mt-28 md:mt-8">
        <aside className="flex justify-center flex-col sm:flex-col md:flex-col lg:flex-row gap-4 items-center w-full px-5">
          <h1 className="text-3xl md:text-4xl text-pretty tracking-wide min-w-[22rem] max-w-[26rem] px-6">
            <span className="text-cyan-700"> Tasky </span>
            is ispired in
            <span className="text-sky-400"> Project Management, </span>
            but lightweight. Let&apos;s manage your tasks easily.
          </h1>
          <Image
            className="object-cover w-[25rem] sm:w-[30rem] md:w-[40rem] xl:w-[4arem]"
            src="/treyo_img.webp"
            alt="tasky img"
            width={200}
            height={200}
          />
        </aside>
      </section>
      <section
        className={`
        flex justify-center flex-col items-center
        w-full lg:mt-[10rem] xl:mt-[5rem] md:mt-[3rem] gap-5 mt-6
        `}
      >
        <TryitForm />
      </section>
    </>
  );
}
