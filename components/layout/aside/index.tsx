'use client';

import React from 'react';
import Image from 'next/image';
import MAIN_LOGO_SVG from '../../../assets/svg/logo.svg';
import { asideAtom } from '@/lib/store/atoms/aside.atom';
import { useAtom } from 'jotai';
import BTN_ICON_SVG from '../../../assets/svg/btnIcon.svg';
import { usePathname, useRouter } from 'next/navigation';
import { AsideType } from '@/lib/types/aside.type';
import ARROW_SVG from '../../../assets/svg/arrow.svg';
import BRANCH_SVG from '../../../assets/svg/branch.svg';

const Aside = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [asideTabList, setAsideTabList] = useAtom(asideAtom);

  const onClickBtn = (el: AsideType, i: number) => {
    if (el.subPath) {
      router.push(`${el.path}/${el.subPath[0].path}`);
      setAsideTabList((prev) =>
        prev.map((item, index) =>
          index === i
            ? { ...item, visibleState: !item.visibleState }
            : item,
        ),
      );
    } else {
      router.push(el.path);
      setAsideTabList((prev) =>
        prev.map((item) => ({
          ...item,
          visibleState: false,
        })),
      );
    }
  };
  return (
    <aside
      className={'flex flex-col transition-all gap-5 bg-[var(--aside-bg)] py-[40px] p-[10px] relative w-full h-full border-r-[1px] border-[var(--border-color)]'}>
      <Image src={MAIN_LOGO_SVG} alt={'logo'} width={48} height={48} />
      <section className={'flex flex-col gap-1'}>
        {
          asideTabList.map((el, i) => (
            <React.Fragment key={`${el.path}_${i}`}>
              <button
                onClick={() => onClickBtn(el, i)}
                className={`rounded-xl cursor-pointer flex items-center justify-between transition-all ease-in-out p-4 text-start border-[1px] border-[var(--aside-bg)] ${pathname == el.path && !el.subPath && 'border-[var(--border-color)] border-[1px] shadow '}`}
                key={`${el.path}_${i}`}>
                <div className={'flex items-center gap-2'}>
                  <Image className={`${pathname != el.path && 'contrast-50'}`} src={BTN_ICON_SVG} alt={'btn'} width={18}
                         height={18} />
                  <h5 className={`text-[14px] font-semibold ${pathname != el.path && 'contrast-50'}`}>
                    {el.title}
                  </h5>
                </div>
                {
                  el.subPath?.length &&
                  <Image className={`${el.visibleState ? 'contrast-50' : 'rotate-180'} transition-all`}
                         width={8} height={4}
                         src={ARROW_SVG}
                         alt={'arrow'} />
                }
              </button>
              <div className={`${!el.visibleState ? 'h-[0px]' : 'h-fit'} flex flex-col p-4 mt-[-19px]`}>
                {
                  el.visibleState &&
                  el.subPath?.map((el, index, array) => <div
                    onClick={() => router.push(`/${pathname.split('/')[1]}/${el.path}`)}
                    key={`${el.title}_${el.path}_${index}`}
                    className={'flex cursor-pointer items-center border-l-[2px] last:border-none ml-[9px] py-2 relative transition-all ease-in-out'}>
                    <div className={'w-[18px]'}></div>
                    <h4
                      className={`text-[#727272] transition-all text-[14px] z-[1] bg-[var(--aside-bg)] rounded-xl ml-[-5px] mt-[-7px] w-full p-3 ${`/${pathname.split('/').slice(-1)[0]}` == el.path && ' border-[var(--border-color)] border-[1px] shadow  '}`}>{el.title}</h4>
                    <Image src={BRANCH_SVG} alt={'branches'}
                           className={`absolute left-[-2px] top-[7px] z-[0] last:top-[-3px] ${array.length - 1 == index && 'left-[0px]'}`} />
                  </div>)
                }
              </div>
            </React.Fragment>
          ))
        }
      </section>
      <Image src={MAIN_LOGO_SVG} className={'absolute bottom-[40px]'} alt={'logo'} width={48} height={48} />
    </aside>
  );
};

export default Aside;