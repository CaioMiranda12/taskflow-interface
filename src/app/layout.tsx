import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { QueryProvider } from "@/contexts/QueryProvider";
import { Toaster } from "sonner";
import "./globals.css";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TaskFlow",
  description: "Gerenciamento de tarefas",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={geist.className}>
        <QueryProvider>
          <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <div className="flex flex-col flex-1 overflow-hidden">
              <Header />
              <main className="flex-1 overflow-y-auto bg-slate-50 p-4 md:p-6">
                {children}
              </main>
            </div>
          </div>
          <Toaster richColors position="bottom-right" />
        </QueryProvider>
      </body>
    </html>
  );
}