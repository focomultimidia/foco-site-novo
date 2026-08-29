"use client";

import { Outlet } from "react-router-dom";
import { Header } from "./header";
import { Footer } from "./footer";
import { LeadCaptureProvider } from "@/features/shared/lib/lead-capture-context";

function MainLayout() {
  return (
    <LeadCaptureProvider>
      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1">
          <Outlet />
        </main>

        <Footer />
      </div>
    </LeadCaptureProvider>
  );
}

export { MainLayout };
