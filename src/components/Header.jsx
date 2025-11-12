"use client";

import { useState } from "react";
import { Menu, X, Globe } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { languages } from "../utils/i18n";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const { currentLanguage, changeLanguage, t } = useLanguage();

  const navItems = [
    { label: t("nav.home"), href: "/" },
    { label: t("nav.portfolio"), href: "/portfolio" },
    { label: t("nav.news"), href: "/news" },
    { label: t("nav.about"), href: "/about" },
    { label: t("nav.contact"), href: "/contact" },
  ];

  return (
    <header className="relative py-6 px-6 md:px-12">
      {/* Цветная рисованная граница заголовка */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <svg
          className="w-full h-full"
          viewBox="0 0 1200 100"
          preserveAspectRatio="none"
        >
          <path
            d="M10,90 Q300,85 600,88 Q900,91 1190,87"
            stroke="url(#headerGradient)"
            strokeWidth="2"
            fill="none"
            className="hand-drawn-animation"
          />
          <defs>
            <linearGradient
              id="headerGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#A8D5BA" />
              <stop offset="50%" stopColor="#F0C5A9" />
              <stop offset="100%" stopColor="#D4C5F9" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto flex items-center justify-between relative">
        {/* Логотип */}
        <div className="flex items-center">
          <a href="/" className="relative group watercolor-hover">
            <div className="font-caveat text-2xl md:text-3xl font-bold text-[#2A2A2A] relative z-10">
              Oleh Kalchenko
            </div>
            {/* Цветная рисованная подчеркивание */}
            <svg
              className="absolute -bottom-1 left-0 w-full h-3 opacity-80 group-hover:opacity-100 transition-opacity duration-500"
              viewBox="0 0 200 12"
            >
              <path
                d="M2,8 Q50,4 100,7 Q150,10 198,6"
                stroke="#A8D5BA"
                strokeWidth="2.5"
                fill="none"
                className="hand-drawn-animation"
              />
            </svg>
            {/* Цветной фон при наведении */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#E8F4F8] to-[#F0E8D6] opacity-0 group-hover:opacity-60 transition-opacity duration-500 -z-10 rounded-lg transform scale-110"></div>
          </a>
        </div>

        <div className="flex items-center space-x-6">
          {/* Переключатель языков */}
          <div className="relative">
            <button
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className="relative watercolor-hover p-2 flex items-center space-x-2"
            >
              <Globe size={20} className="text-[#5A5A5A]" />
              <span className="font-kalam text-sm font-semibold text-[#2A2A2A] uppercase">
                {currentLanguage}
              </span>
              {/* Цветная рисованная рамка вокруг кнопки */}
              <svg
                className="absolute inset-0 w-full h-full opacity-70"
                viewBox="0 0 80 40"
              >
                <rect
                  x="4"
                  y="4"
                  width="72"
                  height="32"
                  stroke="#F0C5A9"
                  strokeWidth="1.5"
                  fill="none"
                  rx="6"
                  transform="rotate(1 40 20)"
                />
              </svg>
            </button>

            {/* Выпадающее меню языков */}
            {isLangMenuOpen && (
              <div className="absolute top-full right-0 mt-2 w-32 bg-[#FEFEFE] shadow-lg z-50">
                <div className="relative">
                  {/* Цветная рамка вокруг меню */}
                  <svg
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    viewBox="0 0 128 120"
                    preserveAspectRatio="none"
                  >
                    <rect
                      x="4"
                      y="4"
                      width="120"
                      height="112"
                      stroke="#D4C5F9"
                      strokeWidth="2"
                      fill="rgba(212, 197, 249, 0.05)"
                      rx="6"
                      transform="rotate(-1 64 60)"
                    />
                  </svg>

                  <div className="py-2">
                    {Object.entries(languages).map(([code, name]) => (
                      <button
                        key={code}
                        onClick={() => {
                          changeLanguage(code);
                          setIsLangMenuOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 font-kalam text-sm hover:bg-gradient-to-r hover:from-[#F0E8D6] hover:to-[#E8F4F8] transition-colors duration-300 ${
                          currentLanguage === code
                            ? "text-[#A8D5BA] font-semibold"
                            : "text-[#2A2A2A]"
                        }`}
                      >
                        {name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Десктопная навигация */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="relative group watercolor-hover font-kalam text-lg text-[#2A2A2A] hover:text-[#1A1A1A] transition-colors duration-300"
              >
                <span className="relative z-10">{item.label}</span>
                {/* Цветная рисованная окружность при наведении */}
                <svg
                  className="absolute -inset-2 w-auto h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  viewBox="0 0 80 32"
                >
                  <ellipse
                    cx="40"
                    cy="16"
                    rx="38"
                    ry="14"
                    stroke="#D4C5F9"
                    strokeWidth="2"
                    fill="rgba(212, 197, 249, 0.2)"
                    className="hand-drawn-animation"
                  />
                </svg>
              </a>
            ))}
          </nav>

          {/* Мобильная кнопка меню */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden relative watercolor-hover p-2"
          >
            <div className="relative z-10">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </div>
            {/* Цветная рисованная рамка вокруг кнопки */}
            <svg
              className="absolute inset-0 w-full h-full opacity-60"
              viewBox="0 0 40 40"
            >
              <rect
                x="4"
                y="4"
                width="32"
                height="32"
                stroke="#A8D5BA"
                strokeWidth="2"
                fill="none"
                rx="4"
                transform="rotate(1 20 20)"
              />
            </svg>
            {/* Цветной фон при наведении */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#F5E6D3] to-[#E8F4F8] opacity-0 hover:opacity-50 transition-opacity duration-500 rounded-lg"></div>
          </button>
        </div>
      </div>

      {/* Мобильное меню */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#FEFEFE] border-t border-[#E0E0E0] z-50">
          <div className="relative">
            {/* Цветная рисованная рамка вокруг мобильного меню */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 400 300"
              preserveAspectRatio="none"
            >
              <rect
                x="8"
                y="8"
                width="384"
                height="284"
                stroke="#F0C5A9"
                strokeWidth="2"
                fill="rgba(240, 197, 169, 0.05)"
                transform="rotate(-0.5 200 150)"
              />
            </svg>

            <nav className="flex flex-col py-6 px-6 space-y-4">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="relative group watercolor-hover font-kalam text-lg text-[#2A2A2A] py-2"
                >
                  <span className="relative z-10">{item.label}</span>
                  {/* Цветная рисованная линия под каждым элементом */}
                  <svg
                    className="absolute bottom-0 left-0 w-full h-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    viewBox="0 0 200 8"
                  >
                    <path
                      d="M5,4 Q100,2 195,4"
                      stroke="#A8D5BA"
                      strokeWidth="2"
                      fill="none"
                    />
                  </svg>
                  {/* Цветной фон при наведении */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#E8F4F8] to-[#F0E8D6] opacity-0 group-hover:opacity-30 transition-opacity duration-500 rounded-md"></div>
                </a>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
