import styles from '@/app/page.module.css'
import LogoImage from '@/components/visitor/initial/LogoImage'

import Link from 'next/link'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.wrap}>
        <div className={`${styles.top} ${styles.flex}`}>
          <div className={styles.content}>
            <h1>반갑습니다 &#x003A;&#x0029;</h1>
            <div className={styles.sub}>
              <p>주문의 간편함을 추구하는</p>
              <p>QR-ORDER 입니다.</p>
            </div>
            <div className={styles.sub2}>
              <p>주문하시려는 경우 QR코드를 다시 스캔해주세요</p>
            </div>
          </div>
          <div className={styles.links}>
            <p>자세한 내용 확인하기</p>
            <div>
              <Link href={'https://github.com/inseong01/QR-order-customer'} className={styles.btn} >
                관리자
              </Link>
              <Link href={'https://github.com/inseong01/QR-order-admin'} className={styles.btn} >
                고객
              </Link>
            </div>
          </div>
        </div>
        <div className={`${styles.btm} ${styles.flex}`}>
          <LogoImage />
        </div>
      </div>
    </main>
  )
}
