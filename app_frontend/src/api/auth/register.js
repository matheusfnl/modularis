import axios from 'axios';

export default async function(body) {
  const { data } = await axios.get('register', body);

  return data;
}
