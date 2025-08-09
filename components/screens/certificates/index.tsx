import React from 'react';
import Header from '@/components/layout/header';
import UploadButton from '@/components/shared/upload-btn';
import PageContentWrapper from '@/components/ui/page-content-wrapper';
import AddNewBtn from '@/components/shared/add-new-btn';
import CertificateCard from '@/components/shared/certificate-card';

const mockData = [
  {
    title: 'Sky Kids',
    sky: 14,
    age: '1-5',
    id: 1,
  },
  {
    title: 'Sky Kids',
    sky: 14,
    age: '1-5',
    id: 2,
  },
  {
    title: 'Sky Kids',
    sky: 14,
    age: '1-5',
    id: 3,
  },
  {
    title: 'Sky Kids',
    sky: 14,
    age: '1-5',
    id: 4,
  },
  {
    title: 'Sky Kids',
    sky: 14,
    age: '1-5',
    id: 5,
  },
  {
    title: 'Sky Kids',
    sky: 14,
    age: '1-5',
    id: 6,
  },
  {
    title: 'Sky Kids',
    sky: 14,
    age: '1-5',
    id: 7,
  },
];


const CertificateScreen = () => {
  return (
    <>
      <Header title={'Сертификаты'} btn={<UploadButton />} />
      <PageContentWrapper filters={true} search={true} title={'Все сертификаты'} inpPosition={'left'}
                          btn={<AddNewBtn route={'/creative/certificates/create'} text={'Создать ceртификат'} />}>
        <div className={'grid grid-cols-2 gap-6 flex-1'}>
          {
            mockData.map((item) => (
              <CertificateCard key={item.id} title={item.title} age={item.age} />
            ))
          }
        </div>
      </PageContentWrapper>
    </>
  );
};

export default CertificateScreen;
