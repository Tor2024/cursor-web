import React, { useState } from "react";
import Header from "../../components/Header";
import { ExternalLink, ImageIcon, X, Calendar, Tag } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { useContentData } from "../../utils/useContentData";

export default function PortfolioPage() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { currentLanguage, t } = useLanguage();
  const { items: portfolioItems, loading } = useContentData('portfolio');

  const openProjectModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#FEFEFE]">
      <Header />

      {/* Заголовок страницы */}
      <section className="relative py-16 px-6 md:px-12">
        <div className="max-w-6xl mx-auto text-center">
          <div className="relative inline-block">
            <h1 className="font-caveat text-5xl md:text-7xl font-bold text-[#2A2A2A] mb-4">
              {t('portfolio.title')}
            </h1>
            {/* Цветное рисованное подчеркивание */}
            <svg
              className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4/5 h-6"
              viewBox="0 0 300 24"
            >
              <path
                d="M5,12 Q75,18 150,12 Q225,6 295,15"
                stroke="url(#portfolioGradient)"
                strokeWidth="4"
                fill="none"
                className="hand-drawn-animation"
              />
              <defs>
                <linearGradient
                  id="portfolioGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#D4C5F9" />
                  <stop offset="50%" stopColor="#A8D5BA" />
                  <stop offset="100%" stopColor="#F0C5A9" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <p className="font-kalam text-lg md:text-xl text-[#5A5A5A] mt-8 max-w-2xl mx-auto">
            {t('portfolio.subtitle')}
          </p>
        </div>

        {/* Декоративные элементы */}
        <div className="absolute top-20 left-10 opacity-20">
          <svg width="80" height="80" viewBox="0 0 80 80">
            <rect
              x="10"
              y="10"
              width="60"
              height="60"
              stroke="#A8D5BA"
              strokeWidth="2.5"
              fill="none"
              transform="rotate(25 40 40)"
              className="hand-drawn-animation"
            />
          </svg>
        </div>
      </section>

      {/* Сетка портфолио */}
      <section className="py-12 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          {portfolioItems.length === 0 ? (
            <div className="text-center py-20">
              <div className="relative inline-block">
                <svg
                  width="120"
                  height="120"
                  viewBox="0 0 120 120"
                  className="mx-auto mb-6 opacity-40"
                >
                  <rect
                    x="20"
                    y="20"
                    width="80"
                    height="80"
                    stroke="#F0C5A9"
                    strokeWidth="2.5"
                    fill="none"
                    transform="rotate(15 60 60)"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="25"
                    stroke="#A8D5BA"
                    strokeWidth="2.5"
                    fill="none"
                  />
                </svg>
                <p className="font-kalam text-xl text-[#A8D5BA]">
                  No portfolio items yet. Create some in the admin panel.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
              {portfolioItems.map((project, index) => (
                <div
                  key={project.folder_name || index}
                  className="relative group cursor-pointer watercolor-hover"
                  onClick={() => openProjectModal(project)}
                >
                  {/* Цветная рисованная карточка проекта */}
                  <div className="relative">
                    {/* Цветная граница карточки */}
                    <svg
                      className="absolute inset-0 w-full h-full pointer-events-none"
                      viewBox="0 0 300 400"
                      preserveAspectRatio="none"
                    >
                      <rect
                        x="8"
                        y="8"
                        width="284"
                        height="384"
                        stroke={`url(#cardGradient${index})`}
                        strokeWidth="2.5"
                        fill="none"
                        rx="4"
                        transform={`rotate(${index % 2 === 0 ? "1" : "-1"} 150 200)`}
                        className="hand-drawn-animation"
                        style={{ animationDelay: `${index * 0.2}s` }}
                      />
                      <defs>
                        <linearGradient
                          id={`cardGradient${index}`}
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="100%"
                        >
                          <stop
                            offset="0%"
                            stopColor={
                              index % 3 === 0
                                ? "#A8D5BA"
                                : index % 3 === 1
                                  ? "#F0C5A9"
                                  : "#D4C5F9"
                            }
                          />
                          <stop
                            offset="100%"
                            stopColor={
                              index % 3 === 0
                                ? "#D4C5F9"
                                : index % 3 === 1
                                  ? "#A8D5BA"
                                  : "#F0C5A9"
                            }
                          />
                        </linearGradient>
                      </defs>
                    </svg>

                    {/* Цветной фон при наведении */}
                    <div className="absolute inset-2 bg-gradient-to-br from-[#E8F4F8] via-[#F0E8D6] to-[#F5E6F8] opacity-0 group-hover:opacity-40 transition-opacity duration-500 rounded-lg"></div>

                    <div className="relative p-6 space-y-4">
                      {/* Изображения проекта */}
                      <div className="aspect-[4/3] relative overflow-hidden">
                        {project.cover ? (
                          <img
                            src={project.cover}
                            alt={project.title?.[currentLanguage] || project.title?.ru || project.title?.en || 'Project'}
                            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full bg-[#F5F5F5] flex items-center justify-center">
                            <ImageIcon size={48} className="text-[#A8D5BA]" />
                          </div>
                        )}

                        {/* Цветная рисованная рамка вокруг изображения */}
                        <svg
                          className="absolute inset-0 w-full h-full pointer-events-none"
                          viewBox="0 0 200 150"
                          preserveAspectRatio="none"
                        >
                          <rect
                            x="4"
                            y="4"
                            width="192"
                            height="142"
                            stroke="#F0C5A9"
                            strokeWidth="0.5"
                            fill="none"
                            transform="rotate(0.5 100 75)"
                          />
                        </svg>
                      </div>

                      {/* Название проекта */}
                      <div className="relative">
                        <h3 className="font-caveat text-2xl font-bold text-[#2A2A2A] mb-2">
                          {project.title?.[currentLanguage] || project.title?.ru || project.title?.en || 'Untitled Project'}
                        </h3>
                        {/* Цветное рисованное подчеркивание */}
                        <svg
                          className="absolute -bottom-1 left-0 w-3/4 h-3 opacity-70"
                          viewBox="0 0 150 12"
                        >
                          <path
                            d="M2,6 Q40,9 75,6 Q110,3 148,6"
                            stroke="#A8D5BA"
                            strokeWidth="1"
                            fill="none"
                          />
                        </svg>
                      </div>

                      {/* Описание проекта */}
                      <div className="font-kalam text-base text-[#5A5A5A] leading-relaxed line-clamp-5">
                        {(() => {
                          const content = typeof project.content === 'string'
                            ? project.content
                            : project.content?.[currentLanguage] || project.content?.ru || project.content?.en || '';
                          // Remove img tags for preview
                          const textOnly = content.replace(/<img[^>]*>/g, '');
                          return <div dangerouslySetInnerHTML={{ __html: textOnly }} />;
                        })()}
                      </div>

                      {/* Читать полностью */}
                      <div className="font-kalam text-sm text-[#A8D5BA]">
                        {t('portfolio.readMore')}
                      </div>

                      {/* Дата */}
                      <div className="flex items-center justify-between pt-2">
                        <span className="font-kalam text-sm text-[#A8D5BA]">
                          {project.date}
                        </span>
                        <ExternalLink
                          size={16}
                          className="text-[#D4C5F9] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Модальное окно проекта */}
      {isModalOpen && selectedProject && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
          onClick={closeProjectModal}
        >
          <div
            className="bg-[#FEFEFE] max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative p-8 lg:p-12">
              {/* Цветная рисованная граница модального окна */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
              <rect
                x="5"
                y="0"
                width="90"
                height="100"
                stroke="url(#modalGradient)"
                strokeWidth="2"
                fill="none"
                rx="1"
                transform="rotate(-0.5 50 50)"
              />
                <defs>
                  <linearGradient
                    id="modalGradient"
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
              {/* Кнопка закрытия сверху */}
              <button
                onClick={closeProjectModal}
                className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center font-caveat text-2xl text-[#A8D5BA] hover:text-[#2A2A2A] transition-colors duration-300 z-10"
              >
                <X size={24} />
              </button>

              {/* Кнопка закрытия снизу */}
              <button
                onClick={closeProjectModal}
                className="absolute bottom-4 right-4 w-10 h-10 flex items-center justify-center font-caveat text-2xl text-[#A8D5BA] hover:text-[#2A2A2A] transition-colors duration-300 z-10"
              >
                <X size={24} />
              </button>

              <div className="space-y-8">
                {/* Название проекта */}
                <div className="text-center">
                  <h2 className="font-caveat text-4xl lg:text-5xl font-bold text-[#2A2A2A] mb-4">
                    {selectedProject.title?.[currentLanguage] || selectedProject.title?.ru || selectedProject.title?.en || 'Untitled Project'}
                  </h2>
                  {/* Цветное подчеркивание */}
                  <svg
                    className="w-3/4 h-4 mx-auto opacity-70"
                    viewBox="0 0 300 16"
                  >
                    <path
                      d="M5,8 Q75,12 150,8 Q225,4 295,8"
                      stroke="#D4C5F9"
                      strokeWidth="2.5"
                      fill="none"
                    />
                  </svg>
                </div>

                {/* Дата и теги */}
                <div className="flex flex-wrap items-center justify-center gap-6 text-[#5A5A5A]">
                  <div className="flex items-center space-x-2">
                    <Calendar size={18} className="text-[#A8D5BA]" />
                    <span className="font-kalam text-lg">{selectedProject.date}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Tag size={18} className="text-[#F0C5A9]" />
                    <span className="font-kalam text-lg">Portfolio Project</span>
                  </div>
                </div>

                {/* Изображение проекта */}
                {selectedProject.cover && (
                  <div className="relative max-w-2xl mx-auto">
                    <div className="aspect-[16/9] relative overflow-hidden">
                      <img
                        src={selectedProject.cover}
                        alt={selectedProject.title?.ru || selectedProject.title?.en || 'Project'}
                        className="w-full h-full object-cover"
                      />
                      {/* Цветная рамка вокруг изображения */}
                      <svg
                        className="absolute inset-0 w-full h-full pointer-events-none"
                        viewBox="0 0 400 225"
                        preserveAspectRatio="none"
                      >
                        <rect
                          x="8"
                          y="8"
                          width="384"
                          height="209"
                          stroke="#A8D5BA"
                          strokeWidth="3"
                          fill="none"
                          transform="rotate(0.5 200 112.5)"
                        />
                      </svg>
                    </div>
                  </div>
                )}

                {/* Описание проекта */}
                <div className="max-w-3xl mx-auto">
                  <h3 className="font-caveat text-3xl font-semibold text-[#2A2A2A] mb-6 text-center">
                    Project Details
                  </h3>

                  <div
                    className="font-kalam text-lg lg:text-xl text-[#5A5A5A] leading-relaxed space-y-6"
                    dangerouslySetInnerHTML={{
                      __html: typeof selectedProject.content === 'string'
                        ? selectedProject.content
                        : selectedProject.content?.[currentLanguage] || selectedProject.content?.ru || selectedProject.content?.en || ''
                    }}
                  />
                </div>

                {/* Декоративный элемент в конце */}
                <div className="text-center pt-4">
                  <svg width="100" height="12" viewBox="0 0 100 12" className="mx-auto opacity-60">
                    <path
                      d="M5,6 Q25,3 50,6 Q75,9 95,6"
                      stroke="#F0C5A9"
                      strokeWidth="2"
                      fill="none"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
