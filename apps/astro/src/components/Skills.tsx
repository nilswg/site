import { getI18nTextArray } from '@nilswg/i18n'
import { Trans, useTranslation } from './useI18n'
import SectionText from './SectionText'
import SectionTitle from './SectionTitle'
import SkillBox from './SkillBox'

const mySkills = [
  { id: 'TypeScript', img: '/img/skills/TypeScript.svg' },
  { id: 'JavaScript', img: '/img/skills/JavaScript.svg' },
  { id: 'React', img: '/img/skills/React-Dark.svg' },
  { id: 'Next.js', img: '/img/skills/NextJS-Dark.svg' },
  { id: 'Express', img: '/img/skills/expressjs.png' },
  { id: 'Redux', img: '/img/skills/Redux.svg' },
  { id: 'Node.js', img: '/img/skills/nodejs-dark.svg' },
  { id: 'HTML', img: '/img/skills/HTML.svg' },
  { id: 'CSS', img: '/img/skills/CSS.svg' },
  { id: 'Angular', img: '/img/skills/Angular-Dark.svg' },
  { id: 'RxJS', img: '/img/skills/rxjs.png' },
  { id: 'Deno', img: '/img/skills/deno-dark.svg' },
  { id: 'Tailwind', img: '/img/skills/tailwind.png' },
  { id: 'Sass', img: '/img/skills/sass.png' },
  { id: 'Styled\nComponents', img: '/img/skills/styled-components.svg' },
  { id: 'Pug', img: '/img/skills/pug-dark.svg' },
  { id: 'BabylonJS', img: '/img/skills/babylon.png' },
  { id: 'PixiJS', img: '/img/skills/pixijs.png' },
  { id: 'GreenSock', img: '/img/skills/greensock.png' },
  { id: 'Redis', img: '/img/skills/redis.png' },
  { id: 'MongoDB', img: '/img/skills/mongodb.png' },
  { id: 'PostgreSQL', img: '/img/skills/PostgreSQL.png' },
  { id: 'Docker', img: '/img/skills/Docker.svg' },
  { id: 'Linux', img: '/img/skills/Linux-Dark.svg' },
  { id: 'Bash', img: '/img/skills/Bash-Dark.svg' },
  { id: 'NeoVim', img: '/img/skills/NeoVim-Dark.svg' },
  { id: 'Git', img: '/img/skills/Git.svg' },
  { id: 'NPM', img: '/img/skills/npm.png' },
  { id: 'Webpack', img: '/img/skills/webpack-dark.svg' },
  { id: 'Vite', img: '/img/skills/vite-dark.svg' },
  { id: 'Rollup', img: '/img/skills/rollup-dark.svg' },
  { id: 'Prettier', img: '/img/skills/prettier.png' },
  { id: 'Golang', img: '/img/skills/golang.svg' },
  { id: 'Rust', img: '/img/skills/rust.svg' },
  { id: 'Python', img: '/img/skills/Python-Dark.svg' },
  { id: 'C', img: '/img/skills/clang.svg' },
]

const SkillsTexts = () => {
  const { t } = useTranslation('home')
  const skillsTexts = getI18nTextArray(t, 'skills.texts')
  return (
    <>
      <SectionTitle text={t('skills.title', { defaultValue: 'Skills' })} />
      <SectionText>
        {skillsTexts.map((text, i) => (
          <p key={`skills_text_${i}`}>
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

const SkillsBoard = () => (
  <div className="container mx-auto max-w-3xl xl:max-w-5xl 2xl:max-w-full">
    <div className="grid grid-cols-2 gap-4 py-5 px-6 sm:grid-cols-4 sm:gap-5 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6">
      {mySkills.map((item) => (
        <SkillBox key={`skill_${item.id}`} id={item.id} img={item.img} />
      ))}
    </div>
  </div>
)

const Skills = () => (
  <section id="skills" className="w-full bg-myblack py-[var(--navbar-height)]">
    {/* <h1 className="absolute text-lg text-white">{3}</h1> */}
    <div className="w-full 2xl:flex 2xl:flex-row 2xl:justify-center">
      <div className="2xl:flex 2xl:w-2/5 2xl:flex-row 2xl:justify-end">
        <div className="max-w-3xl">
          <SkillsTexts />
        </div>
      </div>
      <div className="2xl:w-3/5 2xl:pt-10">
        <h1 className="tags ml-6">{'<div class="grid">'}</h1>
        <SkillsBoard />
        <h1 className="tags ml-6">{'</div>'}</h1>
      </div>
    </div>
  </section>
)

export default Skills
