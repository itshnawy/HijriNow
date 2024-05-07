<div style="text-align:center;">
<h1>HijriNow</h1> 
<img alt="NPM Version" src="https://img.shields.io/npm/v/hijri-now?style=flat&logo=NPM"> 
  
<img alt="NPM Downloads" src="https://img.shields.io/npm/dy/hijri-now?style=flat&logo=npm">
</div>

HijriNow is a JavaScript library that provides functionality for working with the Hijri calendar. This library allows you to convert dates between the Gregorian and Hijri calendars, retrieve information about the current date in the Hijri calendar, and more.

## Installation

To use HijriNow in your project, you can include it via a CDN or install it using npm:

### CDN
```html
<script src="https://cdn.jsdelivr.net/npm/hijri-now/hijriNow.min.js"></script>
```

### NPM
```bash
npm i hijri-now
```

## Features

### today() function
- **Description:** Retrieves the current date in the Hijri calendar.

**Usage:**
  ```javascript
  const today = HijriNow.today();
  console.log(today); // Output: "9/10/1445 هجري" (depending on the current date)
  ```

### month() function
- **Description:** Retrieves the current month in the Hijri calendar.

**Usage:**
  ```javascript
  const month = HijriNow.month();
  console.log(month); // Output: "10" (depending on the current date)
  ```

### year() function
- **Description:** Retrieves the current year in the Hijri calendar.

**Usage:**
  ```javascript
  const year = HijriNow.year();
  console.log(year); // Output: "1445" (depending on the current date)
  ```

### day() function
- **Description:** Retrieves the current day in the Hijri calendar.

**Usage:**
  ```javascript
  const day = HijriNow.day();
  console.log(day); // Output: "9" (depending on the current date)
  ```

### getMonthName() function
- **Description:** Retrieves the name of the current month in the Hijri calendar.

**Usage:**
  ```javascript
  HijriNow.getMonthName()
    .then(monthName => {
      console.log(monthName); // Output: "شوال" (depending on the current date)
    })
    .catch(error => {
      console.error(error);
    });
  ```

### getDayName() function
- **Description:** Retrieves the name of the current day.

**Usage:**
  ```javascript
  HijriNow.getDayName()
    .then(dayName => {
      console.log(dayName); // Output: "الخميس" (depending on the current date)
    })
    .catch(error => {
      console.error(error);
    });
  ```

### CongratsNow() function
- **Description:** Retrieves congratulations message if today is a special occasion like Eid.

**Usage:**
  ```javascript
  HijriNow.CongratsNow()
    .then(congratsMessage => {
      console.log(congratsMessage); // Output: "عيد مبارك علينا وعليكم"  if today is eid (depending on the current date)
    })
    .catch(error => {
      console.error(error);
    });
  ```

### addHijriDays() function
- **Description:** Adds a specified number of days to a given Hijri date.
- **Parameters:**
  - `dateString`: A string representing the Hijri date in the format "day/month/year".
  - `days`: The number of days to add.

**Usage:**
  ```javascript
  const newDate = HijriNow.addHijriDays("9/10/1445", 10);
  console.log(newDate); // Output: "19/10/1445" (depending on the input date and days)
  ```

### isTodayEid() function
- **Description:** Checks if today is Eid in the Hijri calendar.

**Usage:**
  ```javascript
  HijriNow.isTodayEid()
    .then(isEid => {
      console.log(isEid); // Output: true or false (depending on the current date)
    })
    .catch(error => {
      console.error(error);
    });
  ```

### todayInText() function
- **Description:** Retrieves the current date in text format in the Hijri calendar.

**Usage:**
  ```javascript
  HijriNow.todayInText()
    .then(dateText => {
      console.log(dateText); // Output: "التاسع من شوال سنة 1445 هجري" (depending on the current date)
    })
    .catch(error => {
      console.error(error);
    });
  ```

### toGregorian() function
- **Description:** Converts a Hijri date to Gregorian.
- **Parameters:**
  - `dateString`: A string representing the Hijri date in the format "day/month/year".
  - `splitter`: (Optional) The character used to split the date components.

**Usage:**
  ```javascript
  const gregorianDate = HijriNow.toGregorian("9/10/1445");
  console.log(gregorianDate); // Output: "18/04/2024" (depending on the input date)
  ```

### toHijri() function
- **Description:** Converts a Gregorian date to Hijri.
- **Parameters:**
  - `dateString`: A string representing the Gregorian date in the format "day/month/year".
  - `splitter`: (Optional) The character used to split the date components.

**Usage:**
  ```javascript
  const hijriDate = HijriNow.toHijri("18/04/2024");
  console.log(hijriDate); // Output: "9/10/1445" (depending on the input date)
  ```


## Language
**The current language** is Arabic. You can set it to English using this code:
```javascript
HijriNow.currentLanguage = 'en'
```
## Usage

Once included in your project, you can start using the HijriNow library in your JavaScript code as demonstrated in the feature descriptions above.

## Note

HijriNow relies on the user's system date and time settings to determine the current date in the Hijri calendar. Ensure that the user's system date and time settings are correctly configured for accurate results.
