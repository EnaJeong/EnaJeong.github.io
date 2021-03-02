---
category: 'Data Analysis'
tags: ['AD(s)P']
title: "[AD(s)P] 통계 분석 (4) 시계열분석 (Time Series Analysis)"
---

시계열 분석 (Time Series Analysis)

<br>

## 정상성 (Stationary)
1. 평균이 일정하다
2. 분산이 시점에 의존하지 않는다
3. 공분산은 단지 시차에만 의존하고 시점 자체에는 의존하지 않는다

> 시계열 분석을 위해서는 정당성을 만족해야 함

<br>

### 비정상 시계열
: 정상성 조건을 하나라도 만족하지 못하는 경우의 시계열 자료

→ 정당성을 만족하도록 데이터를 정상 시계열 자료로 만든 후에 시계열 분석 수행

1. 이상점(Outlier) → 제거
2. 개입(Intervention) → 회귀분석 수행
3. 추세를 보이는 경우 (평균이 일정하지 않은 경우) → 차분(Difference)
<br>
> 차분 : 현 시점의 자료값 - 전 시점의 자료값
>
> - 일반적인 차분 : 현 시점의 바로 전 시점의 자료값을 빼는 것
> - 계절차분 (Seasonal Difference) : 여러 시점 전의 자료값을 뺌
4. 시간에 따라 분산이 일정하지 않은 경우 → 변환 (Transformation)

<br>


## 시계열 모형

### 자기회기 모형 (AR, Autoregressive model)
: 현 시점의 자료가 p 시점 전의 유한개의 과거 자료로 설명될 수 있다는 의미.

AR(p) 모형

<br>

### 이동평균모형 (MA, Moving Average model)
: 현 시점의 자료가 유한개의 백색잡음의 선형결합으로 표현.

MA(p) 모형 → p 시점 전까지의 백색잡음으로 표현

<br>

### 자기회귀누적이동평균모형 (ARIMA, Autoregressive Integrated Moving Average model)
: 기본적으로 비정상 시계열 모형, 차분이나 변환을 통해 AR 모형이나, MA 모형, ARMA 모형으로 정상화 가능

ARIMA(p, d, q) → p는 AR 모형, q는 MA 모형과 관련. d = ARIMA에서 ARMA로 몇 번 차분 했는지 의미

> d=0 이면 ARMA(p,q) 모형 & 정상성 만족
> <br>
> p=0 이면 IMA(d,q) 모형 & d번 차분하면 MA(q) 모형
> <br>
> q=0 이면 ARI(p,d) 모형 & d번 차분하면 AR(p) 모형

<br>

### 분해 시계열
: 시계열에 영향을 주는 일반적인 요인을 시계열에서 분리해 분석하는 방법

분해식의 일반적 정의 : Z = f(T , S , C , I )

1. 추세요인 (Trend factor)
<br>
→ 자료가 어떤 특정한 형태(선형적, 이차식 형태, 지수적 형태 등)를 취할 때 추세요인이 있다고 함.
2. 계절요인 (Seasonal factor)
<br>
→ 고정된 주기(요일마다 반복, 월별 변화, 분기별 변화 등)에 따라 자료가 변화할 경우 계절요인이 있다고 함.
3. 순환요인 (Cyclical factor)
<br>
→ 명백한 경제적이나 자연적인 이유 없이 알려지지 않은 주기를 가지고 변화할 경우 순환요인이 있다고 함.
4. 불규칙요인 (Irregular factor)
<br>
→ 위 세 가지의 요인으로 설명할 수 없는 오차에 해당하는 요인
