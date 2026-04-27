import { useMemo } from 'react'
import { useLocale } from '../i18n/useLocale'

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

const teamMeta = [
  {
    id: 'orhan-itisken',
    image: '/img/orhanItisken.jpg',
    email: 'orhan@itismusavirlik.com',
    featured: true,
  },
  {
    id: 'hasan-kemal-itisken',
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
    image: '/img/bersanTest.png',
    email: 'bersan@itismusavirlik.com',
    featured: true,
  },
  {
    id: 'baris-kus',
    image: '/img/bariskus.jpg',
    email: 'baris@itismusavirlik.com',
    featured: false,
  },
  {
    id: 'ahmet-can-demirelli',
    image: '/img/ahmetCanDemirelli.jpg',
    email: 'ahmetcan@itismusavirlik.com',
    featured: false,
  },
] as const

type TeamTranslation = {
  name: string
  role: string
  bio: string
}

export function useTeamMembers() {
  const { t } = useLocale()

  return useMemo(() => {
    const members = t('team.members', {
      returnObjects: true,
    }) as Record<(typeof teamMeta)[number]['id'], TeamTranslation>

    return teamMeta.map((member) => ({
      ...member,
      name: members[member.id].name,
      role: members[member.id].role,
      bio: members[member.id].bio,
    }))
  }, [t])
}
