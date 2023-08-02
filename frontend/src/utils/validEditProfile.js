const validEditProfile = ({ firstName, lastName, mobile, story }) => {
  const err = {};
  if (!firstName) {
    err.firstName = 'Please add your first name.';
  } else if (firstName.length > 50) {
    err.firstName = 'First name is up to 50 characters long.';
  }

  if (!lastName) {
    err.lastName = 'Please add your last name.';
  } else if (firstName.length > 50) {
    err.lastName = 'Last name is up to 50 characters long.';
  }

  if (!validPhone(mobile)) {
    err.mobile = 'Phone can not contain alphabet.';
  }

  if (story.length > 200) {
    err.story = 'Story is up to 200 characters long.';
  }

  return {
    errMsg: err,
    errLength: Object.keys(err).length,
  };
};

function validPhone(mobile) {
  const re = /^[0-9]*$/;
  return re.test(mobile);
}

export default validEditProfile;
