import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai'
import { ResumeSectionTitle } from './ResumeSectionTitle'

type Props = {
  title: string
}
export const ResumeSocial: React.FC<Props> = ({ title }) => {
  return (
    <section className={`py-6 font-roboto_condensed`}>
      <ResumeSectionTitle text={title} />
      <div className="flex flex-col gap-2 pt-1">
        <a
          className="inline-flex items-center text-[.8rem] text-[#403A3A] hover:text-[#0B0A0A]"
          href="https://www.linkedin.com/in/nilson-weng-470672218/"
        >
          <AiFillLinkedin className="mr-1 text-[1.1rem]" />
          linkedin.com/in/nilson-weng-470672218
        </a>
        <a
          className="inline-flex items-center text-[.8rem] text-[#403A3A] hover:text-[#0B0A0A]"
          href="https://github.com/nilswg"
        >
          <AiFillGithub className="mr-1 text-[1.1rem]" /> github.com/nilswg
        </a>
      </div>
    </section>
  )
}
