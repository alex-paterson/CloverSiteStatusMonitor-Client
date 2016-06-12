var API_URL = process.env.API_URL;

exports.SIGNIN_URL = `${API_URL}/signin`;
exports.SIGNUP_URL = `${API_URL}/signup`;

exports.QUERY_URL = `${API_URL}/query`;

exports.USER_URL = (user_id) => `${API_URL}/users/${user_id}`;
exports.USER_SITES_URL = (user_id) => `${API_URL}/users/${user_id}/sites`;
exports.SITE_URL = (user_id, site_id) => `${API_URL}/users/${user_id}/sites/${site_id}`;
exports.TESTS_URL = (user_id, site_id) => `${API_URL}/users/${user_id}/sites/${site_id}/tests`;
exports.TEST_URL = (user_id, site_id, test_id) => `${API_URL}/users/${user_id}/sites/${site_id}/tests/${test_id}`;
// exports.USER_SITES_URL = `${API_URL}/users/${localStorage.getItem('user_id')}/sites`;


// exports.RESET_PASSWORD_URL = `${API_URL}/reset_password`;

// exports.RESET_PASSWORD_COMPLETE_URL = (user_id) => {
//   return `${API_URL}/users/${user_id}/reset_password`;
// }
