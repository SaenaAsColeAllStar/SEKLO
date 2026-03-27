import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, WalletCards, Bell } from "lucide-react"

export default function OrangTuaDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Portal Orang Tua</h1>
        <p className="text-muted-foreground">Pusat informasi anak Anda, terpadu dan real-time.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Status Absensi (Hari Ini)</CardTitle>
            <Activity className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">HADIR</div>
            <p className="text-xs text-muted-foreground">Masuk pukul 06:45 via Gerbang Utama</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Status SPP (Bulan Ini)</CardTitle>
            <WalletCards className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">UNPAID</div>
            <p className="text-xs text-muted-foreground">Jatuh tempo 15 September - Rp 500,000</p>
            <button className="mt-2 text-xs bg-primary text-white px-3 py-1 rounded-md">Bayar Sekarang via VA</button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Notifikasi Penting</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1 Pesan BK</div>
            <p className="text-xs text-muted-foreground">Undangan pertemuan wali kelas besok</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
