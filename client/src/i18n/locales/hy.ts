import type { TranslationResources } from './en'

export const hy: TranslationResources = {
  translation: {
    language: { label: 'Լեզու', en: 'English', ru: 'Русский', hy: 'Հայերեն' },

    nav: {
      invitations: 'Հրավիրատոմսեր',
      styles: 'Ոճեր',
      create: 'Ստեղծել',
      more: 'Ավելին',
      about: 'Մեր մասին',
      contact: 'Կապ',
      privacy: 'Գաղտնիության քաղաքականություն',
      terms: 'Օգտագործման պայմաններ',
      admin: 'Ադմին',
      login: 'Մուտք',
      register: 'Գրանցվել',
      logout: 'Ելք',
      dashboard: 'Վահանակ',
      openMenu: 'Բացել մենյուն',
      closeMenu: 'Փակել մենյուն',
    },

    common: {
      email: 'Email',
      password: 'Գաղտնաբառ',
      confirmPassword: 'Հաստատեք գաղտնաբառը',
      newPassword: 'Նոր գաղտնաբառ',
      loading: 'Բեռնվում է…',
      retry: 'Կրկին փորձել',
      createInvitation: 'Ստեղծել հրավիրատոմս',
      backToLogin: 'Վերադառնալ մուտք',
      search: 'Որոնում',
    },

    auth: {
      login: {
        title: 'Բարի վերադարձ',
        subtitle: 'Մուտք գործեք՝ ձեր հրավիրատոմսերը կառավարելու համար։',
        submit: 'Մուտք',
        remember: 'Հիշել ինձ',
        forgot: 'Մոռացե՞լ եք գաղտնաբառը',
        noAccount: 'Չունե՞ք հաշիվ',
        signUp: 'Գրանցվել',
      },
      register: {
        title: 'Ստեղծեք ձեր հաշիվը',
        subtitle: 'Սկսեք ստեղծել գեղեցիկ հրավիրատոմսեր։',
        submit: 'Ստեղծել հաշիվ',
        haveAccount: 'Արդե՞ն ունեք հաշիվ',
        signIn: 'Մուտք',
      },
      forgot: {
        title: 'Մոռացված գաղտնաբառ',
        subtitle: 'Մուտքագրեք ձեր email-ը, և մենք կուղարկենք վերականգնման հրահանգներ։',
        submit: 'Ուղարկել հղումը',
        sentTitle: 'Ստուգեք ձեր փոստը',
        sentBody: 'Եթե այդ email-ով հաշիվ գոյություն ունի, վերականգնման հղումն արդեն ճանապարհին է։',
      },
      reset: {
        title: 'Սահմանեք նոր գաղտնաբառ',
        subtitle: 'Ընտրեք ամուր գաղտնաբառ ձեր հաշվի համար։',
        submit: 'Վերականգնել գաղտնաբառը',
        successTitle: 'Գաղտնաբառը թարմացվեց',
        successBody: 'Ձեր գաղտնաբառը վերականգնվել է։ Այժմ կարող եք մուտք գործել։',
        goToLogin: 'Անցնել մուտք',
        invalidTitle: 'Անվավեր կամ լրացած հղում',
        invalidBody: 'Այս հղումն անվավեր է կամ լրացել է։ Խնդրում ենք նորը պահանջել։',
        requestNew: 'Պահանջել նոր հղում',
      },
    },

    validation: {
      email: 'Պահանջվում է վավեր email հասցե',
      passwordMin: 'Գաղտնաբառը պետք է լինի առնվազն 8 նիշ',
      passwordConfirm: 'Հաստատեք ձեր գաղտնաբառը',
      passwordsMismatch: 'Գաղտնաբառերը չեն համընկնում',
      tokenRequired: 'Պահանջվում է վերականգնման token',
    },

    home: {
      eyebrow: 'Belle Âme',
      heroTitle: 'Շքեղ էլեկտրոնային հրավիրատոմսեր Ձեր կատարյալ օրվա համար',
      heroSubtitle:
        'Ստեղծեք կինեմատոգրաֆիկ, անհատականացված հրավիրատոմս՝ ծաղկային ձևավորմամբ, սահուն անիմացիաներով և RSVP համակարգով։',
      ctaCreate: 'Ստեղծել հրավեր',
      ctaExample: 'Դիտել օրինակը',
      featuresTitle: 'Ինչ է ներառում',
      features: {
        storyTitle: 'Սիրո պատմություն',
        storyBody: 'Պատմեք ձեր ճանապարհի մասին նրբագեղ, կինեմատոգրաֆիկ ձևաչափով։',
        calendarTitle: 'Հաշվիչ և օրացույց',
        calendarBody: 'Ինտերակտիվ օրացույց և կենդանի հետհաշվարկ դեպի մեծ օրը։',
        locationsTitle: 'Վայրեր',
        locationsBody: 'Պսակադրության և հանդիսության վայրերը՝ քարտեզներով։',
        rsvpTitle: 'RSVP համակարգ',
        rsvpBody: 'Հյուրերը հաստատում են իրենց ներկայությունը մեկ հպումով։',
      },
      ctaTitle: 'Պատրա՞ստ եք սկսել',
      ctaBody: 'Ստեղծեք ձեր անհատական հրավիրատոմսը րոպեների ընթացքում։',
      ctaNow: 'Ստեղծել հիմա',
    },

    footer: {
      tagline: 'Շքեղ էլեկտրոնային հրավիրատոմսեր՝ ստեղծված նրբագեղությամբ, սիրով և կինեմատոգրաֆիկ ձևավորմամբ։',
      explore: 'Դիտել',
      company: 'Ընկերություն',
      styles: 'Հրավիրատոմսերի ոճեր',
      connect: 'Կապ',
      legal: 'Իրավական',
      rights: 'Բոլոր իրավունքները պաշտպանված են։',
    },

    notify: {
      genericError: 'Ինչ-որ բան սխալ գնաց։ Խնդրում ենք կրկին փորձել։',
      loginSuccess: 'Մուտքը հաջողվեց։',
      registerSuccess: 'Հաշիվը հաջողությամբ ստեղծվեց։',
      loggedOut: 'Դուք դուրս եք եկել համակարգից։',
    },
  },
}
