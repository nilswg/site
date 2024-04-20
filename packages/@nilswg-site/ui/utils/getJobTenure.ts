type JobTime = number[]

/**
 * 範例: getJobTenure( [2009, 03], [2012, 10] )
 */
function getJobTenure(st: JobTime = [], ed: JobTime = [], lang: string = 'en') {
  if (!st.length || !ed.length) return ''
  /**
   * 從工作截止月(ed)減去工作起始月(st)
   * 不滿1個月者取1個月來算。
   *
   * 從 2009 03 至 2009 03，算 1 月
   * 從 2009 03 至 2009 04，算 2 月
   *
   * 從 2009 03 至 2010 02，算 1 年
   * 從 2009 03 至 2010 03，算 1 年，又 1 月
   */

  // var diffTime = moment(ed, 'YYYY-MM').diff(moment(st, 'YYYY-MM'))
  // var duration = moment.duration(diffTime)
  // var yy = duration.years()
  // var mm = duration.months()
  // var dd = duration.days()

  var yy = ed[0] - st[0]
  var mm = ed[1] - st[1] + 1

  if (mm >= 12) {
    yy += 1
    mm -= 12
  }

  if (mm < 0) {
    yy -= 1
    mm += 12
  }

  if (lang === 'ch') {
    return (
      (yy > 0 ? `${yy} 年` : '') +
      (yy > 0 && mm > 0 ? ' ' : '') +
      (mm > 0 ? `${mm} 個月` : '')
    )
  } else {
    return (
      (yy > 0 ? `${yy} year${yy > 1 ? 's' : ''}` : '') +
      (yy > 0 && mm > 0 ? ' and ' : '') +
      (mm > 0 ? `${mm} month${mm > 1 ? 's' : ''}` : '')
    )
  }
}

export default getJobTenure
