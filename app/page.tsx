"use client";

import Header from "@/components/layout/header/Header";
import Logo from "@/components/layout/Logo";
import MainContent from "@/components/layout/maincontent/MainContent";
import Sidebar from "@/components/layout/sidebar/Sidebar";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/signin");
    }
  }, [user, loading, router]);

  if (loading) return <p>Loading...</p>;
  return (
    <div className="grid min-h-screen grid-rows-[4.8rem_1fr] lg:grid-cols-[18.75rem_1fr] lg:[grid-template-areas:'sidebar_header''sidebar_main']">
      {/* ===================== Sidebar ==================== */}
      <aside
        className={`
        md:[grid-area:sidebar]
      bg-sidebar 
        fixed top-0 left-0
        h-screen w-75
        z-50
        border-r-accent
        border-r
        flex flex-col
        transform transition-transform duration-300
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
  `}
      >
        <div className="h-[4.8rem] flex items-start p-5 ">
          <Logo className="w-full" />
        </div>
        <div className="px-5 flex-1 min-h-0 ">
          <Sidebar />
        </div>
      </aside>

      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-[#131313]/70 z-40 lg:hidden"
        />
      )}

      {/* ===================== Header ===================== */}

      <header className="bg-sidebar border-b-accent border-b lg:[grid-area:header] w-full px-9 py-3.5 ">
        <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      </header>
      {/* ======================= Main ====================== */}
      <main className=" lg:[grid-area:main] lg:row-start-2 w-full h-screen overflow-y-auto">
        <MainContent />
      </main>
    </div>
  );
}
