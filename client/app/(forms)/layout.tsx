
import Image from "next/image";
import Link from "next/link";


export default function FormsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
        <div className={`w-full h-[100vh] flex items-center justify-center`}>
          <Link href="/" aria-label="Home">
              <div className="fixed top-0 left-0 z-40 w-[170px] h-[60px]">
                <Image
                  src="https://res.cloudinary.com/dntdescqh/image/upload/v1755689582/logo_dppoxr.png"
                  alt="Invert-Hub Logo"
                  priority
                  fill
                  className="object-contain origin-left cursor-pointer transition-transform duration-[800ms] hover:[transform:scale(1.3)]"
                />
              </div>
          </Link>
          {children}
        </div>
    );
}
