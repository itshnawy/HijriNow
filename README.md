# HijriNow

## Overview

HijriNow is a JavaScript library that provides functions to convert Gregorian dates to Hijri (Islamic) dates and vice versa. It supports conversions between Gregorian and Hijri calendars, allowing developers to seamlessly work with both calendar systems in their applications.

## Features

- Convert Gregorian dates to Hijri dates.
- Convert Hijri dates to Gregorian dates.
- Supports multiple languages (default language is Arabic).

## Installation

You can install HijriNow via npm:

```bash
npm install hijri-now
```

## Usage

### Importing the Library

```javascript
const HijriNow = require('hijri-now');
```

### Converting Gregorian Date to Hijri Date

```javascript
const hijriDate = HijriNow.toHijri('2024/04/05');
console.log(hijriDate); // Output: 26/09/1445
```

### Converting Hijri Date to Gregorian Date

```javascript
const gregorianDate = HijriNow.toGregorian('1445/09/26');
console.log(gregorianDate); // Output: 2024/04/05
```

### Getting Today's Date in Hijri

```javascript
const todayHijriDate = HijriNow.today();
console.log(todayHijriDate); // Output: Current Hijri date
```

## Language Configuration

By default, the library uses Arabic for output. You can change the language by setting the `currentLanguage` property:

```javascript
HijriNow.currentLanguage = 'en'; // Change language to English
```

## Notes

- Hijri months are 1-indexed (i.e., the first month is 1, not 0).
- Ensure correct input format when using conversion functions (`YYYY/MM/DD` or `DD/MM/YYYY`).
- This library assumes a valid input for Gregorian dates.

## Contributing

Contributions are welcome! Feel free to submit issues or pull requests on the [GitHub repository](https://github.com/itshnawy/HijriNow/).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.