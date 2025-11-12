"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import Header from "../../components/Header";
import { Send, Mail, MessageCircle, User, FileText } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { t } = useLanguage();

  const contactMutation = useMutation({
    mutationFn: async (data) => {
      const response = await fetch("/api/contact/telegram", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to send message");
      }

      return response.json();
    },
    onSuccess: () => {
      setIsSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    contactMutation.mutate(formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-[#FEFEFE]">
      <Header />

      {/* Заголовок страницы */}
      <section className="relative py-16 px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative inline-block">
            <h1 className="font-caveat text-5xl md:text-7xl font-bold text-[#2A2A2A] mb-4">
              {t("contact.title")}
            </h1>
            {/* Цветное рисованное подчеркивание */}
            <svg
              className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4/5 h-6"
              viewBox="0 0 300 24"
            >
              <path
                d="M5,12 Q75,18 150,12 Q225,6 295,15"
                stroke="url(#contactGradient)"
                strokeWidth="4"
                fill="none"
                className="hand-drawn-animation"
              />
              <defs>
                <linearGradient
                  id="contactGradient"
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

          <p className="font-kalam text-lg md:text-xl text-[#5A5A5A] mt-8 max-w-2xl mx-auto">
            {t("contact.subtitle")}
          </p>
        </div>

        {/* Декоративные элементы */}
        <div className="absolute top-20 right-16 opacity-20">
          <svg width="100" height="80" viewBox="0 0 100 80">
            <path
              d="M10,40 Q30,10 50,40 Q70,70 90,40"
              stroke="#F0C5A9"
              strokeWidth="2.5"
              fill="none"
              className="hand-drawn-animation"
            />
          </svg>
        </div>
      </section>

      {/* Секция контактов */}
      <section className="py-12 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Контактная информация */}
            <div className="lg:col-span-1 space-y-8">
              <div className="relative">
                <h2 className="font-caveat text-3xl font-bold text-[#2A2A2A] mb-6">
                  {t("contact.letsTalk")}
                </h2>

                {/* Цветная рисованная декоративная коробка */}
                <div className="relative p-6 space-y-6">
                  <svg
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    viewBox="0 0 300 250"
                    preserveAspectRatio="none"
                  >
                    <rect
                      x="8"
                      y="8"
                      width="284"
                      height="234"
                      stroke="url(#infoGradient)"
                      strokeWidth="2.5"
                      fill="rgba(168, 213, 186, 0.05)"
                      rx="6"
                      transform="rotate(1 150 125)"
                      className="hand-drawn-animation"
                    />
                    <defs>
                      <linearGradient
                        id="infoGradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor="#A8D5BA" />
                        <stop offset="100%" stopColor="#D4C5F9" />
                      </linearGradient>
                    </defs>
                  </svg>

                  <div className="relative space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <Mail size={24} className="text-[#5A5A5A]" />
                        {/* Цветная рисованная окружность вокруг иконки */}
                        <svg
                          className="absolute -inset-2 w-8 h-8"
                          viewBox="0 0 32 32"
                        >
                          <circle
                            cx="16"
                            cy="16"
                            r="14"
                            stroke="#A8D5BA"
                            strokeWidth="2"
                            fill="none"
                            transform="rotate(10 16 16)"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="font-kalam text-lg text-[#2A2A2A]">
                          oleh@webstudio.de
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <MessageCircle size={24} className="text-[#5A5A5A]" />
                        {/* Цветная рисованная рамка вокруг иконки */}
                        <svg
                          className="absolute -inset-2 w-8 h-8"
                          viewBox="0 0 32 32"
                        >
                          <rect
                            x="4"
                            y="4"
                            width="24"
                            height="24"
                            stroke="#F0C5A9"
                            strokeWidth="2"
                            fill="none"
                            rx="4"
                            transform="rotate(-5 16 16)"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="font-kalam text-lg text-[#2A2A2A]">
                          @oleh_kalchenko
                        </p>
                      </div>
                    </div>

                    <div className="pt-4">
                      <p className="font-kalam text-base text-[#7A7A7A] leading-relaxed">
                        {t("contact.responseTime")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Контактная форма */}
            <div className="lg:col-span-2">
              {isSubmitted ? (
                <div className="relative text-center py-16">
                  {/* Сообщение об успехе с цветной рисованной рамкой */}
                  <svg
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    viewBox="0 0 600 300"
                    preserveAspectRatio="none"
                  >
                    <rect
                      x="20"
                      y="20"
                      width="560"
                      height="260"
                      stroke="url(#successGradient)"
                      strokeWidth="3"
                      fill="rgba(168, 213, 186, 0.15)"
                      rx="8"
                      transform="rotate(-0.5 300 150)"
                      className="hand-drawn-animation"
                    />
                    <defs>
                      <linearGradient
                        id="successGradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor="#A8D5BA" />
                        <stop offset="100%" stopColor="#D4C5F9" />
                      </linearGradient>
                    </defs>
                  </svg>

                  <div className="relative space-y-4">
                    <div className="relative inline-block mb-4">
                      <Send size={48} className="text-[#A8D5BA] mx-auto" />
                      {/* Цветная рисованная окружность вокруг иконки */}
                      <svg
                        className="absolute -inset-4 w-16 h-16"
                        viewBox="0 0 64 64"
                      >
                        <circle
                          cx="32"
                          cy="32"
                          r="28"
                          stroke="#A8D5BA"
                          strokeWidth="2.5"
                          fill="none"
                          className="hand-drawn-animation"
                        />
                      </svg>
                    </div>

                    <h3 className="font-caveat text-3xl font-bold text-[#2A2A2A]">
                      {t("contact.success.title")}
                    </h3>
                    <p className="font-kalam text-lg text-[#5A5A5A] max-w-md mx-auto">
                      {t("contact.success.description")}
                    </p>

                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="mt-6 relative group watercolor-hover"
                    >
                      <svg
                        className="absolute inset-0 w-full h-full"
                        viewBox="0 0 180 50"
                        preserveAspectRatio="none"
                      >
                        <rect
                          x="4"
                          y="4"
                          width="172"
                          height="42"
                          stroke="url(#newMessageGradient)"
                          strokeWidth="2.5"
                          fill="none"
                          rx="4"
                          transform="rotate(0.5 90 25)"
                        />
                        <defs>
                          <linearGradient
                            id="newMessageGradient"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="0%"
                          >
                            <stop offset="0%" stopColor="#A8D5BA" />
                            <stop offset="100%" stopColor="#F0C5A9" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="absolute inset-0 bg-gradient-to-r from-[#E8F4F8] to-[#F0E8D6] opacity-0 group-hover:opacity-60 transition-opacity duration-500 rounded-lg"></div>
                      <div className="relative z-10 px-6 py-3 font-kalam text-base font-semibold text-[#2A2A2A]">
                        {t("contact.form.newMessage")}
                      </div>
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="relative space-y-6">
                  {/* Цветная рисованная граница формы */}
                  <svg
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    viewBox="0 0 600 500"
                    preserveAspectRatio="none"
                  >
                    <rect
                      x="12"
                      y="12"
                      width="576"
                      height="476"
                      stroke="url(#formGradient)"
                      strokeWidth="2.5"
                      fill="none"
                      rx="8"
                      transform="rotate(-0.5 300 250)"
                      className="hand-drawn-animation"
                    />
                    <defs>
                      <linearGradient
                        id="formGradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor="#D4C5F9" />
                        <stop offset="50%" stopColor="#F0C5A9" />
                        <stop offset="100%" stopColor="#A8D5BA" />
                      </linearGradient>
                    </defs>
                  </svg>

                  <div className="relative p-8 space-y-6">
                    {/* Поле имени */}
                    <div className="relative">
                      <label className="flex items-center space-x-2 font-caveat text-xl text-[#2A2A2A] mb-3">
                        <User size={20} />
                        <span>{t("contact.form.name")} *</span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 font-kalam text-lg text-[#2A2A2A] bg-transparent border-0 focus:outline-none"
                          placeholder={t("contact.form.namePlaceholder")}
                        />
                        {/* Цветная рисованная граница поля ввода */}
                        <svg
                          className="absolute inset-0 w-full h-full pointer-events-none"
                          viewBox="0 0 400 50"
                          preserveAspectRatio="none"
                        >
                          <rect
                            x="4"
                            y="4"
                            width="392"
                            height="42"
                            stroke="#A8D5BA"
                            strokeWidth="2"
                            fill="none"
                            rx="4"
                            transform="rotate(0.3 200 25)"
                          />
                        </svg>
                      </div>
                    </div>

                    {/* Поле email */}
                    <div className="relative">
                      <label className="flex items-center space-x-2 font-caveat text-xl text-[#2A2A2A] mb-3">
                        <Mail size={20} />
                        <span>{t("contact.form.email")} *</span>
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 font-kalam text-lg text-[#2A2A2A] bg-transparent border-0 focus:outline-none"
                          placeholder={t("contact.form.emailPlaceholder")}
                        />
                        <svg
                          className="absolute inset-0 w-full h-full pointer-events-none"
                          viewBox="0 0 400 50"
                          preserveAspectRatio="none"
                        >
                          <rect
                            x="4"
                            y="4"
                            width="392"
                            height="42"
                            stroke="#F0C5A9"
                            strokeWidth="2"
                            fill="none"
                            rx="4"
                            transform="rotate(-0.3 200 25)"
                          />
                        </svg>
                      </div>
                    </div>

                    {/* Поле темы */}
                    <div className="relative">
                      <label className="flex items-center space-x-2 font-caveat text-xl text-[#2A2A2A] mb-3">
                        <FileText size={20} />
                        <span>{t("contact.form.subject")}</span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          className="w-full px-4 py-3 font-kalam text-lg text-[#2A2A2A] bg-transparent border-0 focus:outline-none"
                          placeholder={t("contact.form.subjectPlaceholder")}
                        />
                        <svg
                          className="absolute inset-0 w-full h-full pointer-events-none"
                          viewBox="0 0 400 50"
                          preserveAspectRatio="none"
                        >
                          <rect
                            x="4"
                            y="4"
                            width="392"
                            height="42"
                            stroke="#D4C5F9"
                            strokeWidth="2"
                            fill="none"
                            rx="4"
                            transform="rotate(0.4 200 25)"
                          />
                        </svg>
                      </div>
                    </div>

                    {/* Поле сообщения */}
                    <div className="relative">
                      <label className="flex items-center space-x-2 font-caveat text-xl text-[#2A2A2A] mb-3">
                        <MessageCircle size={20} />
                        <span>{t("contact.form.message")} *</span>
                      </label>
                      <div className="relative">
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows="6"
                          className="w-full px-4 py-3 font-kalam text-lg text-[#2A2A2A] bg-transparent border-0 focus:outline-none resize-none"
                          placeholder={t("contact.form.messagePlaceholder")}
                        />
                        <svg
                          className="absolute inset-0 w-full h-full pointer-events-none"
                          viewBox="0 0 400 150"
                          preserveAspectRatio="none"
                        >
                          <rect
                            x="4"
                            y="4"
                            width="392"
                            height="142"
                            stroke="url(#messageGradient)"
                            strokeWidth="2"
                            fill="none"
                            rx="4"
                            transform="rotate(-0.2 200 75)"
                          />
                          <defs>
                            <linearGradient
                              id="messageGradient"
                              x1="0%"
                              y1="0%"
                              x2="0%"
                              y2="100%"
                            >
                              <stop offset="0%" stopColor="#A8D5BA" />
                              <stop offset="100%" stopColor="#D4C5F9" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </div>
                    </div>

                    {/* Кнопка отправки */}
                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={contactMutation.isPending}
                        className="relative group watercolor-hover w-full md:w-auto"
                      >
                        {/* Цветная рисованная граница кнопки */}
                        <svg
                          className="absolute inset-0 w-full h-full"
                          viewBox="0 0 220 60"
                          preserveAspectRatio="none"
                        >
                          <rect
                            x="4"
                            y="4"
                            width="212"
                            height="52"
                            stroke="url(#submitGradient)"
                            strokeWidth="2.5"
                            fill="none"
                            rx="6"
                            transform="rotate(-0.5 110 30)"
                          />
                          <defs>
                            <linearGradient
                              id="submitGradient"
                              x1="0%"
                              y1="0%"
                              x2="100%"
                              y2="100%"
                            >
                              <stop offset="0%" stopColor="#A8D5BA" />
                              <stop offset="50%" stopColor="#F0C5A9" />
                              <stop offset="100%" stopColor="#D4C5F9" />
                            </linearGradient>
                          </defs>
                        </svg>

                        {/* Цветной фон при наведении */}
                        <div className="absolute inset-0 bg-gradient-to-r from-[#E8F4F8] via-[#F0E8D6] to-[#F5E6F8] opacity-0 group-hover:opacity-70 transition-opacity duration-600 rounded-lg transform rotate-1"></div>

                        <div className="relative z-10 flex items-center justify-center px-8 py-4 font-kalam text-lg font-semibold text-[#2A2A2A]">
                          {contactMutation.isPending ? (
                            <>
                              <div className="w-5 h-5 border-2 border-[#2A2A2A] border-t-transparent rounded-full animate-spin mr-3"></div>
                              {t("contact.form.sending")}
                            </>
                          ) : (
                            <>
                              <Send size={20} className="mr-3" />
                              {t("contact.form.sendButton")}
                            </>
                          )}
                        </div>
                      </button>
                    </div>

                    {/* Сообщение об ошибке */}
                    {contactMutation.isError && (
                      <div className="relative mt-4 p-4 text-center">
                        <svg
                          className="absolute inset-0 w-full h-full pointer-events-none"
                          viewBox="0 0 400 60"
                          preserveAspectRatio="none"
                        >
                          <rect
                            x="4"
                            y="4"
                            width="392"
                            height="52"
                            stroke="#FF6B6B"
                            strokeWidth="2.5"
                            fill="rgba(255, 107, 107, 0.1)"
                            rx="4"
                            transform="rotate(0.5 200 30)"
                          />
                        </svg>
                        <p className="relative font-kalam text-base text-red-600">
                          {contactMutation.error?.message ||
                            "Fehler beim Senden der Nachricht"}
                        </p>
                      </div>
                    )}
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
