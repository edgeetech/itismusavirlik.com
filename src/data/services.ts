export type Service = {
  id: string
  title: string
  shortDescription: string
  image: string
  imageAlt: string
  iconClass?: string
  details?: string[]
}

export const services: Service[] = [
  {
    id: 'accounting',
    title: 'Muhasebe Mali Müşavirlik',
    shortDescription:
      'Kanunen tutulması zorunlu defterlerin tutulması, vergi beyannameleri, mali tablolar ve daha fazlası...',
    image: '/img/service-1.png',
    imageAlt: 'Muhasebe',
    iconClass: 'fa-briefcase',
    details: [
      'Kanunen tutulması zorunlu defterlerin tutulması',
      'Vergi, SSK vb. yükümlülükler ile ilgili denetimlerin yapılması',
      'Düzenlenecek sözleşmelerin gözden geçirilmesi',
      'Kanuni tasdik zorunluluğunun yerine getirilmesi',
      'Vergi idaresi ile ilgili sorunların çözümlenmesi',
      'Muhasebenizin anahtar teslim olarak şirketiniz içinde veya dışında tutulması',
      'Kurulacak şirketin faaliyetlerinin ve her bir ana faaliyet konusunun vergi karşısındaki konumunun belirlenmesi',
      'Yararlanılabilecek yasal vergi avantajlarının belirlenmesi',
      'Gelecek yıllarda şirket üzerindeki vergi yükünün hesaplanıp, vergi planlaması yapılması',
      'Muhasebe sisteminin kurulması ve işlemlerin yürütülmesi',
      'Yönetim raporlamaları ve diğer özel amaçlı finansal yönetim raporlamalarının hazırlanması',
      'Firmaların tek düzen hesap planına uygun mali tablolarının hazırlanması',
      'Vergi Beyannamelerinin Hazırlanması ve Kontrolü',
    ],
  },
  {
    id: 'tax-advisory',
    title: 'Vergi Danışmanlığı',
    shortDescription:
      'Yasal yükümlülükler konusunda bilgilendirme, mevzuat danışmanlığı ve vergi optimizasyonu...',
    image: '/img/web-design.png',
    imageAlt: 'Vergi',
    iconClass: 'fa-question',
    details: [
      'Mükelleflerimizi yasal yükümlülükleri konusunda bilgilendirmek',
      'Kanunlar ve mevzuatla ilgili müşavirlik hizmetleri sunmak',
      'Görüş bildirmek',
      'Ortaya çıkabilecek sorunlara ilişkin önerilerde bulunmak',
      'Vergi avantajlarının belirlenmesi ve uygulanması',
      'Vergi planlaması ve optimizasyonu',
      'Vergi denetimi öncesi hazırlık ve destek',
      'Vergi uyuşmazlıklarında danışmanlık',
    ],
  },
  {
    id: 'incorporation',
    title: 'Ana Sözleşme Hazırlanması ve Kuruluş İşlemleri',
    shortDescription:
      'Ana sözleşme hazırlanması, şirket kuruluş işlemleri, ticaret sicili kayıtları...',
    image: '/img/service-2.png',
    imageAlt: 'Kurulus',
    iconClass: 'fa-envelope-square',
    details: [
      'Kurulacak şirketin faaliyetlerine ve statüsüne en uygun olan şirket türünün belirlenmesi',
      'Anasözleşme hazırlanması',
      'Kuruluş işlemlerinin yürütülüp, sonuçlandırılması',
      'Ticaret Sicili ve Vergi Dairesi kayıt işlemleri',
      'SGK işyeri bildirimi',
      'Muhasebe sisteminin kurulması',
      'Kurulacak şirketin faaliyetlerinin ve her bir ana faaliyet konusunun vergi karşısındaki konumunun belirlenmesi',
    ],
  },
  {
    id: 'social-security',
    title: 'Sosyal Güvenlik',
    shortDescription:
      'SGK işlemleri, işe giriş-çıkış bildirimleri, prim hesaplamaları ve daha fazlası...',
    image: '/img/devops.png',
    imageAlt: 'SGK',
    iconClass: 'fa-user-secret',
    details: [
      'İşyeri bildirimi, sigortalı işe giriş ve işten çıkış',
      'Prim oranları ve prime esas kazançların belirlenmesi',
      'İş kazası ve meslek hastalığı olayları ve işveren sorumluluğu',
      'İşyeri tehlike sınıf ve derecesinin (NACE) belirlenmesi ve değişikliklere ilişkin işlemler',
      'İstirahatli sigortalılarla ilgili çalışmazlık bildirimi',
      'Aylık prim ve hizmet belgelerinin türü, mahiyeti ve kanun numaralarının belirlenmesi',
      'İdari para cezası uygulamaları, itirazlar ve kanun yollarına başvurma',
      'Sosyal güvenlik incelemeleri ve dava süreçlerinin yürütülmesi',
    ],
  },
]
