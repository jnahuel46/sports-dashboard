'use client';

import { useState } from 'react';
import { Menu, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { key: 'today', label: 'Hoy', href: '/', icon: '📅' },
    { key: 'live', label: 'En Vivo', href: '/live', icon: '🔴' },
    { key: 'standings', label: 'Posiciones', href: '/standings', icon: '📊' },
    { key: 'more', label: 'Más', href: '/more', icon: '⚡' }
  ];

  return (
    <nav className="w-full border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">MD</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold">MatchDay Central</h1>
              <p className="text-xs text-muted-foreground">
                Tu centro deportivo en tiempo real
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Button
                key={item.key}
                variant="ghost"
                size="sm"
                className="flex items-center gap-2"
                asChild
              >
                <a href={item.href}>
                  <span>{item.icon}</span>
                  {item.label}
                </a>
              </Button>
            ))}
          </div>

          {/* Language Switcher & Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Language Switcher */}
            <Button variant="outline" size="sm" className="hidden sm:flex">
              <Globe className="w-4 h-4" />
              ES
            </Button>

            {/* Mobile menu */}
            <div className="md:hidden">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80">
                  <div className="flex flex-col gap-4 mt-6">
                    <div className="text-center">
                      <h2 className="text-xl font-bold">MatchDay Central</h2>
                      <p className="text-sm text-muted-foreground">
                        Centro deportivo en tiempo real
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      {navItems.map((item) => (
                        <Button
                          key={item.key}
                          variant="ghost"
                          className="w-full justify-start gap-3"
                          onClick={() => setIsOpen(false)}
                          asChild
                        >
                          <a href={item.href}>
                            <span className="text-lg">{item.icon}</span>
                            {item.label}
                          </a>
                        </Button>
                      ))}
                    </div>

                    <div className="mt-6 pt-6 border-t">
                      <Button variant="outline" className="w-full">
                        <Globe className="w-4 h-4" />
                        Cambiar idioma
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>

        {/* Bottom Mobile Tab Bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-background border-t md:hidden z-50">
          <div className="flex items-center justify-around h-16">
            {navItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                className="flex flex-col items-center justify-center flex-1 h-full text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                <span className="text-lg mb-1">{item.icon}</span>
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;