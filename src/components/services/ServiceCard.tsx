import type { Service } from '../../data/services'
import { useLocale } from '../../i18n/useLocale'
import { getRoutePath, useCurrentLanguage } from '../../i18n/routing'
import { withBasePath } from '../../utils/paths'

type ServiceCardProps = {
  service: Service
  variant: 'preview' | 'detail'
}

export function ServiceCard({ service, variant }: ServiceCardProps) {
  const { t } = useLocale()
  const language = useCurrentLanguage()
  const cardClassName = `service-item service-item--${variant} d-flex flex-column h-100 w-100`
  const serviceImage = (
    <img
      className="service-item__image"
      src={withBasePath(service.image)}
      alt={service.imageAlt}
    />
  )

  return (
    <div id={variant === 'detail' ? service.id : undefined} className={cardClassName}>
      {variant === 'preview' ? serviceImage : null}
      <h3>
        {variant === 'detail' && service.iconClass ? (
          <i className={`fa ${service.iconClass} service-item__title-icon`} />
        ) : null}
        {service.title}
      </h3>
      {variant === 'detail' ? serviceImage : null}
      {variant === 'preview' ? (
        <>
          <p className="service-item__preview-body">{service.shortDescription}</p>
          <a className="service-item__link" href={withBasePath(`${getRoutePath('services', language)}#${service.id}`)}>
            {t('common.actions.serviceDetails')}<span className="sr-only">: {service.title}</span> <span aria-hidden="true">→</span>
          </a>
        </>
      ) : (
        <div className="service-item__detail-body">
          <p>{service.shortDescription}</p>
          <ul>
            {service.details?.map((detail) => <li key={detail}>{detail}</li>)}
          </ul>
        </div>
      )}
    </div>
  )
}
