import { $api } from '@/API';

export const getTariffsList = async (id: string) => {
  try {
    const res = await $api.get(`dashboard/tickets/tariffs/list/?branch=${id}`);
    return res.data;
  } catch (e: any) {
    return e.response.data;
  }
};


export const getExtraServicesList = async (id: string) => {
  try {
    const res = await $api.get(`dashboard/extra-services/branch-services/?branch=${id}`);
    return res.data;
  } catch (e: any) {
    return e.response.data;
  }
};
