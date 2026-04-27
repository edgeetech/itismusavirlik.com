type SectionHeaderProps = {
  title: string
  description: string
  centered?: boolean
}

export function SectionHeader({
  title,
  description,
  centered = false,
}: SectionHeaderProps) {
  return (
    <div className={`section-header${centered ? ' text-center' : ''}`}>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  )
}
