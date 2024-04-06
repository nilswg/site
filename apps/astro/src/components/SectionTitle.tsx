import { useI18n } from './useI18n'
import LettersZone from './LettersZone'

type Props = {
  text: string
}

const SectionTitle = ({ text }: Props) => {
  const { i18n } = useI18n()
  const fontStyles = i18n.language === 'en' ? /*tw:*/ 'font-russon font-normal' : /*tw:*/ 'font-notosans_bold mb-3'
  return (
    <>
      <h1 className="tags ml-6 pt-10">{'<h1>'}</h1>

      <LettersZone
        className={`ml-9 inline-block ${fontStyles} text-[2.75rem] text-sky-400 xs:text-5xl sm:text-6xl md:text-7xl xl:text-8xl`}
        letters={text}
      />
      <br />

      <h1 className="tags ml-6">{'</h1>'}</h1>
    </>
  )
}

export default SectionTitle
