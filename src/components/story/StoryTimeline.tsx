import { useHistoryItems } from '../../data/history'
import { useLocale } from '../../i18n/useLocale'
import { SectionHeader } from '../common/SectionHeader'

export function StoryTimeline() {
  const historyItems = useHistoryItems()
  const { t } = useLocale()
  return (
    <section className="story" id="history">
      <div className="container-fluid">
        <SectionHeader title={t('history.sectionTitle')} description={t('history.sectionDescription')} />
        <ol className="practice-timeline">
          {historyItems.map((item) => (
            <li key={`${item.year}-${item.title}`}>
              <time dateTime={String(item.year)}>{item.year}</time>
              <div><h3>{item.title}</h3><p>{item.description}</p></div>
            </li>
          ))}
          <li>
            <time dateTime="1983">1983</time>
            <div><h3>{t('history.launchTitle')}</h3><p>{t('history.launchDescription')}</p></div>
          </li>
        </ol>
      </div>
    </section>
  )
}
