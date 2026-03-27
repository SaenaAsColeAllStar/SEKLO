"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { signOut, useSession } from "next-auth/react"
import { LayoutDashboard, Users, BookOpen, GraduationCap, DollarSign, WalletCards, ClipboardList, Activity, Vote, Settings, LogOut, Menu } from "lucide-react"

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string
    title: string
    icon: React.ElementType
  }[]
}

export function AppLayout({ children, userRole }: { children: React.ReactNode, userRole: string }) {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true)
  const { data: session } = useSession()

  const navItems = React.useMemo(() => {
    switch (userRole) {
      case "SUPER_ADMIN":
      case "ADMIN_TU":
        return [
          { href: "/admin", title: "Dashboard", icon: LayoutDashboard },
          { href: "/admin/siswa", title: "Data Siswa", icon: Users },
          { href: "/admin/guru", title: "Data Guru", icon: GraduationCap },
          { href: "/admin/keuangan", title: "Keuangan & SPP", icon: DollarSign },
          { href: "/admin/ppdb", title: "PPDB Online", icon: ClipboardList },
          { href: "/admin/inventaris", title: "Inventaris", icon: Activity },
          { href: "/admin/settings", title: "Pengaturan", icon: Settings },
        ]
      case "GURU":
        return [
          { href: "/guru", title: "Dashboard", icon: LayoutDashboard },
          { href: "/guru/jadwal", title: "Jadwal Mengajar", icon: BookOpen },
          { href: "/guru/absensi", title: "Absensi Siswa", icon: Activity },
          { href: "/guru/e-rapor", title: "E-Rapor & Nilai", icon: GraduationCap },
          { href: "/guru/e-learning", title: "E-Learning", icon: BookOpen },
          { href: "/guru/bk", title: "Pelanggaran (BK)", icon: ClipboardList },
        ]
      case "SISWA":
        return [
          { href: "/siswa", title: "Dashboard", icon: LayoutDashboard },
          { href: "/siswa/jadwal", title: "Jadwal Pelajaran", icon: BookOpen },
          { href: "/siswa/e-learning", title: "Tugas & Materi", icon: BookOpen },
          { href: "/siswa/nilai", title: "Nilai & Rapor", icon: GraduationCap },
          { href: "/siswa/ekskul", title: "Ekstrakurikuler", icon: Users },
          { href: "/siswa/e-voting", title: "E-Voting OSIS", icon: Vote },
          { href: "/siswa/tagihan", title: "Tagihan SPP", icon: WalletCards },
        ]
      case "ORANG_TUA":
        return [
          { href: "/orang-tua", title: "Dashboard", icon: LayoutDashboard },
          { href: "/orang-tua/absensi", title: "Tracking Kehadiran", icon: Activity },
          { href: "/orang-tua/nilai", title: "Nilai Anak", icon: GraduationCap },
          { href: "/orang-tua/tagihan", title: "Pembayaran SPP", icon: DollarSign },
          { href: "/orang-tua/pelanggaran", title: "Catatan BK", icon: ClipboardList },
        ]
      default:
        return []
    }
  }, [userRole])

  return (
    <div className="flex min-h-screen bg-gray-50/50">
      {/* Sidebar */}
      <aside className={cn("fixed inset-y-0 left-0 z-50 w-64 transform bg-white border-r transition-transform duration-200 ease-in-out md:relative md:translate-x-0", !isSidebarOpen && "-translate-x-full")}>
        <div className="flex h-16 shrink-0 items-center px-6 border-b">
          <GraduationCap className="h-6 w-6 text-primary mr-2" />
          <span className="text-lg font-bold tracking-tight">SMA Teknovo</span>
        </div>
        <ScrollArea className="h-[calc(100vh-4rem)] py-6 pl-4 pr-6">
          <SidebarNav items={navItems} />
        </ScrollArea>
      </aside>

      {/* Main Content */}
      <div className="flex w-0 flex-1 flex-col overflow-hidden">
        {/* Top Navbar */}
        <header className="flex h-16 shrink-0 items-center gap-x-4 border-b bg-white px-4 sm:gap-x-6 sm:px-6 lg:px-8">
          <button type="button" className="-m-2.5 p-2.5 text-gray-700 md:hidden" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <span className="sr-only">Open sidebar</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex flex-1"></div>
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/avatars/01.png" alt="@user" />
                      <AvatarFallback>{session?.user?.email?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{session?.user?.email}</p>
                      <p className="text-xs leading-none text-muted-foreground">{session?.user?.role}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profil</DropdownMenuItem>
                  <DropdownMenuItem>Pengaturan</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => signOut()}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6 px-4 sm:px-6 md:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const pathname = usePathname()

  return (
    <nav className={cn("flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1", className)} {...props}>
      {items.map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "justify-start flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground",
              isActive ? "bg-primary/10 text-primary font-semibold" : "text-muted-foreground"
            )}
          >
            <item.icon className={cn("h-4 w-4", isActive ? "text-primary" : "text-muted-foreground")} />
            {item.title}
          </Link>
        )
      })}
    </nav>
  )
}
