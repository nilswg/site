import { getI18nObjects, getI18nTextArray } from '@nilswg/i18n'
import { useTranslation } from './useI18n'
import { ResumeExperience } from './ResumeExperience'
import { ResumeHome } from './ResumeHome'
import { ResumeLanguages } from './ResumeLanguages'
import { ResumeProfile } from './ResumeProfile'
import { ResumeSkills } from './ResumeSkills'
import { ResumeSocial } from './ResumeSocial'

// --h1-font-size: 1.5rem;
// --h2-font-size: 1.25rem;
// --h3-font-size: 1rem;
// --normal-font-size: .938rem;
// --small-font-size: .875rem;
// --smaller-font-size: .813rem;
const Resume = () => {
  const { t } = useTranslation('resume')
  const home = useTranslation('home')
  const experiences = getI18nObjects<ExperienceProps>(
    home.t,
    'experience-timeline'
  )

  const lang = useTranslation('common').t('lang')

  const fontStyles = lang === 'en' ? /*tw:*/ 'font-roboto' : /*tw:*/ 'font-zhtw'

  const textFontStyles =
    lang === 'en' ? /*tw:*/ 'font-roboto_condensed' : /*tw:*/ 'font-zhtw'

  const jobTitleStyles =
    lang === 'en'
      ? /*tw:*/ 'font-roboto font-semibold tracking-wide'
      : /*tw:*/ 'font-zhtw font-semibold tracking-widest'
  const jobPositionStyles =
    lang === 'en'
      ? /*tw:*/ 'font-roboto font-semibold tracking-wide'
      : /*tw:*/ 'font-zhtw font-semibold tracking-wider'

  const profileTexts = getI18nTextArray(t, 'profileTexts')

  return (
    <div
      id="area-cv"
      className={
        'grid min-h-[1122px] w-[800px] grid-cols-[.5fr_1fr] bg-[#FCFCFC] shadow-[0_0_8px_rgba(13,12,12,.15)]'
      }
    >
      <div className="w-full bg-[#F0EFEF]">
        <div className="mx-4">
          <ResumeHome
            fontStyles={fontStyles}
            name={t('name')}
            jobTitle={t('jobtitle')}
            address={t('address')}
          />

          <ResumeSocial title={t('social')} />

          <ResumeProfile
            textFontStyles={textFontStyles}
            title={t('profile')}
            profileTexts={profileTexts}
          />
        </div>
      </div>

      <div className="w-full bg-[#FCFCFC]">
        <div className="mx-6">
          <ResumeExperience
            textFontStyles={textFontStyles}
            jobTitleStyles={jobTitleStyles}
            jobPositionStyles={jobPositionStyles}
            lang={lang}
            title={t('experience')}
            experiences={experiences}
          />

          <ResumeSkills
            fontStyles={fontStyles}
            lang={lang}
            skillsTitle={t('skills')}
          />

          <section className="flex">
            {/* <ResumeCertificates
              fontStyles={fontStyles}
              title={t('certificates')}
            /> */}

            <ResumeLanguages
              fontStyles={fontStyles}
              lang={lang}
              title={t('languages')}
            />
          </section>
        </div>
      </div>
    </div>
  )
}

export default Resume
