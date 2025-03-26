import Cookies from 'js-cookie';

const getAccessToken = () => {
  const cookie = Cookies.get('TRAX_ACCESS_TOKEN');
  console.log(cookie);
  if (cookie) {
    return cookie;
  }

  return null;
};

export default getAccessToken;
