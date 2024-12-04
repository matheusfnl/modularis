import axios from 'axios';

export default async function(body) {
  console.log(body)

  const { data } = await axios.post('register', body);

  return data;
}
