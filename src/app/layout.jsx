import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LanguageProvider } from "../context/LanguageContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 30, // 30 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export default function RootLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#FEFEFE] text-[#2A2A2A] font-kalam">
      {/* Global paper texture background */}
      <div
        className="fixed inset-0 pointer-events-none opacity-5 z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23666666' fill-opacity='0.03'%3E%3Cpath d='m40 40c0-4.4-3.6-8-8-8s-8 3.6-8 8 3.6 8 8 8 8-3.6 8-8zm0-32c0-4.4-3.6-8-8-8s-8 3.6-8 8 3.6 8 8 8 8-3.6 8-8zm-32 0c0-4.4-3.6-8-8-8s-8 3.6-8 8 3.6 8 8 8 8-3.6 8-8z'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Main content */}
      <div className="relative z-10">
        <QueryClientProvider client={queryClient}>
          <LanguageProvider>{children}</LanguageProvider>
        </QueryClientProvider>
      </div>

      <style>{`
        .font-kalam { font-family: 'Kalam', cursive; }
        .font-caveat { font-family: 'Caveat', cursive; }

        /* Анимации рисования с цветными контурами */
        @keyframes draw {
          from { stroke-dashoffset: 100%; }
          to { stroke-dashoffset: 0%; }
        }

        @keyframes colorful-appear {
          from {
            opacity: 0;
            transform: scale(0.98);
          }
          to {
            opacity: 1;
            transform: scale(1.04);
          }
        }

        .hand-drawn-animation {
          stroke-dasharray: 100%;
          animation: draw 0.8s ease-out forwards;
        }

        .watercolor-hover {
          transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .watercolor-hover:hover {
          animation: colorful-appear 0.6s ease-out;
          transform: scale(1.06);
        }

        /* Цветной скроллбар */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: transparent;
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #A8D5BA, #F0C5A9, #D4C5F9);
          border-radius: 10px;
          border: 2px solid transparent;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, #8BC4A0, #E8B599, #C4B5E9);
        }
      `}</style>
    </div>
  );
}
