// import styles from '@/style/NotFound.module.css'
import styles from '@/app/page.module.css'
import LogoImage from '@/components/visitor/initial/LogoImage';

import { cookies } from 'next/headers';
import Link from 'next/link';

export default async function NotFound() {
  const cookie = await cookies();
  const table = cookie.get('table');
  /*
    쿠키 값
    : 미들웨어 검증을 통해 정상 형태(정수) 

    쿠키 X
    - 홈페이지 이동
    쿠키 O
    - 원래 테이블 이동
  */
  const link = table?.value ? `/${table.value}` : '/';

  return (
    <main className={styles.main}>
      <div className={styles.wrap}>
        <div className={`${styles.top} ${styles.flex}`}>
          <div className={styles.content}>
            <h1>404 &#x003A;&#x0028;</h1>
            <div className={styles.sub}>
              <p>페이지가</p>
              <p>존재하지 않아요.</p>
            </div>
          </div>
          <div className={styles.links}>
            <div >
              <Link href={link} className={styles.btn}>돌아가기</Link>
            </div>
          </div>
        </div>
        <div className={`${styles.btm} ${styles.flex}`}>
          <LogoImage />
        </div>
      </div>
    </main>
  );
}
