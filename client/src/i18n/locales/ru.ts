import type { TranslationResources } from './en'

export const ru: TranslationResources = {
  translation: {
    language: { label: 'Язык', en: 'English', ru: 'Русский', hy: 'Հայերեն' },

    nav: {
      invitations: 'Приглашения',
      styles: 'Стили',
      create: 'Создать',
      more: 'Ещё',
      about: 'О нас',
      contact: 'Контакты',
      privacy: 'Политика конфиденциальности',
      terms: 'Условия использования',
      admin: 'Админ',
      login: 'Войти',
      register: 'Регистрация',
      logout: 'Выйти',
      dashboard: 'Панель',
      openMenu: 'Открыть меню',
      closeMenu: 'Закрыть меню',
    },

    common: {
      email: 'Email',
      password: 'Пароль',
      confirmPassword: 'Подтвердите пароль',
      newPassword: 'Новый пароль',
      loading: 'Загрузка…',
      retry: 'Повторить',
      createInvitation: 'Создать приглашение',
      backToLogin: 'Назад к входу',
      search: 'Поиск',
    },

    auth: {
      login: {
        title: 'С возвращением',
        subtitle: 'Войдите, чтобы управлять приглашениями.',
        submit: 'Войти',
        remember: 'Запомнить меня',
        forgot: 'Забыли пароль?',
        noAccount: 'Нет аккаунта?',
        signUp: 'Зарегистрироваться',
      },
      register: {
        title: 'Создайте аккаунт',
        subtitle: 'Начните создавать красивые приглашения.',
        submit: 'Создать аккаунт',
        haveAccount: 'Уже есть аккаунт?',
        signIn: 'Войти',
      },
      forgot: {
        title: 'Восстановление пароля',
        subtitle: 'Введите email, и мы отправим инструкции по сбросу.',
        submit: 'Отправить ссылку',
        sentTitle: 'Проверьте почту',
        sentBody: 'Если аккаунт с таким email существует, ссылка для сброса уже в пути.',
      },
      reset: {
        title: 'Новый пароль',
        subtitle: 'Выберите надёжный пароль для аккаунта.',
        submit: 'Сбросить пароль',
        successTitle: 'Пароль обновлён',
        successBody: 'Ваш пароль сброшен. Теперь вы можете войти.',
        goToLogin: 'Перейти ко входу',
        invalidTitle: 'Недействительная или истёкшая ссылка',
        invalidBody: 'Эта ссылка недействительна или истекла. Запросите новую.',
        requestNew: 'Запросить новую ссылку',
      },
    },

    validation: {
      email: 'Требуется корректный email',
      passwordMin: 'Пароль должен содержать не менее 8 символов',
      passwordConfirm: 'Подтвердите пароль',
      passwordsMismatch: 'Пароли не совпадают',
      tokenRequired: 'Требуется токен сброса',
    },

    home: {
      eyebrow: 'Belle Âme',
      heroTitle: 'Роскошные цифровые приглашения для вашего идеального дня',
      heroSubtitle:
        'Создайте кинематографичное персональное приглашение с цветочным дизайном, плавными анимациями и встроенной системой RSVP.',
      ctaCreate: 'Создать приглашение',
      ctaExample: 'Посмотреть пример',
      featuresTitle: 'Что включено',
      features: {
        storyTitle: 'История любви',
        storyBody: 'Расскажите свою историю в элегантном кинематографичном формате.',
        calendarTitle: 'Обратный отсчёт и календарь',
        calendarBody: 'Интерактивный календарь и живой отсчёт до главного дня.',
        locationsTitle: 'Места',
        locationsBody: 'Места церемонии и торжества с картами.',
        rsvpTitle: 'Система RSVP',
        rsvpBody: 'Гости подтверждают присутствие одним касанием.',
      },
      ctaTitle: 'Готовы начать?',
      ctaBody: 'Создайте персональное приглашение за считанные минуты.',
      ctaNow: 'Создать сейчас',
    },

    footer: {
      tagline: 'Роскошные цифровые приглашения, созданные с изяществом, любовью и кинематографичным дизайном.',
      explore: 'Обзор',
      company: 'Компания',
      styles: 'Стили приглашений',
      connect: 'Связаться',
      legal: 'Правовая информация',
      rights: 'Все права защищены.',
    },

    notify: {
      genericError: 'Что-то пошло не так. Попробуйте снова.',
      loginSuccess: 'Вход выполнен успешно.',
      registerSuccess: 'Аккаунт успешно создан.',
      loggedOut: 'Вы вышли из аккаунта.',
    },
  },
}
