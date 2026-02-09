import Link from "next/link";
import {
    Terminal,
    BarChart3,
    Settings2,
    ArrowRight,
    Package,
    ShieldCheck,
    Activity
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default function Page() {
    const adminSections = [
        {
            title: "Operation Admin",
            description: "Real-time delivery management, driver status, and complaint handling.",
            url: "/operation-admin",
            icon: <Activity className="size-8 text-blue-600" />,
            tag: "Operational",
            color: "bg-blue-50 dark:bg-blue-900/10",
        },
        {
            title: "Reporting Admin",
            description: "Comprehensive analytics, financial reports, and transactional history.",
            url: "/reporting-admin",
            icon: <BarChart3 className="size-8 text-orange-600" />,
            tag: "Analytics",
            color: "bg-orange-50 dark:bg-orange-900/10",
        },
        {
            title: "Master Admin",
            description: "Global system configuration, tariff control, and role management.",
            url: "/master-admin",
            icon: <Settings2 className="size-8 text-purple-600" />,
            tag: "System Control",
            color: "bg-purple-50 dark:bg-purple-900/10",
        },
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 md:p-12">
            <div className="max-w-5xl w-full space-y-12">
                <header className="text-center space-y-4">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <div className="bg-orange-600 text-white p-2 rounded-xl">
                            <Package className="size-8" />
                        </div>
                        <h1 className="text-4xl font-extrabold tracking-tight">Cakli Admin Central</h1>
                    </div>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Select an administrative gateway to manage the Cakli logistics ecosystem.
                    </p>
                </header>

                <div className="grid gap-6 md:grid-cols-3">
                    {adminSections.map((section) => (
                        <Card key={section.title} className="group relative overflow-hidden hover:shadow-xl transition-all duration-300 border-2 hover:border-orange-500/20">
                            <div className={`h-2 ${section.color}`} />
                            <CardHeader>
                                <div className="mb-4 flex items-center justify-between">
                                    <div className={`p-3 rounded-2xl ${section.color}`}>
                                        {section.icon}
                                    </div>
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">
                                        {section.tag}
                                    </span>
                                </div>
                                <CardTitle className="text-2xl group-hover:text-orange-600 transition-colors">
                                    {section.title}
                                </CardTitle>
                                <CardDescription className="text-sm leading-relaxed min-h-[48px]">
                                    {section.description}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Link href={section.url} passHref>
                                    <Button className="w-full group/btn" variant="outline">
                                        Access Portal
                                        <ArrowRight className="size-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <footer className="pt-12 text-center">
                    <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <ShieldCheck className="size-4" /> Secure Admin Access
                        </div>
                        <div className="w-1.5 h-1.5 bg-slate-300 rounded-full" />
                        <p>© 2024 Cakli Logistics System</p>
                    </div>
                </footer>
            </div>
        </div>
    );
}