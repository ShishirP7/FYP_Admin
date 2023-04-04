import { useCookies } from 'react-cookie';
import jwt_decode from 'jwt-decode';

const GetCookieData = () => {
  const [cookies] = useCookies(['token_Admin']);

  if (!cookies.token_Admin) {
    return { error: 'No token found.' };
  }

  const decoded = jwt_decode(cookies.token_Admin);

  return decoded;
};

export default GetCookieData;