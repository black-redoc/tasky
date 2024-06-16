import Image from "next/image";

export default function Page404NotFound() {
  return (
    <section className="flex flex-col justify-center items-center h-full w-full translate-y-[60%] md:translate-y-[30%] lg:translate-y-[20%]">
      <article
      className={`
        xl:h-[27.5rem]
        lg:h-[27.5rem]
        md:h-[20.6rem]
        h-[12.5rem]
      `}>
        <Image
          src="/dog.jpg"
          alt="404 Not Found"
          width={400}
          height={300}
          className="object-cover rounded md:w-[660px] lg:w-[880px]"
        />
      </article>
      <h1 className="text-5xl md:text-8xl lg:text-9xl font-bold text-center">
        404 Not Found
      </h1>
    </section>
  );
}
