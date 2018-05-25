// import * as moment from 'moment';
// import * as momentTZ from 'moment-timezone';
// import { LocalStorageHelper } from 'app/helpers/localstorage.helper';
// import { DateTimeFormatConstants, TimeZoneFormatContants } from 'app/misc/constants';
// import { UserOtherInfo } from 'app/models/login';
// import { DateStyle, TimeStyle } from 'app/misc/datetime.enum';


// export class DateTimeHelper {

//     private static validDateFormats: string[] = ['YYYY-MM-DDTHH:mm:ss', 'YYYY-MM-DDThh:mm:ss', 'YYYY-MM-DD hh:mm:ss', 'MM-DD-YYYY hh:mm:ss', 'DD-MM-YYYY HH:mm:ss', 'DD-MM-YYYY hh:mm:ss', 'YYYY/MM/DD hh:mm:ss', 'MM/DD/YYYY hh:mm:ss', 'DD/MM/YYYY HH:mm:ss', 'MMMM DD, YYYY h:mm:ss'];

//     public static getCurrentTimeZone(): void {
//         return momentTZ.guess;
//     }

//     /**
//      * This method returns current UTC datetime in ISO format.
//      * 
//      * @static
//      * @returns {string} Current UTC datetime
//      * @memberof DateTimeHelper
//      */
//     public static getCurrentUTCDateTime(): string {
//         return moment().utc().toISOString();
//     }

//     public static getCurrentUTCDateTimeMessage(): string {
//         return moment().utc().format();
//     }

//     public static getCurrentDateTime(): string {
//         return moment().format(DateTimeFormatConstants.ISODateTimeFormat);
//         // return moment().toISOString();
//     }

//     public static GetIANADateTimeFromUTC(ianaTimezone: string, utcDateTime: string, returnFormat: string = '', culture: string = ''): string {
//         // Check if time zone is exist
//         if (ianaTimezone === '' || momentTZ.tz.zone(ianaTimezone) == null) {
//             ianaTimezone = TimeZoneFormatContants.PSTIanaTimeZone;
//         }

//         if (culture === '') {
//             culture = 'en-US';
//         }

//         // if (returnFormat === '') {
//         //     return momentTZ.utc(utcDateTime).tz(ianaTimezone).toString();
//         // }
//         // else {
//         //     return momentTZ.utc(utcDateTime).tz(ianaTimezone).format(returnFormat);
//         // }

//         let parsedDate: any = momentTZ.utc(utcDateTime).tz(ianaTimezone);
//         if (returnFormat === '') {
//             parsedDate = parsedDate.locale(culture).toString();
//         } else {
//             parsedDate = parsedDate.locale(culture).format(returnFormat);
//         }
//         return parsedDate;
//         // }
//     }

//     public static GetUTCDateTimeFromIANA(ianaTimezone: string, ianaDateTime: string, dateFormat: string): any {
//         // Check if time zone is exist
//         if (ianaTimezone === '' || momentTZ.tz.zone(ianaTimezone) == null) {
//             ianaTimezone = TimeZoneFormatContants.PSTIanaTimeZone;
//         }

//         if (dateFormat !== '') {
//             return momentTZ.tz(ianaDateTime, dateFormat, ianaTimezone).utc();
//         }
//         else {
//             return momentTZ.tz(ianaDateTime, this.validDateFormats, ianaTimezone).utc();
//         }
//     }


//     public static GetLongFormattedDate(dateValue: string): any {
//         return moment.utc(dateValue).locale(LocalStorageHelper.getUserOtherInfo().Culture).format(DateTimeFormatConstants.LongDateFormat);
//     }

//     public static GetMediumFormattedDate(dateValue: string): any {
//         let userInfo: UserOtherInfo = LocalStorageHelper.getUserOtherInfo();
//         return moment.utc(dateValue).locale(userInfo.Culture).format(DateTimeFormatConstants.MediumDateFormat);
//     }

//     public static GetShortFormattedDate(dateValue: string): any {
//         return moment.utc(dateValue).locale(LocalStorageHelper.getUserOtherInfo().Culture).format(DateTimeFormatConstants.ShortDateFormat);
//     }

//     public static GetDayMonthFormattedDate(dateValue: string): any {
//         return moment.utc(dateValue).locale(LocalStorageHelper.getUserOtherInfo().Culture).format(DateTimeFormatConstants.DayMonthDateFormat);
//     }

//     public static GetLongFormattedTime(dateValue: string): any {
//         return moment.utc(dateValue).locale(LocalStorageHelper.getUserOtherInfo().Culture).format(DateTimeFormatConstants.LongTimeFormat);
//     }

//     public static GetShortFormattedTime(dateValue: string): any {
//         return moment.utc(dateValue).locale(LocalStorageHelper.getUserOtherInfo().Culture).format(DateTimeFormatConstants.ShortTimeFormat);
//     }

//     public static GetWeekDayTimeFormat(dateValue: string): any {
//         return moment.utc(dateValue).locale(LocalStorageHelper.getUserOtherInfo().Culture).format(DateTimeFormatConstants.WeekDayTimeFormat);
//     }

//     public static GetTimeDiffBetweenTimezones(firstTZ: string, secondTZ: string): string {
//         let userOtherInfo: UserOtherInfo = LocalStorageHelper.getUserOtherInfo();
//         let homeTZOffset: any = momentTZ.tz(firstTZ).utcOffset();
//         let otherTZOffset: any = momentTZ.tz(secondTZ).utcOffset();

//         let diff: number = homeTZOffset - otherTZOffset;

//         if (homeTZOffset >= otherTZOffset) {
//             return ('-' + moment('2017-01-01').locale(userOtherInfo.Culture).minutes(Math.abs(diff)).format('H:mm'));
//         } else {
//             return (moment('2017-01-01').locale(userOtherInfo.Culture).minutes(Math.abs(diff)).format('H:mm'));
//         }
//     }

//     public static ShowSignForTimeDiffBetweenTimezones(firstTZ: string, secondTZ: string): string {
//         const homeTZOffset: any = momentTZ.tz(firstTZ).utcOffset();
//         const otherTZOffset: any = momentTZ.tz(secondTZ).utcOffset();
//         const diff: number = homeTZOffset - otherTZOffset;

//         if (homeTZOffset < otherTZOffset) {
//             if (diff === 0) {
//                 return '0';
//             } else {
//                return '+';
//             }
//         } else {
//             if (diff === 0) {
//                 return '0';
//             } else {
//                 return '';
//             }
//         }



//     }


//     /**
//    * This method returns current week's Monday date and time (as string) in ISO format.
//    * Ex. Current time is Friday, July 21 2017 15:37:15 in PST time zone.
//    * If timepart is some value like "05:00:00" return value is 2017-07-17T05:00:00 otherwise return value is 2017-07-17T15:37:15
//    * If convertToUTC is true final date like 2017-07-17T00:00:00 will be converted to UTC i.e. 2017-07-17T07:00:00.
//    * @param timePart If this part is provided in return value current timepart replace with this otherwise method returns date with current time part.
//    * @param convertToUTC If false returned value is according to current timezone otherwise converted in UTC.
//    */
//     public static getCurrentWeekMondayDate(timePart: string = '', convertToUTC: boolean = true): string {
//         let weekStartDateTime: string;
//         if (timePart !== '') {
//             weekStartDateTime = moment().isoWeekday('Monday').format('YYYY-MM-DD[T' + timePart + ']');
//         }
//         else {
//             weekStartDateTime = moment().isoWeekday('Monday').format(DateTimeFormatConstants.ISODateTimeFormat);
//         }

//         if (convertToUTC) {
//             weekStartDateTime = moment(weekStartDateTime).utc().format(DateTimeFormatConstants.ISODateTimeFormat);
//         }
//         return weekStartDateTime;
//     }

//     /**
//     * This method returns current week's Sunday date and time (as string) in ISO format.
//     * Ex. Current time is Friday, July 21 2017 15:37:15 in PST time zone.
//     * If timepart is some value like "05:00:00" return value is 2017-07-23T05:00:00 otherwise return value is 2017-07-23T15:37:15
//     * If convertToUTC is true final date like 2017-07-23T00:00:00 will be converted to UTC i.e. 2017-07-23T07:00:00.
//     * @param timePart If this part is provided in return value current timepart replace with this otherwise method returns date with current time part.
//     * @param convertToUTC If false returned value is according to current timezone otherwise converted in UTC.
//     */
//     public static getCurrentWeekSundayDate(timePart: string = '', convertToUTC: boolean = true): string {
//         let weekEndDateTime: string;
//         if (timePart !== '') {
//             weekEndDateTime = moment().isoWeekday('Sunday').format('YYYY-MM-DD[T' + timePart + ']');
//         }
//         else {
//             weekEndDateTime = moment().isoWeekday('Sunday').format(DateTimeFormatConstants.ISODateTimeFormat);
//         }
//         if (convertToUTC) {
//             weekEndDateTime = moment(weekEndDateTime).utc().format(DateTimeFormatConstants.ISODateTimeFormat);
//         }
//         return weekEndDateTime;
//     }
//     /**

// * This method add provided number of days in source date.
// * Ex.
// * sourceDate = Friday, July 21 2017 15:30:15 in PST time zone and no. of days = 2
// * timepart = "05:00"
// * converToUTC = true
// * This method returns 2017-07-19T12:00:00.0000
// * @param sourceDate Source date to add given number of days.
// * @param noOfDays Number of days to be add in source date. If negative value is provided same number of days subtract from source date.
// * @param timePart (Optional) Time part that will overrided inplace of time part of source date.
// * @param convertToUTC (Optional) If true converts date into UTC otherwise same date is return.
// */
//     public static addDays(sourceDate: string, noOfDays: number, timePart: string, convertToUTC: boolean = true) {

//         let weekEndDateTime: string;
//         if (timePart !== '') {
//             weekEndDateTime = moment.utc(sourceDate).add(noOfDays, 'days').format('YYYY-MM-DD[T' + timePart + ']');
//         } else {
//             weekEndDateTime = moment.utc(sourceDate).add(noOfDays, 'days').format(DateTimeFormatConstants.ISODateTimeFormat);
//         }
//         if (convertToUTC) {
//             weekEndDateTime = moment(weekEndDateTime).utc().format(DateTimeFormatConstants.ISODateTimeFormat);
//         }
//         return weekEndDateTime;
//     }


//     public static getISOFormatDate(date: string): string {
//         return moment.utc(date).format(DateTimeFormatConstants.ISODateTimeFormat);
//     }

//     public static isCurrentDate(dateInLocal: string): boolean {
//         let currentDate: string = moment(new Date()).format('MM-DD-YYYY');
//         let x = moment(currentDate, 'MM-DD-YYYY');
//         let sourceDate = moment(dateInLocal).format('MM-DD-YYYY');
//         return x.isSame(sourceDate);
//     }

//     public static dateDiffFromCurrentDateInDays(dateInLocal: string): number {
//         let currentDate: string = moment(new Date()).format('MM-DD-YYYY');
//         dateInLocal = moment(dateInLocal).format('MM-DD-YYYY');
//         let x = moment(currentDate, 'MM-DD-YYYY');
//         let y = moment(dateInLocal, 'MM-DD-YYYY');
//         return x.diff(y, 'days'); // 1
//     }

//     public static dateDiffFromCurrentDateInSeconds(dateInLocal: string): number {
//         let currentDate: string = moment(new Date()).format('MM-DD-YYYY HH:mm:ss');
//         let ms = moment(currentDate, 'MM-DD-YYYY HH:mm:ss').diff(moment(dateInLocal, 'MM-DD-YYYY HH:mm:ss'));
//         let d = moment.duration(ms);
//         return d.asSeconds();
//     }

//     public static dateDiffrenceInHours(date1: string, date2: string): number {
//         return moment(date1).diff(moment(date2, DateTimeFormatConstants.ISODateTimeFormat), 'hours');
//     }

//     public static addHours(sourceDate: string, noOfhours: number) {
//         let weekEndDateTime: string;
//         noOfhours = noOfhours + moment.utc(sourceDate).hours();
//         weekEndDateTime = moment.utc(sourceDate).set({ hours: noOfhours }).format(DateTimeFormatConstants.ISODateTimeFormat);
//         return weekEndDateTime;
//     }

//     // Another method to add/subtract no. Of days in given day
//     public static NtpOffset(clientRequestNTP: number, clientResponseNTP: number, serverNTP: number) {
//         //    debugger;
//         console.log('[Debug NTP]- Old NTP offset: ' + LocalStorageHelper.getNtpOffset());

//         // console.log('client request time: ' + moment.utc(clientRequestNTP).toISOString());
//         // console.log('client response time: ' + moment.utc(clientResponseNTP).toISOString());
//         // console.log('server time: ' + moment.utc(serverNTP).toISOString());

//         let ntpOffset: number = ((serverNTP - clientRequestNTP) + (serverNTP - clientResponseNTP)) / 2;
//         LocalStorageHelper.setNtpOffset(ntpOffset / 1000);
//         LocalStorageHelper.setNtpOffsetInMiliseconds(ntpOffset);
//         console.log('[Debug NTP]- New NTP offset: ' + LocalStorageHelper.getNtpOffset());
//     }

//     // public static AccurateUTCDateTime() {
//     //     let utcDateTime: number = moment.utc(this.getCurrentUTCDateTime()).toDate().getTime();
//     //     let time = utcDateTime + LocalStorageHelper.getNtpOffsetInMiliseconds();
//     //     return moment.utc(time).toISOString();
//     // }


//     public static AccurateUTCDateTime(): any {
//         let utcDateTime: number = Number(DateTimeHelper.getCurrentUTCDateTimeInUnixMS()); // moment.utc(this.getCurrentUTCDateTime()).toDate().getTime();
//         let time: number = utcDateTime + Number(LocalStorageHelper.getNtpOffsetInMiliseconds());
//         // console.log('Accurate Date-' + moment.utc(time).toISOString());
//         // console.log('Current Date-' + moment.utc(utcDateTime).toISOString());
//         return moment.utc(time).toISOString();
//     }

//     public static getCurrentUTCDateTimeInUnixMS(): any {
//         // console.log( moment().utc().locale('en').format('x'));
//         return moment().utc().locale('en').format('x');
//     }

//     public static getUTCDateTimeInUnixMS(utcISODate: string): any {
//         // console.log( moment().utc().locale('en').format('x'));
//         return moment.utc(utcISODate).locale('en').format('x');
//     }

//     /**
//      * This method format input date-time value to requested format according to given locale.
//      * @static
//      * @param {string} dateTime Input date-time value to format.
//      * @param {string} format DateTime format. This format is according to moment locale format specifications.
//      * @param {string} locale Locale in form of 'Language-Region' like 'hi-IN'
//      * @returns Formatted value according to input format and locale.
//      * @memberof DateTimeHelper
//      */
//     public static getLocaleFormatDateTime(dateTime: string, format: string, locale: string) {
//         return moment.utc(dateTime).locale(locale).format(format);
//     }


//     public static getDateTimeFormatString(dateStyle: DateStyle = DateStyle.None, timeStyle: TimeStyle = TimeStyle.None): string {
//         let styleFormat: string = '';
//         // Return Date Format
//         if (dateStyle != null && dateStyle !== undefined) {
//             switch (dateStyle) {
//                 case DateStyle.None:
//                     styleFormat = '';
//                     break;
//                 case DateStyle.Long:
//                     styleFormat = DateTimeFormatConstants.LongDateFormat;
//                     break;
//                 case DateStyle.Medium:
//                     styleFormat = DateTimeFormatConstants.MediumDateFormat;
//                     break;
//                 case DateStyle.Short:
//                     styleFormat = DateTimeFormatConstants.ShortDateFormat;
//                     break;
//                 case DateStyle.DayMonth:
//                     styleFormat = DateTimeFormatConstants.DayMonthDateFormat;
//                     break;
//                 case DateStyle.WeekDayWithTime:
//                     styleFormat = DateTimeFormatConstants.WeekDayTimeFormat;
//                     break;
//             }
//         }

//         // Return Time Format
//         if (timeStyle != null && timeStyle !== undefined) {
//             switch (timeStyle) {
//                 case TimeStyle.None:
//                     styleFormat = '';
//                     break;
//                 case TimeStyle.Long:
//                     styleFormat = DateTimeFormatConstants.LongTimeFormat;
//                     break;
//                 case TimeStyle.Short:
//                     styleFormat = DateTimeFormatConstants.ShortTimeFormat;
//                     break;
//             }
//         }

//         return styleFormat;


//     }

//     public static getFormattedDate(inputDate: string, inputDateFormat: string, outputDateFormat: string, locale: string) {
//         if (inputDateFormat !== '') {
//             if (locale !== '') {
//                 return moment(inputDate, inputDateFormat).locale(locale).format(outputDateFormat);
//             }
//             else {
//                 return moment(inputDate, inputDateFormat).format(outputDateFormat);
//             }
//         } else {
//             if (locale !== '') {
//                 return moment(inputDate, this.validDateFormats).locale(locale).format(outputDateFormat);
//             }
//             else {
//                 return moment(inputDate, this.validDateFormats).format(outputDateFormat);
//             }
//         }
//     }

// }
