"use client";

import { Outlet } from "react-router-dom";
import { Header } from "./header";
import { Footer } from "./footer";

function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-16 lg:pt-20">
        <Outlet />
      </main>
      
      <Footer />
    </div>
  );
}

export { MainLayout };
