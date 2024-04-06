import { getI18nObjects, getI18nText } from '@nilswg/i18n'
import { useTranslation } from './useI18n'

/**
 * 範例:
 *
 * const Options = [
 *   { id: 'job', en: 'Job Invitation', ch: '工作邀約' },
 *   { id: 'suggest', en: 'Give me suggestion', ch: '給我建議' },
 *   { id: 'ask', en: 'Questions for me?', ch: '向我提問' },
 *   { id: 'other', en: 'Other', ch: '隨便聊聊' },
 * ]
 */

const ContactTopics = () => {
  const { t } = useTranslation('home')

  const topicOptions = getI18nObjects<{ id: string; text: string }>(
    t,
    'contact.topics.options'
  )

  return (
    <div className={`relative w-full`}>
      <select
        className="peer h-14 w-full rounded-md border-2 border-sky-600 bg-transparent px-4 py-2 text-sky-400 placeholder-transparent outline-none placeholder-shown:text-gray-400"
        name="topic"
        data-placeholder="Topic"
        aria-placeholder='Topic'
        required
        defaultValue={getI18nText(t, 'contact.topics.choose')}
      >
        <option disabled className="bg-myblack text-gray-400">
          {getI18nText(t, 'contact.topics.choose')}
        </option>
        {topicOptions.map((option) => (
          <option
            key={`contact_topic_${option.id}`}
            value={option.id}
            className="bg-myblack text-sky-400"
          >
            {option.text}
          </option>
        ))}
      </select>
      <label
        htmlFor="topic"
        className="pointer-events-none absolute left-4 top-0 translate-y-[-50%] bg-myblack px-1 text-base text-sky-600 duration-300 peer-placeholder-shown:top-[50%] peer-placeholder-shown:text-lg peer-focus:top-0 peer-focus:text-base"
      >
        {getI18nText(t, 'contact.fields.topic')}
      </label>
    </div>
  )
}

export default ContactTopics
