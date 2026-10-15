type SectionHeaderProps = {
  title: string
  description?: string
  centered?: boolean
  as?: 'h1' | 'h2'
}

export function SectionHeader({
  title,
  description,
  centered = false,
  as: Heading = 'h2',
}: SectionHeaderProps) {
  return (
    <div className={`section-header${centered ? ' text-center' : ''}`}>
      <Heading>{title}</Heading>
      {description ? <p>{description}</p> : null}
    </div>
  )
}
