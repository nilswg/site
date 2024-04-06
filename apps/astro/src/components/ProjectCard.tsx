import { Image, type Props_Image } from './Image'
import { FlipAnimation } from './FlipAnimation'

import ProjectLinks from './ProjectLinks'
import ProjectTags from './ProjectTags'

type Props = {
  tags: string[]
  title: string
  description: string
  demo: string
  github: string
  preview: Props_Image
}

const ProjectCard: React.FC<Props> = ({ tags, title, description, demo, github, preview }) => (
  <FlipAnimation direction={'horizontal'}>
    <div className="group relative h-[210px] w-[280px] overflow-hidden rounded-md shadow-card sm:h-[300px] sm:w-[400px] 2xl:h-[330px] 2xl:w-[440px]">
      <div className="relative h-[210px] w-full sm:h-[300px] 2xl:h-[330px]">
        <Image className="object-fill" {...preview} />
      </div>
      <div className="absolute top-[150px] h-full w-full bg-myblack px-6 opacity-60 duration-300 before:absolute before:left-0 before:top-1 before:h-full before:w-full before:border-t-[1px] before:border-sky-600 group-hover:top-[2.5rem] group-hover:opacity-90 sm:top-[220px] 2xl:top-[250px]">
        <ProjectLinks demo={demo} github={github} />
        <p className="max-h-[55px] overflow-hidden break-words pb-2 pt-4 font-outfit text-2xl font-[300] text-white sm:max-h-[70px] sm:pt-6 sm:text-4xl">
          {title}
        </p>
        <p className="my-1 max-h-[60px] overflow-hidden break-words font-outfit text-sm font-[200] text-white sm:my-2 sm:max-h-[90px] sm:text-justify sm:text-lg">
          {description}
        </p>
        <ProjectTags title={title} tags={tags} />
      </div>
    </div>
  </FlipAnimation>
)

export default ProjectCard
