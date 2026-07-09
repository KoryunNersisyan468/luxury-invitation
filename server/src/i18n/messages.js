// Server-side message catalog for localized API/validation/email text.
// Keys are dot-namespaced and shared across the three supported languages.
// User-generated invitation content is intentionally NOT translated here.

export const SUPPORTED_LANGUAGES = ["en", "ru", "hy"];
export const DEFAULT_LANGUAGE = "en";

export const messages = {
  en: {
    // Generic / errors
    "error.internal": "Internal server error",
    "error.notFound": "Resource not found",
    "error.unauthorized": "You are not logged in. Please log in to continue.",
    "error.forbidden": "You do not have permission to perform this action.",
    "error.invalidToken": "Invalid or expired session. Please log in again.",
    "error.rateLimit": "Too many requests from this IP, please try again after 15 minutes.",
    "error.duplicate": "This value is already in use.",

    // Auth
    "auth.emailInUse": "Email already registered",
    "auth.invalidCredentials": "Invalid email or password",
    "auth.registrationFailed": "Registration failed",
    "auth.userNotFound": "User not found",
    "auth.googleTokenRequired": "Google ID token is required",
    "auth.facebookTokenRequired": "Facebook access token is required",
    "auth.oauthNoEmail": "This account does not have an email we can use",

    // Password reset
    "auth.resetEmailSent": "If an account exists for that email, a reset link has been sent.",
    "auth.resetSuccess": "Your password has been reset. You can now log in.",
    "auth.resetTokenInvalid": "This reset link is invalid or has expired. Please request a new one.",
    "auth.resetTokenRequired": "A reset token is required",
    "auth.oauthNoPassword": "This account uses social login and has no password to reset.",

    // Validation
    "validation.email": "A valid email address is required",
    "validation.password.min": "Password must be at least 8 characters",
    "validation.password.required": "Password is required",
    "validation.token.required": "Reset token is required",

    // Email content
    "email.reset.subject": "Reset your password",
    "email.reset.greeting": "Hello,",
    "email.reset.body": "We received a request to reset the password for your account. Click the button below to choose a new password. This link expires in {{minutes}} minutes.",
    "email.reset.button": "Reset password",
    "email.reset.ignore": "If you didn't request this, you can safely ignore this email — your password will stay the same.",
    "email.reset.footer": "Belle Âme — Luxury Invitations",
  },

  ru: {
    "error.internal": "Внутренняя ошибка сервера",
    "error.notFound": "Ресурс не найден",
    "error.unauthorized": "Вы не авторизованы. Пожалуйста, войдите, чтобы продолжить.",
    "error.forbidden": "У вас нет прав для выполнения этого действия.",
    "error.invalidToken": "Сессия недействительна или истекла. Пожалуйста, войдите снова.",
    "error.rateLimit": "Слишком много запросов с этого IP, повторите попытку через 15 минут.",
    "error.duplicate": "Это значение уже используется.",

    "auth.emailInUse": "Этот email уже зарегистрирован",
    "auth.invalidCredentials": "Неверный email или пароль",
    "auth.registrationFailed": "Не удалось зарегистрироваться",
    "auth.userNotFound": "Пользователь не найден",
    "auth.googleTokenRequired": "Требуется Google ID token",
    "auth.facebookTokenRequired": "Требуется Facebook access token",
    "auth.oauthNoEmail": "У этого аккаунта нет email, который мы можем использовать",

    "auth.resetEmailSent": "Если аккаунт с таким email существует, ссылка для сброса пароля отправлена.",
    "auth.resetSuccess": "Ваш пароль изменён. Теперь вы можете войти.",
    "auth.resetTokenInvalid": "Ссылка для сброса недействительна или истекла. Запросите новую.",
    "auth.resetTokenRequired": "Требуется токен сброса",
    "auth.oauthNoPassword": "Этот аккаунт использует вход через соцсети, у него нет пароля для сброса.",

    "validation.email": "Требуется корректный email",
    "validation.password.min": "Пароль должен содержать не менее 8 символов",
    "validation.password.required": "Требуется пароль",
    "validation.token.required": "Требуется токен сброса",

    "email.reset.subject": "Сброс пароля",
    "email.reset.greeting": "Здравствуйте,",
    "email.reset.body": "Мы получили запрос на сброс пароля для вашего аккаунта. Нажмите кнопку ниже, чтобы выбрать новый пароль. Ссылка действительна {{minutes}} минут.",
    "email.reset.button": "Сбросить пароль",
    "email.reset.ignore": "Если вы не запрашивали сброс, просто проигнорируйте это письмо — ваш пароль останется прежним.",
    "email.reset.footer": "Belle Âme — Роскошные приглашения",
  },

  hy: {
    "error.internal": "Սերվերի ներքին սխալ",
    "error.notFound": "Ռեսուրսը չի գտնվել",
    "error.unauthorized": "Դուք մուտք չեք գործել։ Խնդրում ենք մուտք գործել շարունակելու համար։",
    "error.forbidden": "Դուք չունեք այս գործողությունը կատարելու թույլտվություն։",
    "error.invalidToken": "Նստաշրջանն անվավեր է կամ լրացել է։ Խնդրում ենք նորից մուտք գործել։",
    "error.rateLimit": "Չափազանց շատ հարցումներ այս IP-ից, փորձեք կրկին 15 րոպեից։",
    "error.duplicate": "Այս արժեքն արդեն օգտագործվում է։",

    "auth.emailInUse": "Այս email-ն արդեն գրանցված է",
    "auth.invalidCredentials": "Սխալ email կամ գաղտնաբառ",
    "auth.registrationFailed": "Գրանցումը ձախողվեց",
    "auth.userNotFound": "Օգտատերը չի գտնվել",
    "auth.googleTokenRequired": "Պահանջվում է Google ID token",
    "auth.facebookTokenRequired": "Պահանջվում է Facebook access token",
    "auth.oauthNoEmail": "Այս հաշիվը չունի email, որը կարող ենք օգտագործել",

    "auth.resetEmailSent": "Եթե այդ email-ով հաշիվ գոյություն ունի, վերականգնման հղումն ուղարկվել է։",
    "auth.resetSuccess": "Ձեր գաղտնաբառը վերականգնվել է։ Այժմ կարող եք մուտք գործել։",
    "auth.resetTokenInvalid": "Այս վերականգնման հղումն անվավեր է կամ լրացել է։ Խնդրում ենք նորը պահանջել։",
    "auth.resetTokenRequired": "Պահանջվում է վերականգնման token",
    "auth.oauthNoPassword": "Այս հաշիվն օգտագործում է սոցիալական մուտք և չունի գաղտնաբառ վերականգնելու համար։",

    "validation.email": "Պահանջվում է վավեր email հասցե",
    "validation.password.min": "Գաղտնաբառը պետք է լինի առնվազն 8 նիշ",
    "validation.password.required": "Պահանջվում է գաղտնաբառ",
    "validation.token.required": "Պահանջվում է վերականգնման token",

    "email.reset.subject": "Վերականգնեք ձեր գաղտնաբառը",
    "email.reset.greeting": "Բարև,",
    "email.reset.body": "Մենք ստացանք ձեր հաշվի գաղտնաբառը վերականգնելու հարցում։ Սեղմեք ստորև կոճակը՝ նոր գաղտնաբառ ընտրելու համար։ Հղումը լրանում է {{minutes}} րոպեից։",
    "email.reset.button": "Վերականգնել գաղտնաբառը",
    "email.reset.ignore": "Եթե դուք չեք կատարել այս հարցումը, կարող եք անտեսել այս նամակը — ձեր գաղտնաբառը կմնա անփոփոխ։",
    "email.reset.footer": "Belle Âme — Շքեղ հրավիրատոմսեր",
  },
};
