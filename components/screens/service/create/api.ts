import { $api } from '@/API';

export const onCreateService = async (data: any) => {
  try {
    const res = await $api.post('dashboard/extra-services/branch-services/', {
      branch: Number(data.filial),
      service: Number(data.service),
      duration_minutes: Number(data.bonus),
      price: Number(data.price),
      min_age: Number(data.minAge),
      max_age: Number(data.maxAge),
      is_active: true,
    });
    return res.data;
  } catch (e: any) {
    return e.response.data;
  }
};
