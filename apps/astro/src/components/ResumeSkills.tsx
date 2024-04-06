import { ResumeSectionTitle } from './ResumeSectionTitle'

type Props = {
  fontStyles: string
  skillsTitle: string
  lang: string
}
export const ResumeSkills: React.FC<Props> = ({
  fontStyles,
  lang,
  skillsTitle,
}) => {
  return (
    <section className={`py-6 ${fontStyles}`}>
      <ResumeSectionTitle text={skillsTitle} />
      <div className="ml-3 grid grid-cols-3">
        {[
          {
            category: lang === 'en' ? 'Front End' : '前端技能',
            items: [
              'TypeScript',
              'React',
              'Redux',
              'Tailwind',
              'Angular',
              'Babylon.js',
            ],
          },
          {
            category: lang === 'en' ? 'Back End' : '後端技能',
            items: [
              'Node.js',
              'Next.js',
              'Express',
              'Docker',
              'Redis',
              'Linux',
            ],
          },
          {
            category: lang === 'en' ? 'Dev-Tools' : '開發工具',
            items: ['Webpack', 'Rollup', 'Vite', 'NPM', 'Git', 'Prettier'],
          },
        ].map((prop) => (
          <ul
            key={`resume_category_${prop.category}`}
            className="flex flex-col items-start"
          >
            <h3>{prop.category}</h3>
            <span className="mb-2 h-1 w-[calc(8rem)] border-b-2"></span>
            {prop.items.map((item) => (
              <li
                key={`resume_skill_${item}`}
                className="flex items-center gap-3"
              >
                <span className="inline-block h-[5px] w-[5px] items-center rounded-full bg-[#403A3A]"></span>
                <span className="inline-block w-[8rem] text-[#403A3A]">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  )
}
