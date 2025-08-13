import { $api } from '@/API';

interface ServiceData {
  image: File | null;
  title: string;
  description: string;
}

export const onCreateAdditionalService = async (data: ServiceData) => {
  try {
    const formData = new FormData();

    formData.append('name', data.title);
    formData.append('description', data.description);

    if (data.image) {
      formData.append('image', data.image);
    }

    const res = await $api.post('dashboard/extra-services/services/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return res.data;
  } catch (e: any) {
    throw e.response?.data || e.message;
  }
};
