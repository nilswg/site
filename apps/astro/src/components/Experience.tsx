import { getI18nTextArray } from '@nilswg/i18n'
import { Trans, useTranslation } from './useI18n'
import { ExperienceTimeline } from './ExperienceTimeline'
import SectionText from './SectionText'
import SectionTitle from './SectionTitle'

const ExperienceTexts = () => {
  const { t } = useTranslation('home')
  const experienceTexts = getI18nTextArray(t, 'experience.texts')

  return (
    <>
      <SectionTitle
        text={t('experience.title', { defaultValue: 'Experience' })}
      />
      <SectionText>
        {experienceTexts.map((text, i) => (
          <p key={`experience_text_${i}`}>
            <Trans
              i18nKey={text}
              components={{
                b: <b />,
              }}
            />
          </p>
        ))}
      </SectionText>
    </>
  )
}

const Experience = () => {
  return (
    <section
      id="experience"
      className="w-full bg-myblack py-[var(--navbar-height)]"
    >
      {/* <h1 className="absolute text-lg text-white">{2}</h1> */}
      <div className="w-full 2xl:flex 2xl:flex-row 2xl:justify-center">
        <div className="2xl:flex 2xl:w-2/5 2xl:flex-row 2xl:justify-end">
          <div className="max-w-3xl">
            <ExperienceTexts />
          </div>
        </div>
        <div className="2xl:w-3/5 2xl:pt-10">
          <h1 className="tags ml-6 2xl:ml-[10%]">{'<timeline>'}</h1>
          <div className="py-5">
            <ExperienceTimeline />
          </div>
          <h1 className="tags ml-6 2xl:ml-[10%]">{'</timeline>'}</h1>
        </div>
      </div>
    </section>
  )
}

export default Experience
