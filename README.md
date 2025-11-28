# 🚀 Проект Historical Slides
Архитектура: **Feature-Sliced Design (FSD)**

Современная фронтенд-сборка, построенная на Webpack 5, React 19, TypeScript и архитектурном подходе FSD.  
Поддерживаются SCSS-стили, алиасы, импорты шрифтов, анимаций, dev-server

---

## 📁 Архитектура проекта (FSD)
```
src/
├── app/ # Инициализация приложения, провайдеры, глобальные стили
│ ├── styles/ # SCSS, mixins, animations, vars
│ ├── providers/
│ └── index.tsx
├── pages/ # Страницы (routes)
├── widgets/ # Крупные UI-секции
├── features/ # Функциональные блоки
├── entities/ # Сущности домена
└── shared/ # Утилиты, UI, helpers, libs
```

Подробнее: https://feature-sliced.design/

## 🔧 Стек технологий
- **React 19**
- **ReactDOM 19**
- **TypeScript**
- **Webpack 5**
- **SCSS / SASS**
- **Swiper 11**
- Поддержка алиасов
- DevServer с HMR

---

## 🎯 Настроенные алиасы

```
resolve: {
  extensions: [".tsx", ".ts", ".js", ".jsx"],
  alias: {
    "@shared": "src/shared/",
    "@features": "src/features/",
    "@app": "src/app/",
    // styles
    "@mixins": "src/app/styles/mixins.scss",
    "@animations": "src/app/styles/animations.scss",
    "@fonts": "src/app/fonts"
  },
}
```

### Установка

```bash
npm install
```

### Разработка

```bash
npm run start
```

### Билд

```bash
npm run build
```


