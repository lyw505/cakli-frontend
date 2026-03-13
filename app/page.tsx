"use client";

import { useState } from "react";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="min-h-screen bg-[#e8e4e0] flex items-center justify-center p-4 md:p-8">
            {/* Main Card Container */}
            <div className="w-full max-w-[1000px] bg-white rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
                
                {/* Left Side - Gradient Panel */}
                <div className="relative flex flex-col justify-between p-8 md:p-10 overflow-hidden">
                    {/* Gradient Background */}
                    <div 
                        className="absolute inset-0"
                        style={{
                            background: "linear-gradient(135deg, #f5e6d8 0%, #f0d4c0 20%, #e8b89a 40%, #e0a080 55%, #d4956e 65%, #f0c8a8 80%, #f5e0d0 100%)",
                        }}
                    />
                    {/* Warm Glow Overlay */}
                    <div 
                        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/3 w-[300px] h-[300px] rounded-full opacity-60"
                        style={{
                            background: "radial-gradient(circle, #e8946a 0%, #f0b890 40%, transparent 70%)",
                        }}
                    />
                    
                    {/* Logo */}
                    <div className="relative z-10">
                        <Image
                            src="/cakli-logo.svg"
                            alt="CakLi Logo"
                            width={120}
                            height={52}
                            priority
                        />
                    </div>

                    {/* Bottom Text */}
                    <div className="relative z-10 mt-auto">
                        <p className="text-sm text-slate-600/80 mb-2">Panel Admin</p>
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight">
                            Kelola seluruh
                            <br />
                            operasional logistik
                            <br />
                            dalam satu platform.
                        </h2>
                    </div>
                </div>

                {/* Right Side - Login Form */}
                <div className="flex flex-col justify-center p-8 md:p-12 lg:p-14">
                    {/* Decorative Star */}
                    <div className="mb-6">
                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14 0L16.5 11.5L28 14L16.5 16.5L14 28L11.5 16.5L0 14L11.5 11.5L14 0Z" fill="#e67e22" />
                        </svg>
                    </div>

                    {/* Heading */}
                    <div className="mb-6">
                        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
                            Masuk ke Admin Panel
                        </h1>
                        <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                            Masukkan kredensial Anda untuk mengakses
                            <br />
                            dashboard administrasi CakLi.
                        </p>
                    </div>

                    {/* Form */}
                    <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                        {/* Email Field */}
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-xs font-medium text-slate-600 uppercase tracking-wider">
                                Email
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="admin@cakli.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="h-11 rounded-xl border-slate-200 bg-slate-50/50 px-4 text-sm placeholder:text-slate-400 focus-visible:border-slate-400 focus-visible:ring-slate-200/50"
                            />
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-xs font-medium text-slate-600 uppercase tracking-wider">
                                Password
                            </Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="h-11 rounded-xl border-slate-200 bg-slate-50/50 px-4 pr-11 text-sm placeholder:text-slate-400 focus-visible:border-slate-400 focus-visible:ring-slate-200/50"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                >
                                    {showPassword ? (
                                        <EyeOff className="size-4" />
                                    ) : (
                                        <Eye className="size-4" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            className="w-full h-11 rounded-xl bg-slate-900 text-white hover:bg-slate-800 text-sm font-medium transition-all duration-200 shadow-lg shadow-slate-900/20"
                        >
                            Masuk
                        </Button>
                    </form>

                    {/* Footer Text */}
                    <p className="text-center text-xs text-slate-400 mt-8">
                        © 2024 CakLi Logistics System. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    );
}