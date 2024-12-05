import axios from 'axios';

export default async function(tenant_id) {
  const { data } = await axios.post(`tenants/${tenant_id}/tokens`);

  return data;
}
