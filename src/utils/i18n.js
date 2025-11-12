// Система интернационализации для веб-студии
export const languages = {
  de: "Deutsch",
  ru: "Русский",
  en: "English",
};

export const translations = {
  de: {
    nav: {
      home: "Startseite",
      portfolio: "Portfolio",
      news: "Nachrichten",
      about: "Über mich",
      contact: "Kontakt",
    },
    home: {
      studioLabel: "Web Studio",
      slogan: "Kreative Lösungen für Ihr digitales Business",
      description:
        "Verwandeln Sie Ihre Ideen in einzigartige digitale Erlebnisse. Von Webdesign bis Branding – ich bringe Kreativität und Technik zusammen.",
      telegramButton: "Telegram Kontakt",
      scrollHint: "scrollen",
    },
    news: {
      title: "Neuigkeiten & Updates",
      description: "Hier finden Sie aktuelle Nachrichten, события и свежие проекты aus meiner Web- und Designarbeit.",
    },
      about: {
        title: "Über mich",
        description: "Hier finden Sie Informationen über mich und meine Arbeit als Webentwickler und Designer.",
        content: "Ich bin Webentwickler und Designer, spezialisiert auf moderne Websites und Branding. Mein Ansatz verbindet Kreativität und Technologie für die besten Ergebnisse.",
        list: [
          "Berufserfahrung: 8+ Jahre",
          "Stack: React, Next.js, Node.js, Figma, Tailwind CSS",
          "Ich liebe kreative und ungewöhnliche Projekte",
          "Kunden weltweit"
        ]
      },

    // Портфолио
    portfolio: {
      title: "Portfolio",
      subtitle:
        "Eine Auswahl meiner kreativen Arbeiten – von Webdesign bis Branding. Jedes Projekt erzählt eine einzigartige Geschichte.",
      loading: "Projekte werden geladen...",
      error: "Fehler beim Laden der Projekte",
      empty: "Noch keine Projekte vorhanden",
      viewMore: "Mehr anzeigen",
      projectDescription: "Projektbeschreibung",
      readMore: "Mehr lesen",
    },

    // Контакты
    contact: {
      title: "Kontakt",
      subtitle:
        "Haben Sie ein Projekt im Kopf? Lassen Sie uns darüber sprechen! Ihre Nachricht wird direkt an mich weitergeleitet.",
      letsTalk: "Lass uns sprechen!",
      responseTime:
        "Antwort in der Regel innerhalb von 24 Stunden. Für dringende Anfragen nutzen Sie gerne Telegram.",
      form: {
          name: "Name",
          email: "E-Mail",
          subject: "Betreff",
          message: "Nachricht",
          namePlaceholder: "Ihr vollständiger Name",
          emailPlaceholder: "ihre.email@beispiel.de",
          subjectPlaceholder: "Worum geht es?",
          messagePlaceholder: "Erzählen Sie mir von Ihrem Projekt...",
          sendButton: "Nachricht senden",
          sending: "Wird gesendet...",
          newMessage: "Neue Nachricht",
      },
      success: {
        title: "Nachricht gesendet!",
        description:
          "Vielen Dank für Ihre Nachricht. Ich melde mich so schnell wie möglich bei Ihnen.",
      },
    },
  },

  ru: {
    nav: {
      home: "Главная",
      portfolio: "Портфолио",
      news: "Новости",
      about: "Обо мне",
      contact: "Контакты",
    },
    home: {
      studioLabel: "Веб Студия",
      slogan: "Креативные решения для вашего цифрового бизнеса",
      description:
        "Превращаю ваши идеи в уникальные цифровые решения. От веб-дизайна до брендинга – объединяю креативность и технологии.",
      telegramButton: "Связаться в Telegram",
      scrollHint: "прокрутить",
    },
    about: {
      title: "Обо мне",
      description: "Здесь вы найдете информацию обо мне и моей работе как веб-разработчика и дизайнера.",
        content: "Я — веб-разработчик и дизайнер, специализируюсь на создании современных сайтов и брендинге. Мой подход — сочетание креативности и технологий для достижения лучших результатов для клиентов.",
        list: [
          "Опыт работы: 8+ лет",
          "Стек: React, Next.js, Node.js, Figma, Tailwind CSS",
          "Люблю нестандартные задачи и творческие проекты",
          "Работаю с клиентами по всему миру"
        ]
    },
    news: {
      title: "Новости и обновления",
      description: "Здесь публикуются свежие новости, события и новые проекты из мира веб-разработки и дизайна.",
    },

    // Портфолио
    portfolio: {
      title: "Портфолио",
      subtitle:
        "Подборка моих творческих работ – от веб-дизайна до брендинга. Каждый проект рассказывает уникальную историю.",
      loading: "Загружаем проекты...",
      error: "Ошибка загрузки проектов",
      empty: "Пока нет проектов",
      viewMore: "Подробнее",
      projectDescription: "Описание проекта",
      readMore: "Читать полностью",
    },

    // Контакты
    contact: {
      title: "Контакты",
      subtitle:
        "Есть проект в голове? Давайте обсудим! Ваше сообщение будет отправлено прямо мне.",
      letsTalk: "Давайте поговорим!",
      responseTime:
        "Ответ обычно в течение 24 часов. Для срочных вопросов используйте Telegram.",
      form: {
        name: "Имя",
        email: "E-Mail",
        subject: "Тема",
        message: "Сообщение",
        namePlaceholder: "Ваше полное имя",
        emailPlaceholder: "ваш.email@example.com",
        subjectPlaceholder: "О чем речь?",
        messagePlaceholder: "Расскажите мне о вашем проекте...",
        sendButton: "Отправить сообщение",
        sending: "Отправляем...",
        newMessage: "Новое сообщение",
      },
      success: {
        title: "Сообщение отправлено!",
        description:
          "Спасибо за ваше сообщение. Я свяжусь с вами как можно скорее.",
      },
    },
  },

  en: {
    nav: {
      home: "Home",
      portfolio: "Portfolio",
      news: "News",
      about: "About",
      contact: "Contact",
    },
    home: {
      studioLabel: "Web Studio",
      slogan: "Creative Solutions for Your Digital Business",
      description:
        "Transform your ideas into unique digital experiences. From web design to branding – I bring creativity and technology together.",
      telegramButton: "Contact on Telegram",
      scrollHint: "scroll",
    },
    about: {
      title: "About",
      description: "Here you can find information about me and my work as a web developer and designer.",
        content: "I am a web developer and designer specializing in modern websites and branding. My approach combines creativity and technology for the best results.",
        list: [
          "Experience: 8+ years",
          "Stack: React, Next.js, Node.js, Figma, Tailwind CSS",
          "I love creative and challenging projects",
          "Working with clients worldwide"
        ]
    },
    news: {
      title: "News & Updates",
      description: "Find the latest news, events, and new projects from my web development and design journey.",
    },

    // Портфолио
    portfolio: {
      title: "Portfolio",
      subtitle:
        "A selection of my creative works – from web design to branding. Each project tells a unique story.",
      loading: "Loading projects...",
      error: "Error loading projects",
      empty: "No projects yet",
      viewMore: "View more",
      projectDescription: "Project Description",
      readMore: "Read more",
    },

    // Контакты
    contact: {
      title: "Contact",
      subtitle:
        "Have a project in mind? Let's talk about it! Your message will be sent directly to me.",
      letsTalk: "Let's talk!",
      responseTime:
        "Response usually within 24 hours. For urgent inquiries, please use Telegram.",
      form: {
        name: "Name",
        email: "E-Mail",
        subject: "Subject",
        message: "Message",
        namePlaceholder: "Your full name",
        emailPlaceholder: "your.email@example.com",
        subjectPlaceholder: "What is it about?",
        messagePlaceholder: "Tell me about your project...",
        sendButton: "Send Message",
        sending: "Sending...",
        newMessage: "New Message",
      },
      success: {
        title: "Message sent!",
        description:
          "Thank you for your message. I will get back to you as soon as possible.",
      },
    },
  }
};
