const GITHUB_OAUTH_URL = 'https://github.com/login/oauth/authorize';

// 希望得到的授权
const SCOPE = 'user';

// https://github.com/settings/developers
// 在 github 上注册的 App 的 Client ID
const client_id = '246560ac02e68a37f12b';
// 在 github 上注册的 App 的 Client Secret
const client_secret = 'a41f9423c793d224b3d268efb1d26e28e9faa281';

module.exports = {
  github: {
    request_token_url: 'https://github.com/login/oauth/access_token',
    client_id,
    client_secret,
  },
  GITHUB_OAUTH_URL,
  OAUTH_URL: `${GITHUB_OAUTH_URL}?client_id=${client_id}&scope=${SCOPE}`,
};
