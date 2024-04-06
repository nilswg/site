import React from 'react'
import { ResumeSectionTitle } from './ResumeSectionTitle'
import { ResumeCircle } from './ResumeCircle'

type Props = {
  fontStyles: string
  title: string
}
export const ResumeCertificates: React.FC<Props> = ({ fontStyles, title }) => {
  return (
    <div className={`pl-0 ${fontStyles}`}>
      <ResumeSectionTitle text={title} />
      <ul className="ml-3 flex">
        <li key={`resume_toeic`} className="flex items-center gap-3">
          <ResumeCircle />
          <span className="inline-block w-[16rem] text-[#403A3A]">
            TOEIC : 595
          </span>
        </li>
      </ul>
    </div>
  )
}
