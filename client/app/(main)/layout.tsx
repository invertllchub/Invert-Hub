

import dynamic from "next/dynamic";

const NavBar = dynamic(() => import("@/components/main/NavBar"), {
  loading: () => <p>Loading...</p>, 
});

const Footer = dynamic(() => import("@/components/main/Footer"), {
  loading: () => <p>Loading...</p>, 
});

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
