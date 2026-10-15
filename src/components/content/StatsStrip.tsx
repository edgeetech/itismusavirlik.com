import { useLocale } from '../../i18n/useLocale'

export function StatsStrip() {
  const { t } = useLocale()
  // Stable facts replace client, sector and headcount claims without a source/date.
  const facts = t('practiceFacts', { returnObjects: true }) as Array<{ value: string; label: string }>

  return (
    <div className="practice-facts">
      <div className="container-fluid">
        <dl className="practice-facts__grid">
          {facts.map(({ value, label }) => (
            <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
          ))}
        </dl>
      </div>
    </div>
  )
}
