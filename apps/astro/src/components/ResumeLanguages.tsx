import { ResumeSectionTitle } from './ResumeSectionTitle'
import { ResumeCircle } from './ResumeCircle'

type Props = {
  fontStyles: string
  lang: string
  title: string
}
export const ResumeLanguages: React.FC<Props> = ({
  fontStyles,
  lang,
  title,
}) => {
  return (
    <div className={`pl-0 ${fontStyles}`}>
      <ResumeSectionTitle text={title} />
      <ul className="ml-3 flex flex-col">
        <li className="flex items-center gap-3">
          <ResumeCircle />
          <span className="inline-block w-[8rem] text-[#403A3A]">
            {lang === 'en' ? 'Chinese, English' : '中文、英文'}
          </span>
        </li>
      </ul>
    </div>
  )
}
