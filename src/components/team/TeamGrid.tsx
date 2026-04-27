import type { TeamMember } from '../../data/team'

type TeamGridProps = {
  members: TeamMember[]
}

export function TeamGrid({ members }: TeamGridProps) {
  return (
    <div className="row" style={{ marginTop: '40px' }}>
      {members.map((member, index) => {
        const columnClassName =
          members.length === 5 && index > 2 ? 'col-md-6' : 'col-md-4'

        return (
          <div key={member.id} className={columnClassName}>
            <div className="team-card">
              <img src={member.image} alt={member.name} className="team-card__image" />
              <h4>{member.name}</h4>
              <p className="team-card__role">{member.role}</p>
              <p>{member.bio}</p>
              {member.social ? (
                <div className="team-social-links">
                  {member.social.linkedin ? (
                    <a
                      href={member.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${member.name} LinkedIn`}
                    >
                      <i className="fab fa-linkedin" />
                    </a>
                  ) : null}
                  {member.social.facebook ? (
                    <a
                      href={member.social.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${member.name} Facebook`}
                    >
                      <i className="fab fa-facebook" />
                    </a>
                  ) : null}
                  <a href={`mailto:${member.email}`} aria-label={`${member.name} e-posta`}>
                    <i className="fa fa-envelope" />
                  </a>
                </div>
              ) : (
                <a href={`mailto:${member.email}`}>
                  <i className="fa fa-envelope" /> {member.email}
                </a>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
