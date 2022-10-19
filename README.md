# Wanted Pre_On_Boarding_4th_Project
# 룰루랩 - 병원 예약 시스템 구축

![JavaScript Badge](https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)&nbsp;
<img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white"> &nbsp;
<img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white">&nbsp;
<img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white">&nbsp;

## 개요

병원 진료 예약 API를 구현하였습니다.
구현된 기능은 다음과 같습니다.

1. 예약가능한 병원 및 예약시간 조회
2. 진료예약 - 예약번호 부여
3. 예약번호/이름을 통한 예약내역조회
4. 예약번호를 통한 예약정보변경
---

- 개발기간: 2022.10.17 - 2022.10.19 (3일)
- 개발인원: 김민우(백엔드)

## DB모델링

![lululab](https://user-images.githubusercontent.com/70873668/196758236-ef783330-f4f1-4a1d-87bd-8d2eb33232d6.png)

## API doc

### Postman

- 👉 [Postman API doc](https://documenter.getpostman.com/view/22703204/2s847LMBC2)

## 구현 기능에 대한 소개

### 1. 예약가능한 병원 조회 기능

🔷 예약가능한 병원을 조회하는 API입니다.

* 예약가능한 병원의 이름,주소,연락처를 조회합니다.
* 예약이 가능한 일정이 있는 병원을 모두 조회합니다.
* 예약이 불가능한 병원은 목록에서 제외됩니다.

(등록된 병원 DATA는 1~5까지 총 5개 입니다)

---

### 2. 예약가능한 시간 조회 기능

🔷 예약가능한 시간을 조회하는 API입니다.

* date와 clinic_id를 쿼리를 통해 전달받습니다.
* date와 clinic_id은 필수 입력사항으로 전달되는 값이 없을 경우 에러를 반환합니다.
* 예약이 완료된 시간은 목록에서 제외됩니다.

(등록된 schedule의 data는 프로젝트 제작일 기준으로 221018~221021까지 등록하였습니다. 해당일자 외의 일자를 전달할 경우 데이터가 없어 조회되는 값이 없습니다.)

---

### 3. 진료예약 기능 

🔷 진료 예약을 등록하는 API입니다.

* Request body를 통해 전달받은 정보로 예약을 진행합니다.
* 입력되지 않는 값이 있을 경우 에러를 반환합니다.
* 전달받는 이름에 대해 정규표현식을 통한 유효성 검사를 진행합니다.
* 이미 예약된 schedule_id가 전달될 경우 에러를 반환합니다.
* 등록된 phone 정보가 있을 경우 user의 id를 재사용합니다.
* 예약완료시 'yymmddxxxx' 10자리의 난수를 자동 생성하여 예약번호로 전달합니다.

bookingTypeId의 데이타는 다음과 같습니다. (총 5개)
1 - 외래진료
2 - 건강검진
3 - 정기검진
4 - 재검진
5 - 약처방

---

### 4. 예약조회 기능

🔷 이름/예약번호를 통해 예약정보를 조회하는 API입니다.

* Request query를 통해 이름 or 예약번호를 전달받습니다.
ex)
1. /booking?bookingNumber=2210204387 - 예약번호 입력시
2. /booking?name=홍길동 - 이름 입력시

* 전달받은 정보로 예약정보를 모두 조회하여 전달합니다.

---
### 4. 예약변경기능

🔷 예약번호를 통해 예약정보를 변경하는 API입니다.

* Request Body를 통해 예약번호와 변경을 원하는 정보를 전달받습니다.
* 전달 받은 정보를 통해 user의 정보도 변경합니다.
* name / scheduleId / bookingTypeId 중 원하는 것을 선택하여 변경이 가능합니다. (부분제외 및 전체선택 모두 가능)
* 예약정보 변경 후 완료 message를 전달합니다.
