
import Header from '../../components/Header';
import { useLanguage } from '../../context/LanguageContext';

export default function AboutPage() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-[#FEFEFE]">
      <Header />

      {/* Заголовок страницы */}
      <section className="relative py-10 px-4 sm:py-14 sm:px-8 md:py-16 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative inline-block">
            <h1 className="font-caveat text-4xl sm:text-5xl md:text-7xl font-bold text-[#2A2A2A] mb-4">
              {t('about.title')}
            </h1>
            {/* Цветное рисованное подчеркивание */}
            <svg
              className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3/4 sm:w-4/5 h-6"
              viewBox="0 0 300 24"
            >
              <path
                d="M5,12 Q75,18 150,12 Q225,6 295,15"
                stroke="url(#aboutGradient)"
                strokeWidth="4"
                fill="none"
                className="hand-drawn-animation"
              />
              <defs>
                <linearGradient
                  id="aboutGradient"
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
          <p className="font-kalam text-base sm:text-lg md:text-xl text-[#5A5A5A] mt-6 sm:mt-8 max-w-xl sm:max-w-2xl mx-auto">
            {t('about.description')}
          </p>
        </div>

        {/* Декоративные элементы */}
        <div className="absolute top-10 left-2 sm:top-20 sm:left-10 opacity-20">
          <svg width="60" height="60" className="sm:w-80 sm:h-80" viewBox="0 0 80 80">
            <rect
              x="10"
              y="10"
              width="40"
              height="40"
              stroke="#A8D5BA"
              strokeWidth="2.5"
              fill="none"
              transform="rotate(25 40 40)"
              className="hand-drawn-animation"
            />
          </svg>
        </div>
      </section>

      {/* Основной контент: слева текст, справа фото с рамкой */}
      <section className="py-8 px-4 sm:py-12 sm:px-8 md:py-12 md:px-12">
        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-4 sm:p-8 flex flex-col md:flex-row gap-8 items-center">
          {/* Текстовый блок слева */}
          <div className="flex-1 text-left">
            <h2 className="font-kalam text-xl sm:text-2xl text-[#2A2A2A] mb-4">{t('about.title')}</h2>
            <p className="text-base sm:text-lg text-[#5A5A5A] mb-6">
              {t('about.content')}
            </p>
            <ul className="list-disc list-inside text-[#5A5A5A] space-y-2">
              {Array.isArray(t('about.list'))
                ? t('about.list').map((item, idx) => <li key={idx}>{item}</li>)
                : null}
            </ul>
          </div>
          {/* Фото с SVG-рамкой справа */}
          <div className="flex-1 flex justify-center items-center relative min-w-[220px] max-w-[320px]">
            <div className="relative w-full h-full flex justify-center items-center">
              <img src="/uploads/about-photo.jpg" alt="about" className="w-56 h-56 object-cover rounded-xl z-10" />
              {/* SVG-рамка: волнистая линия */}
              <svg className="absolute top-0 left-0 w-56 h-56 pointer-events-none z-0" viewBox="0 0 224 224">
                <path
                  d="M12,30 Q40,10 70,30 Q100,50 130,30 Q160,10 190,30 Q210,50 210,110 Q210,170 190,194 Q160,214 130,194 Q100,174 70,194 Q40,214 12,194 Q4,170 12,110 Q4,50 12,30 Z"
                  stroke="#F0C5A9"
                  strokeWidth="4"
                  fill="none"
                  className="hand-drawn-animation"
                  style={{ animation: 'draw 2s linear forwards' }}
                />
                <path
                  d="M24,44 Q50,24 80,44 Q110,64 140,44 Q170,24 200,44 Q218,64 218,110 Q218,156 200,180 Q170,200 140,180 Q110,160 80,180 Q50,200 24,180 Q16,156 24,110 Q16,64 24,44 Z"
                  stroke="#A8D5BA"
                  strokeWidth="2"
                  fill="none"
                  className="hand-drawn-animation"
                  style={{ animation: 'draw 2.5s linear forwards' }}
                />
              </svg>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
