"use client"

import * as React from "react"
import {
    Save,
    Percent,
    CarFront,
    UserCheck,
    Info,
    AlertTriangle,
    Plus,
    CheckCircle2,
    Clock
} from "lucide-react"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export default function PartnerPolicyManagement() {
    return (
        <div className="flex flex-col gap-6 p-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Kebijakan Mitra</h1>
                    <p className="text-muted-foreground">Kelola bagi hasil, standar kendaraan, dan persyaratan pengemudi secara global.</p>
                </div>
                <Button className="bg-cakli-orange hover:bg-cakli-orange/90">
                    <Save className="mr-2 h-4 w-4" /> Publikasi Kebijakan Baru
                </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* Revenue Share Card */}
                <Card className="overflow-hidden">
                    <div className="flex items-stretch h-full">
                        <div className="w-1.5 bg-cakli-orange rounded-full my-4 ml-4 shrink-0" />
                        <div className="flex-1">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium">Bagi Hasil Aplikasi</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center gap-4">
                                    <div className="flex-1">
                                        <div className="text-3xl font-bold">20%</div>
                                        <p className="text-xs text-muted-foreground">Komisi Cakli per Transaksi</p>
                                    </div>
                                    <div className="p-3 bg-orange-100 rounded-lg">
                                        <Percent className="size-6 text-cakli-orange" />
                                    </div>
                                </div>
                            </CardContent>
                        </div>
                    </div>
                </Card>

                {/* Vehicle Standard Card */}
                <Card className="overflow-hidden">
                    <div className="flex items-stretch h-full">
                        <div className="w-1.5 bg-cakli-orange rounded-full my-4 ml-4 shrink-0" />
                        <div className="flex-1">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium">Standar Armada EV</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center gap-4">
                                    <div className="flex-1">
                                        <div className="text-xl font-bold">V5.2</div>
                                        <p className="text-xs text-muted-foreground">Protokol Pemeliharaan Baterai</p>
                                    </div>
                                    <div className="p-3 bg-blue-100 rounded-lg">
                                        <CarFront className="size-6 text-blue-600" />
                                    </div>
                                </div>
                            </CardContent>
                        </div>
                    </div>
                </Card>

                {/* Driver Req Card */}
                <Card className="overflow-hidden">
                    <div className="flex items-stretch h-full">
                        <div className="w-1.5 bg-cakli-orange rounded-full my-4 ml-4 shrink-0" />
                        <div className="flex-1">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium">Rating Minimal Mitra</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center gap-4">
                                    <div className="flex-1">
                                        <div className="text-3xl font-bold">4.65</div>
                                        <p className="text-xs text-muted-foreground">Ambang Batas Suspend Otomatis</p>
                                    </div>
                                    <div className="p-3 bg-green-100 rounded-lg">
                                        <UserCheck className="size-6 text-green-600" />
                                    </div>
                                </div>
                            </CardContent>
                        </div>
                    </div>
                </Card>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                {/* Commission Configuration */}
                <Card>
                    <CardHeader>
                        <CardTitle>Konfigurasi Bagi Hasil & Insentif</CardTitle>
                        <CardDescription>Atur persentase keuntungan dan parameter bonus harian.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="grid gap-2">
                                <Label htmlFor="commission">Potongan Platform (%)</Label>
                                <Input id="commission" defaultValue="20" type="number" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="tax">Pajak Pertambahan Nilai (%)</Label>
                                <Input id="tax" defaultValue="11" type="number" />
                            </div>
                        </div>
                        <Separator />
                        <div className="space-y-4">
                            <h4 className="text-sm font-semibold flex items-center gap-2">
                                <CheckCircle2 className="size-4 text-green-600" /> Skema Insentif Harian
                            </h4>
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="grid gap-2">
                                    <Label className="text-xs">Bonus Target 10 Order (Rp)</Label>
                                    <Input defaultValue="25000" type="number" />
                                </div>
                                <div className="grid gap-2">
                                    <Label className="text-xs">Bonus Target 15 Order (Rp)</Label>
                                    <Input defaultValue="45000" type="number" />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Vehicle Requirements */}
                <Card>
                    <CardHeader>
                        <CardTitle>Spesifikasi & Standar Kendaraan</CardTitle>
                        <CardDescription>Aturan teknis untuk Becak Listrik yang diizinkan beroperasi.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="max-age">Usia Maksimal Kendaraan (Tahun)</Label>
                                <Input id="max-age" defaultValue="5" type="number" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="battery-cap">Kapasitas Baterai Minimal (Ah)</Label>
                                <Input id="battery-cap" defaultValue="60" type="number" />
                            </div>
                        </div>
                        <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200">
                            <h4 className="text-sm font-bold text-blue-900 border-b border-blue-200 pb-2 mb-2">Standard Operasional Kelistrikan</h4>
                            <ul className="text-xs space-y-2 text-blue-800 list-disc pl-4">
                                <li>Wajib melakukan pemeriksaan daya setiap 30 hari.</li>
                                <li>Modifikasi motor penggerak tanpa izin akan mengakibatkan pemutusan kontrak.</li>
                                <li>Gps Tracker wajib dalam kondisi aktif 24/7.</li>
                            </ul>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Driver Requirements Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Persyaratan Dokumen & Onboarding</CardTitle>
                    <CardDescription>Daftar dokumen wajib untuk verifikasi akun mitra pengemudi.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Dokumen</TableHead>
                                <TableHead>Jenis Verifikasi</TableHead>
                                <TableHead>Masa Berlaku</TableHead>
                                <TableHead>Wajib</TableHead>
                                <TableHead className="text-right">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {[
                                { name: "KTP (Kartu Tanda Penduduk)", type: "OCR & Pencocokan", expiry: "Seumur Hidup", required: "Ya" },
                                { name: "SIM (Surat Izin Mengemudi)", type: "Peninjauan Manual", expiry: "5 Tahun", required: "Ya" },
                                { name: "SKCK (Surat Keterangan Catatan Kepolisian)", type: "Peninjauan Manual", expiry: "6 Bulan", required: "Ya" },
                                { name: "Sertifikasi Safety Driving Cakli", type: "Sertifikat Digital", expiry: "2 Tahun", required: "Ya" },
                            ].map((row) => (
                                <TableRow key={row.name}>
                                    <TableCell className="font-medium text-sm">{row.name}</TableCell>
                                    <TableCell>
                                        <Badge variant="secondary" className="text-[10px]">{row.type}</Badge>
                                    </TableCell>
                                    <TableCell className="text-sm">{row.expiry}</TableCell>
                                    <TableCell>
                                        <Badge className="bg-green-600">WAJIB</Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="sm">Ubah Aturan</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <div className="flex items-start gap-4 p-4 rounded-lg bg-orange-50 dark:bg-orange-950/20 border border-orange-200">
                <AlertTriangle className="size-5 text-cakli-orange mt-0.5" />
                <div>
                    <p className="text-sm font-bold text-orange-900 dark:text-orange-200 uppercase tracking-wider">Peringatan Kebijakan</p>
                    <p className="text-xs text-orange-800 dark:text-orange-300">
                        Perubahan pada bagi hasil akan berdampak langsung pada penghasilan harian ribuan mitra. Harap lakukan sosialisasi 3x24 jam sebelum kebijakan baru diterapkan secara otomatis oleh sistem.
                    </p>
                </div>
            </div>
        </div>
    )
}
