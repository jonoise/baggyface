import { DateTime } from 'luxon'
export const TIMEZONE = 'America/Costa_Rica'

export class MyTime {
  public getCurrentTime() {
    return DateTime.now().setZone(TIMEZONE).toFormat('HH:mm')
  }
  public getCurrentDate() {
    return DateTime.now().setZone(TIMEZONE).toJSDate()
  }
  public getStartOfDay(date: Date) {
    return DateTime.fromJSDate(date).setZone(TIMEZONE).startOf('day').toJSDate()
  }
  public getEndOfDay(date: Date) {
    return DateTime.fromJSDate(date).setZone(TIMEZONE).endOf('day').toJSDate()
  }
  public getStartOfWeek(date: Date) {
    return DateTime.fromJSDate(date)
      .setZone(TIMEZONE)
      .startOf('week')
      .toJSDate()
  }
  public getEndOfWeek(date: Date) {
    return DateTime.fromJSDate(date).setZone(TIMEZONE).endOf('week').toJSDate()
  }
  public getStartOfMonth(date: Date) {
    return DateTime.fromJSDate(date)
      .setZone(TIMEZONE)
      .startOf('month')
      .toJSDate()
  }
  public getEndOfMonth(date: Date) {
    return DateTime.fromJSDate(date).setZone(TIMEZONE).endOf('month').toJSDate()
  }

  public getWeekDay(date?: Date) {
    if (!date) date = new Date()
    return DateTime.fromJSDate(date).setZone(TIMEZONE).weekday
  }
}

export const time = new MyTime()
