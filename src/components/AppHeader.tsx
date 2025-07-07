'use client';

import Image from "next/image";
import { routes } from "@/const";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";

export default function AppHeader() {
    const pathname = usePathname();

    return (
        <header className="flex items-center border-b border-white/10 py-2">
            <Link href={'/app/dashboard'}>
                <Image
                    src="/assets/logo.png"
                    alt="Expenses Tracker Logo"
                    width={25}
                    height={25}
                />
            </Link>

            <nav className="ml-auto">
                <ul className="flex gap-2 text-xs">
                    {routes.map((route) => (
                        <li key={route.path}>
                            <Link
                                href={route.path}
                                className={`px-2 py-1 hover:text-white transition text-white/100 rounded-sm ${route.path === pathname ? 'bg-black/10' : ''}`}
                            >
                                {route.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            <LogoutLink className="text-white/70 text-[12px] ml-[10px]">
                Logout
            </LogoutLink>
        </header>
    )
}
