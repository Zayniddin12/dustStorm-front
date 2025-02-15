import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();

const headerMenuRu = [
  { id: 1, title: 'Программы', slug: '/programs' },
  { id: 2, title: 'Гранты', slug: '/grants' },
  { id: 3, title: 'Услуги', slug: '/services' },
  { id: 4, title: 'Новости', slug: '/news' },
  { id: 5, title: 'Контакты', slug: '/contact' },
];

const headerMenuEn = [
  { id: 1, title: 'Programs', slug: '/programs' },
  { id: 2, title: 'Grants', slug: '/grants' },
  { id: 3, title: 'Services', slug: '/services' },
  { id: 4, title: 'News', slug: '/news' },
  { id: 5, title: 'Contact', slug: '/contact' },
];

const headerMenuUz = [
  { id: 1, title: 'Dasturlar', slug: '/programs' },
  { id: 2, title: 'Grantlar', slug: '/grants' },
  { id: 3, title: 'Xizmatlar', slug: '/services' },
  { id: 4, title: 'Yangiliklar', slug: '/news' },
  { id: 5, title: 'Kontaktlar', slug: '/contact' },
];

const headerMenu = computed(() => {
  switch (locale.value) {
    case 'ru':
      return headerMenuRu;
    case 'uz':
      return headerMenuUz;
    default:
      return headerMenuEn;
  }
});

export { headerMenu };
