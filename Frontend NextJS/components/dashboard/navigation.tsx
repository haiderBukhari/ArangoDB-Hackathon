import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { LayoutDashboard, Camera, User2, Settings, Menu, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { successToast } from "@/helpers/toasts";
import Image from "next/image";

const navItems = [
  { title: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { title: "Chat Bot", icon: Camera, href: "/dashboard/chat" },
  { title: "Data Visualization", icon: User2, href: "/dashboard/visualization" },
  { title: "Arangodb Graph Visualization", icon: User2, href: "/dashboard/graphs" },
  { title: "Documentation", icon: Settings, href: "/dashboard/documentation" },
];

export function Navigation() {
  const [open, setOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1024) {
        setIsMobile(true);  // Detect if the screen size is mobile
      } else {
        setIsMobile(false); // Otherwise it's a larger screen
      }
    };

    handleResize(); // Run on initial load
    window.addEventListener("resize", handleResize); // Run on screen resize

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const NavContent = () => (
    <div className="flex h-full flex-col min-h-screen p-4 w-[250px]">
      <div className="px-6 py-3 flex justify-center">
        <Image src="/arangodb.png" height={150} width={100} alt="mathpi logo" />
      </div>
      <nav className="flex-1 space-y-2 mt-5">
        {navItems.map((item) => (
          <div
            key={item.title}
            onClick={() => {
              setOpen(false);
              router.push(item.href);
            }}
            className={cn(
              "flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-300 hover:bg-purple-100 hover:text-purple-800 cursor-pointer",
              item.href === "/dashboard/chat/" && pathname.startsWith("/dashboard/chat/")
                ? "bg-purple-200 text-purple-900" 
                : pathname === item.href
                ? "bg-purple-200 text-purple-900"
                : ""
            )}
          >
            <p className="text-lg">{item.title}</p>
          </div>
        ))}
        <div
          onClick={() => {
            router.push("/");
            successToast("Successfully Moved to Home screen");
          }}
          className="flex items-center gap-4 px-4 py-3 rounded-lg text-muted-foreground transition-all duration-300 hover:bg-red-100 hover:text-red-600 cursor-pointer"
        >
          <LogOut className="h-5 w-5 text-red-500" />
          <p className="text-lg">Home</p>
        </div>
      </nav>
    </div>
  );

  return (
    <>
      {/* Mobile Navigation */}
      <div className="lg:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <NavContent />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Navigation */}
      <motion.div
        initial={{ width: 250, opacity: 1 }}
        animate={{
          width: isHovered || !isMobile ? 250 : 0, // Show sidebar on hover or on larger screens
          opacity: isHovered || !isMobile ? 1 : 0,  // Adjust opacity based on hover or screen size
          transition: { duration: 0.3, ease: "easeInOut" },
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="hidden lg:block border-r bg-white shadow-lg h-screen fixed left-0 top-0 transition-all overflow-hidden relative"
      >
        <NavContent />
      </motion.div>
    </>
  );
}
