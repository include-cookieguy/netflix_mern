export const validRegister = {
  validStep1: function (info) {
    const {
      username,
      email,
      password,
      birthday: { day, month, year },
    } = info;

    const err = {};

    //STEP 1
    if (!username) {
      err.username = "Please add your username.";
    } else if (username.length > 50) {
      err.username = "First name is up to 50 characters long.";
    } else if (!validateUsername(username)) {
      err.username = "Username format is incorrect.";
    }

    if (!email) {
      err.email = "Please add your email.";
    } else if (!validateEmail(email)) {
      err.email = "Please enter a valid email address";
    }

    if (!password) {
      err.password = "Please add your password.";
    } else if (password.length < 6) {
      err.password = "Password must be at least 6 characters.";
    }

    if (!day || !month || !year) {
      err.birthday = "Please add your date of birth.";
    } else if (validateBirthday(day, month, year)) {
      err.birthday = validateBirthday(day, month, year);
    }

    return {
      errMsg: err,
      errLength: Object.keys(err).length,
    };
  },

  validStep3: function (card) {
    const {
      firstName,
      lastName,
      cardNumber,
      expiredDate,
      securityCode,
      agree,
    } = card;

    const monthOfExprireDate = expiredDate.substring(0, 2);
    const yearOfExprireDate = expiredDate.substring(3, 5);

    const err = {};

    if (!firstName) {
      err.firstName = "Please add your first name.";
    } else if (firstName.length > 50) {
      err.firstName = "First name is up to 50 characters long.";
    }

    if (!lastName) {
      err.lastName = "Please add your first name.";
    } else if (lastName.length > 50) {
      err.lastName = "First name is up to 50 characters long.";
    }

    if (!cardNumber) {
      err.cardNumber = "Please add your card number.";
    } else if (!validateCardNumber(cardNumber)) {
      err.cardNumber = "Please enter your 16 digit credit card numbers";
    }

    if (!expiredDate) {
      err.expiredDate = "Please add expried date of your card number.";
    } else if (
      expiredDate.length !== 5 ||
      !expiredDate.includes("/") ||
      isNaN(parseInt(monthOfExprireDate)) ||
      isNaN(parseInt(yearOfExprireDate))
    ) {
      err.expiredDate = "Please enter card number format as MM/YY";
    }

    if (!securityCode) {
      err.securityCode = "Please add security code of your card number.";
    } else if (securityCode.length !== 3 || isNaN(parseInt(securityCode))) {
      err.expiredDate = "Your CVV code is not valid";
    }

    if (!agree) {
      err.agree = "You must agree to the terms and conditions to continue.";
    }

    return {
      errMsg: err,
      errLength: Object.keys(err).length,
    };
  },
};

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function validateUsername(username) {
  const re =
    /^[a-zA-Z0-9](_(?!(\.|_))|\.(?!(_|\.))|[a-zA-Z0-9]){6,18}[a-zA-Z0-9]$/;
  return re.test(username);
}

function validateCardNumber(cardNumber) {
  const re = /^\d{16}$/;
  return re.test(cardNumber);
}

function validateBirthday(day, month, year) {
  const dayCheck = /^(0?[1-9]|[12][0-9]|3[01])$/;
  const monthCheck = /^([1-9]|1[0-2])$/;
  const yearCheck = /^\d{4}$/;
  const changeMonth = getMonth(month);

  if (
    monthCheck.test(changeMonth) &&
    dayCheck.test(day) &&
    yearCheck.test(year)
  ) {
    const ListofDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (changeMonth === 1 || changeMonth > 2) {
      if (day > ListofDays[changeMonth - 1]) {
        return "Day of this month is not valid.";
      }
    }

    if (changeMonth === "2") {
      let leapYear = false;
      if ((!(year % 4) && year % 100) || !(year % 400)) {
        leapYear = true;
      }
      if (leapYear === true && day > 29) {
        return "February of leap year has up to 29 days";
      }
      if (leapYear === false && day > 28) {
        return "February of non-leap year has up to 28 days";
      }
    }
  }
}

function getMonth(month) {
  switch (month) {
    case "Jan":
      return (month = "1");
    case "Feb":
      return (month = "2");
    case "Mar":
      return (month = "3");
    case "Apr":
      return (month = "4");
    case "May":
      return (month = "5");
    case "Jun":
      return (month = "6");
    case "Jul":
      return (month = "7");
    case "Aug":
      return (month = "8");
    case "Sep":
      return (month = "9");
    case "Oct":
      return (month = "10");
    case "Nov":
      return (month = "11");
    case "Dec":
      return (month = "12");
    default:
      break;
  }
}
