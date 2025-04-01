import "../globals.css";
import Sidebar from "@/components/fixnav";
import { Toaster } from "@/components/ui/toaster"
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div>
        <Sidebar />
        <main className="">{children}</main>
        <Toaster />
      </div>
    </div>
  );
}