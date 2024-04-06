type Props = {
  text: string
}

export const ResumeSectionTitle: React.FC<Props> = ({ text }) => (
  <h2 className="mb-2 text-[1.1rem] font-semibold uppercase tracking-[.35rem]">
    {text}
  </h2>
)
