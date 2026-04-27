import type { Service } from '../../data/services'

type ServiceCardProps = {
  service: Service
  variant: 'preview' | 'detail'
}

export function ServiceCard({ service, variant }: ServiceCardProps) {
  const cardClassName = `service-item service-item--${variant} d-flex flex-column h-100 w-100`

  return (
    <div className={cardClassName}>
      <h3>
        {variant === 'detail' && service.iconClass ? (
          <i className={`fa ${service.iconClass} service-item__title-icon`} />
        ) : null}
        {service.title}
      </h3>
      <img className="service-item__image" src={service.image} alt={service.imageAlt} />
      {variant === 'preview' ? (
        <p className="service-item__preview-body">{service.shortDescription}</p>
      ) : (
        <div className="service-item__detail-body">
          <p>{service.title} hizmetlerimiz kapsamında aşağıdaki hizmetleri sunuyoruz:</p>
          <ul>
            {service.details?.map((detail) => <li key={detail}>{detail}</li>)}
          </ul>
        </div>
      )}
    </div>
  )
}
