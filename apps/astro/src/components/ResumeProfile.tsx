import { ResumeSectionTitle } from './ResumeSectionTitle'

type Props = {
  textFontStyles: string
  title: string
  profileTexts: string[]
}
export const ResumeProfile: React.FC<Props> = ({
  textFontStyles,
  title,
  profileTexts,
}) => {
  return (
    <section className={`py-6 ${textFontStyles}`}>
      <ResumeSectionTitle text={title} />
      <div className="text-[.875rem]">
        {profileTexts.map((text, i) => (
          <p key={`resume_text_${i}`} className="mb-2">
            {text}
          </p>
        ))}
      </div>
    </section>
  )
}
