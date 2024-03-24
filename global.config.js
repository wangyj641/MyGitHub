// Github OAuth app client id
const client_id = '246560ac02e68a37f12b';
// Github OAuth app Client Secret
const client_secret = 'a41f9423c793d224b3d268efb1d26e28e9faa281';

const SCOPE = 'user';

const GITHUB_OAUTH_URL = 'https://github.com/login/oauth/authorize';

module.exports = {
  github: {
    request_token_url: 'https://github.com/login/oauth/access_token',
    client_id,
    client_secret,
  },
  GITHUB_OAUTH_URL,
  OAUTH_URL: `${GITHUB_OAUTH_URL}?client_id=${client_id}&scope=${SCOPE}`,
};
