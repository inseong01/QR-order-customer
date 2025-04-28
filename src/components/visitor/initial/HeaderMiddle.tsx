import { useBoundStore } from '@/lib/store/useBoundStore';

import { motion } from 'motion/react';

export default function HeaderMiddle() {
  return (
    <div className='font-bold'>
      <TopContext />
      <p>주문하실 음식을 골라주세요</p>
    </div>
  );
}

function TopContext() {
  const tableName = useBoundStore((state) => state.tableState.tableName);

  return (
    <div className={'flex gap-2 mb-1'}>
      <h1 className='text-2xl'>희락카츠 </h1>
      {tableName && (
        <motion.span
          className={'text-sm'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          #{tableName}
        </motion.span>
      )}
    </div>
  );
}
