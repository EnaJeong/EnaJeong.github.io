---
category: 'Data Analysis'
tags: ['AD(s)P']
title: "[AD(s)P] 결측값 처리와 이상값 검색"
---

## 데이터 탐색

데이터 기초 통계

summary 함수

- 연속형 변수 : 4분위수, 최소값, 최대값, 중앙값, 평균 등을 출력
- 범주형 변수 : 각 범주에 대한 빈도수를 출력하여 데이터 분포 파악

연속형 변수 경우, cov와 cor 함수를 통해 공분산행렬과 상관계수행렬을 출력 → 변수 간 선형 상관관계 강도 확인

<br>


## 결측값(Missing data) 처리

가능하면 결측값은 제외하고 처리하는 게 적합하지만 결측값 자체가 의미 있는 경우 존재

결측값 처리 방법은 전체 작업속도에 많은 영향을 주므로 자동화하면 업무 효율성 향상

R 결측값 처리 관련 패키지 : Amelia II, Mice, mistools 등

> NA (Not Available) : 결측값
> <br>
> NaN (Not a Number) : 불가능한 값
>
> → is.na 이용해 결측값 여부 확인 가능

<br>


### 단순 대치법 (Single Imputation)

#### Completes Analysis
: 해당 레코드 모두 삭제 (일반적인 결측값 처리 방식)

→ 전체적으로 결측값이 많은 레코드에 분포하면 너무 많은 자료가 삭제돼 정보 획득이 어려움

#### Mean Imputation (평균대치법)
: 데이터의 평균으로 대치

- 비조건부 평균 대치법 : 관측데이터의 평균으로 대치
- 조건부 평균 대치법 (regression imputation) : 회귀분석을 활용한 대치법

#### Single Stochastic Imputation (단순확률 대치법)

→ 평균대치법에서 추정량 표준 오차의 과소 추정문제를 보완하고자 고안된 방안

- Hot-deck 방법 :
- nearest neighbor 방법 :

<br>


### 다중 대치법 (Multiple Imputation)
: 단순대치법을 한 번 하지 않고 m 번의 대치를 통해 m개의 가상적 완전 자료를 만드는 방법

대치 (imputation step) → 분석 (analysis step) → 결합 (combination step)

<br>


## 이상값(Outlier) 검색

분석에서 전처리를 어떻게 할지를 결정할 때와 부정사용방지 시스템에서 규칙을 발견하는데 사용 가능

> FDS, Fraud Detection System

<br>

(a1) 의도하지 않게 잘못 입력한 경우

(a2) 의도하지 않게 입력됐으나 분석 목적에 부합되지 않아 제거해야 하는 경우

(a3) 의도되지 않은 현상이지만 분석에 포함해야하는 경우

(b1) 의도된 이상값 -> 대부분 사기(fraud)

> (a1), (a2) → bad data
> <br>
> (a3), (b1) → 이상값

<br>

관련 알고리즘: ESD(Extreme Studentized Deviation), MADM 등

ESD - 평균으로부터 k*표준편차만큼 떨어진 값을 이상값으로 판단하고 일반적으로 k는 3으로 한다.

이상값 검색에 너무 많은 시간을 쓰는 것 비추천. 단, 부정사용방지 프로젝트에서는 많은 시간을 할당해야 함.

→ 평균과 중위권 값을 파악해 제 1사분위수(Q1), 제 3사분위수(Q3)를 보면 1차 판단

좀 더 시간이 된다면 주요 변수(dimension)별로 플롯해보며 특성 파악
