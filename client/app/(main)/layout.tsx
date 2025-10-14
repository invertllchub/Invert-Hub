
import NavBar from "@/components/main/NavBar";
import Footer from "@/components/main/Footer";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div>
        <NavBar />
        {children}
        <div className="mt-20">
          <Footer />
        </div>
      </div>
  );
}
