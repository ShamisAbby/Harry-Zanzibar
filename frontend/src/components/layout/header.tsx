"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, Waves } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { mainNav, siteConfig } from "@/config/site";
import { SafariRedirectLink } from "@/components/layout/safari-redirect-link";
import { cn } from "@/lib/utils";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/90 shadow-sm backdrop-blur-md"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-heading text-xl font-semibold">
          <Waves
            className={cn(
              "size-6 transition-colors",
              isScrolled ? "text-primary" : "text-white"
            )}
          />
          <span className={cn(isScrolled ? "text-foreground" : "text-white")}>
            {siteConfig.shortName}
          </span>
        </Link>

        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            {mainNav.map((item) => (
              <NavigationMenuItem key={item.href}>
                {"children" in item && item.children ? (
                  <>
                    <NavigationMenuTrigger
                      className={cn(
                        "bg-transparent",
                        !isScrolled && "text-white hover:text-white data-[state=open]:text-white"
                      )}
                    >
                      {item.label}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-56 gap-1 p-2">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <NavigationMenuLink render={<Link href={child.href} />}>
                              {child.label}
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </>
                ) : "external" in item && item.external ? (
                  <SafariRedirectLink
                    className={cn(
                      "inline-flex h-9 items-center px-4 text-sm font-medium transition-colors",
                      isScrolled
                        ? "text-foreground/80 hover:text-primary"
                        : "text-white/90 hover:text-white"
                    )}
                  >
                    {item.label}
                  </SafariRedirectLink>
                ) : (
                  <NavigationMenuLink
                    render={<Link href={item.href} />}
                    className={cn(
                      "inline-flex h-9 items-center px-4 text-sm font-medium transition-colors",
                      isScrolled
                        ? "text-foreground/80 hover:text-primary"
                        : "text-white/90 hover:text-white"
                    )}
                  >
                    {item.label}
                  </NavigationMenuLink>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="hidden lg:block">
          <Button render={<Link href="/sansibar-touren" />} size="lg" className="rounded-full px-6">
            Touren entdecken
          </Button>
        </div>

        <Sheet>
          <SheetTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                aria-label="Menü öffnen"
                className={cn("lg:hidden", !isScrolled && "text-white hover:bg-white/10 hover:text-white")}
              />
            }
          >
            <Menu className="size-5" />
          </SheetTrigger>
          <SheetContent side="right" className="w-80">
            <SheetHeader>
              <SheetTitle className="font-heading">{siteConfig.shortName}</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-1 px-4">
              {mainNav.map((item) =>
                "external" in item && item.external ? (
                  <SafariRedirectLink
                    key={item.href}
                    className="rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
                  >
                    {item.label}
                  </SafariRedirectLink>
                ) : (
                  <div key={item.href}>
                    <Link
                      href={item.href}
                      className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
                    >
                      {item.label}
                    </Link>
                    {"children" in item && item.children && (
                      <div className="ml-3 flex flex-col border-l pl-3">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )
              )}
              <Button render={<Link href="/sansibar-touren" />} size="lg" className="mt-4 rounded-full">
                Touren entdecken
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
