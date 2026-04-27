import { useStats } from '../../data/stats'

export function StatsStrip() {
  const stats = useStats()

  return (
    <div className="service stats-strip">
      <div className="container-fluid">
        <div className="row text-center">
          {stats.map((stat) => (
            <div key={stat.label} className="col-md-3 col-sm-6">
              <div className="stats-strip__item">
                <div className="stats-strip__icon">
                  <i className={`fa ${stat.icon}`} />
                </div>
                <h3 className="stats-strip__value">{stat.value}</h3>
                <p className="stats-strip__label">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
