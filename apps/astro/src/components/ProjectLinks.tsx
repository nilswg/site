import { Link } from './Link'
import { AiFillGithub, AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'

const ProjectLinks = ({ demo, github }: { demo: string; github: string }) => {
  const LinkStyles =
    'flex h-10 w-10 items-center justify-center rounded-full bg-myblack text-[1.75rem] text-gray-600 duration-200 before:absolute before:top-[50%] before:z-[-1] before:h-[50%] before:w-full before:rounded-b-full before:ring-1 before:ring-sky-600 hover:bg-gray-800 hover:text-sky-400 sm:h-12 sm:w-12 sm:text-[2rem]'

  return (
    <div className="relative -right-[10rem] z-10 duration-300 ease-in-out group-hover:right-0">
      <Link
        href={demo}
        target='_blank'
        className={`${
          !demo ? 'pointer-events-none' : ''
        } absolute right-[2.5rem] top-[-15px] sm:top-[-19px] sm:right-[3.5rem]`}
      >
        <span className={LinkStyles}>
          {!demo ? <AiOutlineEyeInvisible/> : <AiOutlineEye /> }
        </span>
      </Link>
      <a href="/" target="_blank" rel="noopener noreferrer"></a>
      <Link
        href={github}
        target='_blank'
        className={`${
          !github ? 'pointer-events-none' : ''
        } absolute right-[-0.75rem] top-[-15px] sm:top-[-19px] sm:right-[-0.5rem]`}
      >
        <span className={LinkStyles}>
          <AiFillGithub />
        </span>
      </Link>
    </div>
  )
}

export default ProjectLinks
