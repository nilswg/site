const ProjectTag = ({ text }: { text: string }) => (
  <p className="align-center my-1 mr-2 rounded-full border-[1px] border-sky-600 bg-transparent px-2 py-1 text-[0.5rem] font-semibold leading-4 text-sky-600 sm:px-4 sm:py-2 sm:text-[0.75rem]">
    {text}
  </p>
)

const ProjectTags = ({ title, tags }: { title: string; tags: string[] }) => (
  <div className="h-[2.5rem] overflow-hidden pt-2 sm:h-[6rem] ">
    <div className="flex flex-wrap">
      {tags.map((tag, i) => (
        <ProjectTag key={`${title}_${tag}_${i}`} text={tag} />
      ))}
    </div>
  </div>
)

export default ProjectTags
