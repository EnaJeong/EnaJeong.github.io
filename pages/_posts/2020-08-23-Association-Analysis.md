---
category: 'Data Analysis'
tags: ['AD(s)P']
title: "[AD(s)P] 연관 분석 (Association Analysis)"
---

연관 규칙 (Association Rule)
: 항목들 간의 ‘조건-결과’(if-then)식으로 표현되는 유용한 패턴

<br>

연관분석(Association analysis) / 장바구니분석(Market basket analysis)
: 연관규칙을 발견해내는 것

<br>

데이터의 형태 : 장바구니 데이터
> Transaction : 장바구니 하나에 해당하는 정보

도출된 연관규칙은 사소한 일반적으로 잘 알려진 사실이 아니라 분명하고 유용해야 함

<br>


## 연관규칙의 측정지표

도출된 연관규칙이 얼마나 유의미한지 평가하기 위한 지표

<br>

### 지지도(support)
: 전체 거래 중에서 품목 A, B가 동시에 포함되는 거래의 비율

지지도 = P(A∩B) = (A와 B가 동시에 포함된 거래수) / (전체 거래수)

> 연관규칙이 나왔을 때 적응성이 있는지 판단 가능 & 불필요한 분석을 대폭 줄일 수 있음

<br>

### 신뢰도(confidence)
: 품목 A가 포함된 거래 중에서 품목 A, B가 동시에 포함되는 거래의 확률

신뢰도 = P(A \| B) = (A와 B가 동시에 포함된 거래수) / (A를 포함하는 거래수)

> 연관성 정도 파악 가능

<br>

### 향상도 (lift)
: 품목 B를 구매한 고객 대비 품목 A를 구매한 후 품목 B를 구매하는 고객에 대한 확률

향상도 = P(B \| A) / P(B) = (A와 B가 동시에 포함된 거래수) / (A를 포함하는 거래수 X B를 포함하는 거래수)

> 향상도 \> 1 ㅤ→ㅤ A와 B의 연관성 ↑
> <br>
> 향상도 = 1 ㅤ→ㅤ A와 B 연관성 X ㅤ(∵ 서로 독립)
> <br>
> 향상도 < 1 ㅤ→ㅤ 음의 상관관계 ㅤ(연관성 X, 우연적 기회보다 도움 X)

<br>


## 연관 분석 절차
Apriori 알고리즘 : 최소 지지도보다 큰 집합만큼 대상으로 높은 지지도를 갖는 품목 집합을 찾는 것

1. 최소 지지도 설정
2. 개별 품목 중에서 최소 지지도를 넘는 모든 품목을 찾는다
3. (2)에서 찾은 개별 품곤 만을 이용하여 최소 지지도를 넘는 2가지 품목 집합을 찾는다
4. 위의 두 절차에서 찾은 품목 집합을 결합하여 최소 지지도를 넘는 3가지 품목 집합을 찾는다
5. 반복적으로 수행해 최소 지지도가 넘는 빈발품목 집합을 찾는다

<br>


## 연관 분석의 장점

- 탐색적인 기법
<br>
> 조건 반응(if- then)으로 표현되는 연관 분석의 결과를 이해하기 쉽다.

- 강력한 비목적성 분석기법
<br>
> 분석 방향이나 목적이 특별하게 없는 경우 목적변수가 없으므로 유용하다

- 사용이 편리한 분석 데이터의 형태
<br>
> 거래 내용에 대한 데이터를 변환 없이 이용할 수 있는 간단한 자료구조

- 계산의 용이성
<br>
> 분석을 위한 계산이 상당히 간단하다

<br>


## 연관규칙의 단점
- 상당 수의 계산과정
<br>
> 품목보다 증가하면 분석에 필요한 계산이 기하급수적으로 늘어난다

- 적절한 품목의 결정
<br>
> 너무 세분화된 품목을 가지고 연관규칙을 찾으려고 하면 의미 없는 결과 도출 가능

- 품목의 비율차이
<br>
> 상대적으로 거래량이 적은 품목은 포함된 거래수가 적으므로 규칙 발경시 제외되기 쉬움

<br>


## 순차패턴
: 어떠한 고객의 시간에 따른 구매 정보를 활용해 연관규칙을 발견하기도 함

“품목 A를 구매하면 추후에 품목 B도 구매한다.”

→ 구매 순서가 고려되어 상품 간의 연관성이 측정되고, 유용한 연관규칙을 찾는 기법

데이터에 각각의 고객으로부터 발생한 구매시점에 대한 정보 필요
