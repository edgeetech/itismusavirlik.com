export type TeamMember = {
  id: string
  name: string
  role: string
  bio: string
  image: string
  email: string
  featured: boolean
  social?: {
    linkedin?: string
    facebook?: string
  }
}

export const teamMembers: TeamMember[] = [
  {
    id: 'orhan-itisken',
    name: 'Orhan İTİŞKEN',
    role: 'Serbest Muhasebeci Mali Müşavir (SMMM)',
    bio: '1959 Ankara doğumlu, 1977 yılında muhasebe sektörüne başladı, 1983 yılında kendi işini kurdu. Firmamızın kurucusu.',
    image: '/img/orhanItisken.jpg',
    email: 'orhan@itismusavirlik.com',
    featured: true,
  },
  {
    id: 'hasan-kemal-itisken',
    name: 'Hasan Kemal İTİŞKEN',
    role: 'Serbest Muhasebeci Mali Müşavir (SMMM)',
    bio: '1988 Ankara doğumlu, 2007 yılında aktif çalışmaya başladı. 2017 yılında SMMM oldu.',
    image: '/img/hasanKemal.jpg',
    email: 'hasankemal@itismusavirlik.com',
    featured: true,
    social: {
      linkedin: 'https://www.linkedin.com/in/hasan-kemal-iti%C5%9Fken-6623b288/',
      facebook: 'https://www.facebook.com/profile.php?id=100000781721405',
    },
  },
  {
    id: 'mehmet-bersan-itisken',
    name: 'Mehmet Berşan İTİŞKEN',
    role: 'Muhasebe Mali ve İdari İşler Yöneticisi',
    bio: '1995 Ankara doğumlu, 2020 Gazi Üniversitesi mezunu.',
    image: '/img/bersanTest.png',
    email: 'bersan@itismusavirlik.com',
    featured: true,
  },
  {
    id: 'baris-kus',
    name: 'Barış Kuş',
    role: 'Muhasebe ve Mali İşler Personeli',
    bio: '1996 Ankara doğumlu, 2021 Başkent Üniversitesi mezunu.',
    image: '/img/bariskus.jpg',
    email: 'baris@itismusavirlik.com',
    featured: false,
  },
  {
    id: 'ahmet-can-demirelli',
    name: 'Ahmet Can Demirelli',
    role: 'Muhasebe ve Mali İşler Personeli',
    bio: '1998 Ankara doğumlu, 2021 Uşak Üniversitesi mezunu.',
    image: '/img/ahmetCanDemirelli.jpg',
    email: 'ahmetcan@itismusavirlik.com',
    featured: false,
  },
]
