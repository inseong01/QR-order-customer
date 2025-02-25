import styles from '@/style/visitor/call/CallPageMain.module.css';
import RequestList from './RequestList';

import { useQueryClient } from '@tanstack/react-query';

function ErrorMessageComponent() {
  return <p className={styles.error}>카운터에서 요청해 주세요.</p>;
}

export default function CallPageMain() {
  // useQueryClient
  const queryClient = useQueryClient();
  const request = queryClient.getQueryState(['requestCategory']);
  // variant
  const isError = request === undefined || request.status === 'error';
  const title = isError ? '요청 목록 오류' : '요청 항목을 선택해주세요';

  return (
    <main className={styles.main}>
      <div className={styles.top}>
        <div className={styles.title}>{title}</div>
        <div className={styles.line}></div>
      </div>
      {isError ? <ErrorMessageComponent /> : <RequestList data={request.data} />}
    </main>
  );
}
