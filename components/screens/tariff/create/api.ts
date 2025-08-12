import { ITariffForm } from '@/components/screens/tariff/create/index';
import { $api } from '@/API';

type TariffData = Omit<ITariffForm, 'logo' | 'illustration'> & {

}

export const onCreateTariff = async (data: TariffData) => {
  try {
    const res = await $api.post('dashboard/tickets/tariffs/create/', {
      branch: Number(data.filial),
      name: data.name,
      price: data.price,
      description: '',
      // image: '',
      is_active: true,
      min_age: Number(data.minAge),
      max_age: Number(data.maxAge),
      valid_days: Number(data.bonus),
    });
    return res.data;
  } catch (e: any) {
    throw Error(e.response.data);
  }
};
