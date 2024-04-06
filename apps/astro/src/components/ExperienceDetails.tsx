export type ExperienceDetailsProps = {
  fontStyles: string
  jobDetails: string[]
}

export const ExperienceDetails: React.FC<ExperienceDetailsProps> = ({
  fontStyles,
  jobDetails,
}) => {
  return (
    <>
      {jobDetails.map((text, i) => (
        <p
          key={i}
          className={`my-2 hidden overflow-hidden px-4  text-justify ${fontStyles} text-sm sm:text-base lg:text-lg`}
        >
          <span className="inline-block">-&nbsp;</span>
          <span className="inline-block" key={i}>
            {text}
          </span>
        </p>
      ))}
    </>
  )
}
