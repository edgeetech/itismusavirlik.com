import { site } from '../../data/site'

export function ContactSection() {
  return (
    <div className="news" id="contact">
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col-md-6">
            <iframe
              title="ITIS ofis konumu"
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d382.6886632680907!2d32.712776!3d39.885228!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d34e546994e427%3A0xf7c64c34dd7c7baf!2sITIS%20Muhasebe%20-%20Mali%20M%C3%BC%C5%9Favirlik!5e0!3m2!1sen!2suk!4v1675202762363!5m2!1sen!2suk"
              width="100%"
              height="400"
              style={{ border: 0, borderRadius: '10px' }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="col-md-6">
            <h2 className="section-title">Bize Ulaşın</h2>
            <p style={{ textAlign: 'justify' }}>
              Hizmetlerimiz veya herhangi başka bir konuda bize iletmek istediğiniz bir şey
              varsa aşağıdaki iletişim bilgilerinden bize ulaşabilirsiniz. Ayrıca aşağıdaki
              telefon numaralarından çalışma saatleri içerisinde doğrudan arayabilirsiniz.
              Size en kısa zamanda geri dönüş yapacağız.
            </p>
            <div className="contact-details">
              <p>
                <i className="fa fa-map-marker-alt" />
                {site.address}
              </p>
              {site.phoneNumbers.map((phone) => (
                <p key={phone}>
                  <a href={`tel:${phone}`}>
                    <i className="fa fa-phone-alt" />
                    {phone}
                  </a>
                </p>
              ))}
              <p>
                <a href={`mailto:${site.email}`}>
                  <i className="fa fa-envelope" />
                  {site.email}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
