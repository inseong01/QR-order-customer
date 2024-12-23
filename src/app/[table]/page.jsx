'use client';

import InitialClientPage from '@/components/visitor/InitialClientPage';
import { setTableNum } from '@/lib/features/userState/userSlice';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

function Page() {
  const pathName = usePathname();
  const dispatch = useDispatch();

  useEffect(() => {
    const tableNum = Number(pathName.replace('/', ''));
    dispatch(setTableNum({ tableNum }));
  }, []);

  return <InitialClientPage />;
}

export default Page;
