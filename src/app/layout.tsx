import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Dropdown from "./components/dropdown";
import LinkedinIcon from "./components/icons/linkedin";
import GithubIcon from "./components/icons/github";
import { StateProvider } from "./providers/state_provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tasky",
  description: "Tasky",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} h-screen flex justify-between flex-col gap-1`}
      >
        <StateProvider>
          <nav className="h-12 w-full bg-cyan-700 px-5 flex items-center justify-center fixed top-0">
            <section className="flex justify-between w-[67rem]">
              <aside className="items-center flex justify-start w-full">
                <h1 className="text-white font-bold">Tasky</h1>
              </aside>
              <aside
                className={`
                items-center justify-end flex w-full
            `}
              >
                <Dropdown />
              </aside>
            </section>
          </nav>
          <main className="my-10 mx-5 mt-[5rem]">{children}</main>
        </StateProvider>
        <footer
          className={`bg-sky-700 text-zinc-100 py-5 px-5 flex gap-5 flex-wrap items-center justify-center w-full
      `}
        >
          <p>Copyright © 2024 @black-redoc</p>
          <aside className="flex flex-wrap gap-1">
            <a href="https://www.linkedin.com/in/sebasb-dev/" target="_blank">
              <LinkedinIcon />
            </a>
            <a href="https://github.com/black-redoc" target="_blank">
              <GithubIcon />
            </a>
          </aside>
        </footer>
      </body>
    </html>
  );
}
