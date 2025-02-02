![qr-order-customer-img](./docs/src/img/qr-order-customer.png)

## QR-Order-Customer
QR 코드로 접속해 주문과 테이블 요청을 할 수 있는 **고객 주문 웹 애플리케이션**입니다.

이 웹 애플리케이션은 [QR-order-admin 프로젝트](https://github.com/inseong01/QR-order-admin)와 연계됩니다.

## 프로젝트
### 목표
#### "효율적인 주문 접근"    
메뉴판을 찾을 필요 없이 스마트폰으로 메뉴 즉시 확인, 주문 과정 진입 시간 최소화

#### "사용자 만족도 향상"    
웹 구조 복잡함 없이 필요한 정보 제공, 주문 과정 직관화

### 주요 기능 
메뉴
1. 카테고리 별 메뉴 분류
2. 장바구니
   
테이블 요청   
주문 목록    
계산서
주문

### 기술 스택
`React` `Next` `Tanstack React Query` `Zustand` `Supabase`
## 미리보기
**매뉴 탐색**

![](./docs/src/gif/menu-1-search.gif)

**메뉴 주문**

![](./docs/src/gif/menu-2-pick%20check%20order.gif)

**직원 요청**

![](./docs/src/gif/call-3-list.gif)

**주문목록 확인**

![](./docs/src/gif/order-4-list.gif)

**계산서 확인**

![](./docs/src/gif/bill-5.gif)


## 체험하기

클릭하면 [QR-ORDER 고객 전용 서비스](https://qr-order-client.vercel.app/1)를 웹 브라우저에서 경험할 수 있어요.    

![](./docs/src/img/table-1-QRcode.png)

상단 QR 코드를 스캔해도 동일한 매장 1번 테이블로 접속돼요 😊   
모바일과 태블릿만 주문 서비스를 이용할 수 있도록 제한하고 있어요

PC에서도 온전히 이용할 수 있도록 [개발 링크](https://qr-order-client-cece8e3gh-inseongs-projects-ab5eeeed.vercel.app/1)를 준비했어요

## 설치하기
```bash
# 리포지토리를 클론합니다
git clone https://github.com/inseong01/QR-order-customer.git

# 프로젝트 디렉터리로 이동합니다
cd qr-order-customer

# 필요한 패키지를 설치합니다
npm install
```

### 서버 접속
```bash
# .env 파일이 존재하지 않아 서버를 생성/접속할 수 없어요 :(
```

<br />

---

<img src="./docs/src/img/qr-order-logo.png" width="150px" align="right" />