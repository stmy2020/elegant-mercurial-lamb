const { URL_USERPROFILES, URL_USERS } = require('../constants/constants.js');
const axios = require('axios');

/**
 * Validate the user to see if he/she is registered and age is below 10
 * @param {string} username username
 * @param {string} wish free text the user write
 * @returns {Promise<{ user: Object|null, message: string }>} An object containing:
 * - user: The user object with uid, username, address, and wish properties, or null if the user is not eligible.
 * - message: A string indicating the reason for ineligibility or "request_receive" if the user is eligible.
 */
exports.checkUser = async (username, wish) => {

  if (username.trim().length === 0) {
    return { user: null, message: "user_not_registered" };
  }

  // get registered users
  const registeredUsers = await getRegisteredUsers();

  // find username in registered users
  const registeredUser = registeredUsers.data.find((registeredUser) => registeredUser.username === username);
  if (!registeredUser) {
    return { user: null, message: "user_not_registered" };
  }

  // get user profiles
  const userProfiles = await getUserProfiles();

  // find corresponding userprofile
  const userProfile = userProfiles.data.find((userProfile) => userProfile.userUid === registeredUser.uid);
  if (!userProfile) {
    return { user: null, message: "profile_not_match" };
  }

  // get age
  const age = userProfile ? getAge(userProfile.birthdate): -1

  // check user age
  if (age > 0 && age < 10) {
    return {
      user: {
        uid: registeredUser.uid,
        username: registeredUser.username,
        address: userProfile.address,
        wish: wish
      },
      message: "request_receive",
    };
  } else {
    return { user: null, message: "age_not_less_than_10" };
  }
};

/**
 * Fetch registered users
 * @returns registered users response
 */
const getRegisteredUsers = async () => {
  return axios.get(URL_USERS)
  .catch(error => {
    console.error('Error while fetching registered users:', error);
  });
}

/**
 * Fetch user profiles
 * @returns user profiles response
 */
const getUserProfiles = async() => {
  return axios.get(URL_USERPROFILES)
  .catch(error => {
    console.error('Error while fetching user profiles:', error);
  });
}

/**
 * Calculate the age from birthdate
 * @param {*} birthdate
 * @returns age
 */
const getAge = (birthdate) => {
  const d1 = new Date(birthdate);
  const d2 = new Date();
  return d2.getFullYear() - d1.getFullYear();
};