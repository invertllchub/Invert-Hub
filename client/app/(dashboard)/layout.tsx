
import NavBar from "@/components/dashboard/Navbar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
      <div >
        <NavBar />
        {children}
      </div>
    );
}
