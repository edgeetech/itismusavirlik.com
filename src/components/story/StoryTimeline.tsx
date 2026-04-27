import { Fragment } from 'react'
import { historyItems } from '../../data/history'
import { SectionHeader } from '../common/SectionHeader'

export function StoryTimeline() {
  return (
    <div className="story" id="history">
      <div className="container-fluid">
        <SectionHeader
          title="Şirket Geçmişi"
          description="Köklerimiz ve bugünümüz, izlediğimiz bu yolun bazı önemli anları. 1977'den beri muhasebe ve mali müşavirlik sektöründe hizmet veriyoruz."
        />
        <div className="row">
          <div className="col-lg-12">
            <div className="story-container">
              <div className="story-end">
                <p>Bugün</p>
              </div>
              <div className="story-continue">
                {historyItems.map((item, index) => {
                  const isLeft = item.side === 'left'
                  const nextItem = historyItems[index + 1]
                  const shouldRenderYearDivider = !nextItem || nextItem.year !== item.year

                  return (
                    <Fragment key={`${item.year}-${item.title}`}>
                      <div className={`row ${isLeft ? 'story-left' : 'story-right'}`}>
                        {isLeft ? (
                          <>
                            <div className="col-md-6">
                              <div className="story-box">
                                <div className="story-icon d-md-none d-block">
                                  <i className={`fa ${item.icon}`} />
                                </div>
                                <div className="story-text">
                                  <h3>{item.title}</h3>
                                  <p>{item.description}</p>
                                </div>
                                <div className="story-icon d-md-block d-none">
                                  <i className={`fa ${item.icon}`} />
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6 d-md-block d-none">
                              <p className="story-date">{item.year}</p>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="col-md-6">
                              <p className="story-date">{item.year}</p>
                            </div>
                            <div className="col-md-6">
                              <div className="story-box">
                                <div className="story-icon">
                                  <i className={`fa ${item.icon}`} />
                                </div>
                                <div className="story-text">
                                  <h3>{item.title}</h3>
                                  <p>{item.description}</p>
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                      {shouldRenderYearDivider ? (
                        <div className="row">
                          <div className="col-12">
                            <div className="story-year">
                              <p>{item.year}</p>
                            </div>
                          </div>
                        </div>
                      ) : null}
                    </Fragment>
                  )
                })}
              </div>
              <div className="story-start">
                <p>Kuruluş</p>
              </div>
              <div className="story-launch">
                <div className="story-box">
                  <div className="story-text">
                    <h3>1983 yılında Ankara Ulus&apos;da Sezen Muhasebe olarak kurulduk</h3>
                    <p>Orhan İTİŞKEN tarafından, 6 yıllık sektör tecrübesiyle</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
