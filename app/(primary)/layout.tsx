import "../globals.css";
import Sidebar from "@/components/fixnav";
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
      </div>
    </div>
  );
}