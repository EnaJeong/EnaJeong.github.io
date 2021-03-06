---
category: 'Data Analysis'
tags: ['AD(s)P']
title: "[AD(s)P] 통계 분석 (1) 개론"
---

통계학 : 자료로부터 유용한 정보를 이끌어 내는 학문 (자료의 수집, 정리, 해석하는 방법 등 모두 포함)

## 개요

모집단 : 유용한 정보의 대상 전체

> 모집단의 구성 개체 : 추출단위 또는 원소

<br>

모집단 조사 방법

- 총조사(census) : 모집단의 개체 모두 조사
- 표본(sample)조사 : 일부만 조사하여 모집단에 대해 추론

> \- 표본 (sample) : 모집단의 조사하는 일부분
> <br>
> \- 모수 (parameter) : 모집단에 대해 알고자 하는 값
> <br>
> \- 통계량 (statistic) : 보수를 추론하기 위해 구하는 표본의 값들

<br>


### 표본추출 방법

> N개 원소 모집단에서 n개의 표본 추출 (n <= N)

#### 단순랜덤추출법 (simple random sampling)
: 모집단 원소에 1 부터 N까지 번호 부여. n개의 번호를 임의로 선택해 그 번호에 해당하는 원소를 표본으로 추출

<br>

#### 계통추출법 (systematic sampling)
: 모집단의 원소에 1부터 N까지 일련번호를 부여하고 순서대로 나열하고 K개(K=N/n)씩 n개의 구간으로 나눔.

첫 구간(1~K)에서 하나를 임의로 선택한 후에 K개씩 띄어서 표본 추출

<br>

#### 집락추출법 (cluster sampling)
: 모집단이 몇 개의 cluster가 결합된 형태이고, 각 집단에서 원소들이 일련번호를 부여할 수 있는 경우에 이용

일부 집락을 랜덤으로 선택하고 선택된 각 집락에서 표본을 임의로 선택

<br>

#### 층화추출법 (stratified sampling)
: 상당히 이질적인 원소들이 구성된 모집단에서 각 계층을 고루 대표할 수 있도록 표본을 추출하는 방법
이질적인 모집단의 원소들을 서로 유사한 것끼리 몇 개의 층(stratum)으로 나눈 후, 각 층에서 표본 랜덤 추출

<br>


> 표본조사 이외의 자료 수집 방법 : 실험 (특정 목적 하에 실험 대상에게 처리를 가한 후 결과를 관측해 자료 수집)
>
> e.g) 새로운 강의방법이 기존의 강의방법에 비해 효과적인지 확인
> 새로운 암 치료제의 효과 분석

<br>


### 자료 측정 방법

- 질적 자료 (qualitative data) : 명목척도와 순서척도로 측정된 자료
- 양적 자료 (quantitative data) : 구간척도와 비율척도로 측정된 자료

#### 명목척도 (nominal scale)
: 측정 대상이 어느 집단에 속하는지 분류할 때 사용되는 척도

> e.g) 성별 (남, 여), 출생지 (서울특별시, 부산광역시, 경기도 등)


#### 순서척도 (ordinal scale)
: 측정 대상의 특성이 가지는 서열관계를 관측하는 척도

> e.g) 서비스의 선호도 (아주 좋아한다, 좋아한다, 그저 그렇다, 싫어한다, 아주 싫어한다)


#### 구간척도 (interval scale)
: 측정 대상이 갖고 있는 속성의 양을 숫자로 표현한 척도

> 해당 속성이 전혀 없는 상태인 절대적인 원점이 없기 때문에 두 관측값 사이의 비율은 의미가 없다.
>
> e.g) 온도, 지수 등


#### 비율척도 (ratio scale)
: 절대적인 기준인 0값이 존재하고 모든 사칙연산 가능한 척도

> 제일 많은 정보를 가지고 있다.
>
> e.g) 무게, 나이, 연간소득, 제품가격 등 숫자로 관측 되는 일반적인 자료의 특성

<br>


## 통계분석 (statistical analysis)

### 통계적 추론 (statistical inference)

: 수집된 자료를 이용해 대상 집단(모집단)에 대해 의사결정을 하는 것

1. 추정 (estimation) : ‘대상 집단의 특성값(모수)이 무엇일까?’를 추측

2. 가설검정 (hypothesis test) : 대상 집단에 대해 특정 가설을 설정한 후에 그 가설의 채택여부를 결정

3. 예측 (forecasting) : 미래의 불확실성을 해결해 효율적인 의사결정을 하기 위해 수행

<br>

### 기술통계 (descriptive statistic)

: 수집된 자료를 정리, 요약하기 위해 사용하는 기초적인 통계

> 대개 보다 자세한 통계적 분석을 위한 사전단계 역할

- 숫자 : 평균, 표준편차, 중위수, 최빈값, % 등
- 그림 : 막대그래프, 원그래프, 꺽은선그래프 등

<br>


## 확률 및 확률분포

확률 : ‘특정하거나 일어날 가능성의 척도’

- 표본공간 (sample space, Ω) : 모든 결과들의 집합
- 사건 (event) : 표본공간의 부분집합
- 근원사건 : 오직 한 개의 원소로만 이루어진 사건

<br>

표본 공간이 유한 개의 원소로 구성, 근원사건들이 일어날 확률이 모두 같은 경우

1. 모든 사건 E의 확률값은 0과 1사이. 즉, 0 ≤ P(E) ≤ 1

2. 전체 집합의 확률은 1. 즉, P(Ω) = 1

3. 서로 배반인 사건들 E1, E2, ... 의 합집합의 확률은 각 사건들의 확률의 합.  즉, P(U En) = ∑ P(En)

> 배반사건 : 교집합이 공집합인 사건

<br>

### 조건부 확률과 독립사건

조건부 확률 (conditional probability) : 사건 A가 일어났다는 가정하의 사건 B의 확률.

> 서로에게 영향을 주지 않는 사건들을 서로 독립이라고 함

<br>

### 확률변수와 확률분포
확률변수 (Random Variable) : 특정 사건에 대해 실수 값을 갖는 변수 (특정값이 나타날 가능성이 확률로 주어짐)

> 정의역(domain) : 표본공간
> 치역 (range) : 실수

<br>

#### 이산형 확률변수 (discrete random variable)
: 사건의 확률이 그 사건들이 속한 점들의 확률의 합으로 표현 가능한 확률변수

$P_x(X=x_i) = P_i \quad x_i$: finite countable infinite

> 확률이 0보다 큰 값을 갖는 점들로 확률 표현 가능

확률질량함수 (probability mass function) : 각 이산점에 있어서 확률의 크기를 표현하는 함수

> e.g) 베르누이 확률분포, 이항분포, 기하분포, 다항분포, 포아송분포

<br>

#### 연속형 확률변수 (continuous random variable)
: 사건의 확률이 그 사건 위에서 어떤 0보다 큰 값을 갖는 함수의 면적으로 표현될 수 있는 확률변수

확률밀도함수(probability density function) : ƒ(x)

각 사건의 확률은 확률밀도함수의 면적으로 표현
 → 한 점에서의 확률 = 0, 0보다 큰 값을 갖는 사건 = 구간에서의 확률값

> e.g) 균일분포, 정규분포, 지수분포, t-분포, Xˆ2 - 분포, F-분포

<br>

#### 결합확률분포 ( joint probability distribution)
: 두 개 이상의 확률변수의 결합확률분포

- 결합확률질량함수 (joint probability mass function) : P(X=$x_i$, Y=$y_i$) = $P_{ij}$
- 결합확률밀도함수 (joint probability density function) : ƒ(x, y)

<br>


### 확률변수의 기댓값과 분산

(1) 기댓값 (µ)

$$E[X] = \sum_{i=0}^n x_i P(x_i)$$

$$E[X] = \int_{-\infty}^{\infty} x_i P(x_i)$$

<br>

(2) 분산 (Variance)

$$Var(X) = E(X - µ)^2$$

<br>

(3) 표준편차 (standard deviation, σ)

$$sd(X) = \sqrt{Var(X)}$$

<br>


### 백분위수

: 연속형 확률변수 X의 제 q 백분위수 $x_q$

$$P(X ≤ x_q) = \frac{q}{100}$$

<br>


## 추정과 가설검정

모수(parameter) : 모집단 확률분포의 특징을 표현하는 값들

> e.g) 평균, 분산, 표준편차, 백분위수 등

<br>

<table style="text-align: center;">
  <tbody>
     <tr>
       <th rowspan="3">통계적 추론</th>
       <th rowspan="2">추정</th>
       <th>점추정</th>
       <td>모수가 특정한 값일 것이라고 추정</td>
     </tr>
     <tr>
       <th>구간추정</th>
       <td>일정 크기의 신뢰수준으로 모수가 특정한 구간에 있을 것이라고 선언</td>
     </tr>
     <tr>
       <th colspan="2">가설검정</th>
       <td>모집단에 대한 가설을 설정한 뒤, 표본관찰을 통해 가설의 채택여부를 결정</td>
     </tr>
  </tbody>
</table>

<br>


### 점추정 (point estimation)

: 가장 참값이라고 여겨지는 하나의 모수의 값 택

<br>

모평균 µ를 추정하기 위한 추정량

> 표본평균(sample mean)이 대표적

표본평균 : $\overline{X} = \frac{1}{n} \sum_{i=1}^{n}X_i$

<br>

모분산 $\sigma^2$를 추정하기 위한 추정량

> 표본분산(sample variance)이 대표적

표본분산 : $s^2 = \frac{1}{n-1} \sum_{i=1}^{n}(X_i - \overline{X})^2$

<br>


### 구간추정
: 일정 신뢰수준(confidence level)으로 모수가 신뢰구간(confidence interval)에 있을 것이라고 선언

> 점추정은 추정의 정확성 판단이 불가능. 이러한 점추정의 정확성을 보완하는 방법

<br>

일반적으로 신뢰수준은 90%, 95%, 99%의 확률을 이용하는 경우가 많음

> **신뢰수준의 의미**
>
> 신뢰수준 95% : 한 개의 모집단에서 동일한 방법으로 동일한 개수의 확률표본을 무한히 많이 추출하여 각각 신뢰구간을 구하면, 이 무한히 많은 신뢰구간 중에서 95%의 신뢰구간이 미지의 모수를 포함한다는 의미
>
> ≠ 주어진 한 개의 신뢰구간이 미지의 모수를 포함할 확률이 0.95

<br>

모집단의 확률분포를 정규분포라 가정, 신뢰수준 95%에서 모평균 µ의 신뢰구간

(1) 모분산 $\sigma^2$이 알려져 있는 경우

$$(\overline{X} - 1.96 \frac{\sigma}{\sqrt{n}},\; \overline{X} + 1.96 \frac{\sigma}{\sqrt{n}})$$

(2) 모분산 $\sigma^2$이 알려져 있지 않은 경우

$$(\overline{X} - t_{n-1, 0.975} \frac{S}{\sqrt{n}},\; \overline{X} + t_{n-1, 0.975} \frac{S}{\sqrt{n}})$$

> $t_{n-1, 0.975}$ : n-1의 자유도를 가지는 t분포의 97.5 백분위수

<br>


### 가설검정

- 귀무가설(null hypothesis, $H_0$) : 대립가설과 반대의 증거를 찾기 위해 정한 가설
- 대립가설(alternative hypothesis, $H_1$) : 확실하게 증명하고 싶은 가설, 뚜렷한 증거가 있어야 채택 가능한 가설 (혹은 결과가 값비싼 가설)

→ 표본 관찰 또는 실험을 통해 귀무가설과 대립가설 중에서 하나를 선택

<br>

검정통계량 (test statistic, T(X) ) : 검정에 사용되는 통계량

→ 모평균에 대한 감정에는 표본평균, 모분산에 대한 검증에는 표본분산 사용됨

<br>

귀무가설이 옳다는 전제 하에서 관측된 검정통계량의 값보다 더 대립가설을 지지하는 값이 나타날 확률을 구해 귀무가설 채택여부를 결정

- p-value : 귀무가설이 사실일 때, 관측된 검정통계량의 값보다 더 대립가설을 지지하는 검정통계량이 나올 확률

- 유의수준 (significance level, α ) : 귀무가설을 기각하는 기준값. (p-값이 이 값보다 작으면 귀무가설이 맞을 가능성이 적다고 판단)
<br>
> 보통 0.01, 0.05, 0.1 중 한 개의 값 사용

- 기각역 (critical region, C) : 귀무가설을 기각하는 통계량의 영역

<br>

#### 가설검정의 결과와 오류

- 제1종 오류 (type 1 error; α ) : 귀무가설 $H_0$이 옳은데도 $H_0$을 기각하게 되는 오류 확률
- 제2종 오류 (type 2 error; ß ) : 귀무가설 $H_0$이 옳지 않은데도 $H_0$을 채택하게 되는 오류 확률

> 서로 상충관계이다.

<table style="text-align: center;">
  <tbody>
     <tr>
       <th style="visibility: hidden;"></th>
       <th>$H_0$이 사실이라고 판정</th>
       <th>$H_0$이 사실이 아니라고 판정</th>
     </tr>
     <tr>
       <th>$H_0$이 사실</th>
       <td>옳은 결정</td>
       <td>제1종 오류</td>
     </tr>
     <tr>
       <th>$H_0$이 사실이 아님</th>
       <td>제2종 오류</td>
       <td>옳은 결정</td>
     </tr>
  </tbody>
</table>

<br>

→ 일반적으로 제1종 오류 α의 크기를 0.1, 0.05, 0.01 등으로 고정한 후, 제2종 오류 ß가 최소가 되도록 기각역 설정

<br>


## 비모수 검정

- 모수적 검정 : 검정하고자 하는 모집단의 분포에 대한 가정을 하고, 가정 하에서 검정통계량과 분포를 유도해 검정 실시
- 비모수 검정 : 자료가 추출된 모집단의 분포에 대해 아무 제약을 가하지 않고 검정 실시

> 관측된 자료가 특정분포를 따른다고 가정할 수 없는 경우에 이용

<br>

### 모수적 검정과 비모수 검정의 차이점

(1) 가설 설정
- 모수적 검정 → 가정된 분포의 모수(모평균, 모비율, 모분산 등)에 대해 가설 설정
- 비모수 검정 → 분포의 형태에 대해 설정

> e.g) ‘분포의 형태가 동일하다’, ‘분포의 형태가 동일하지 않다 등

<br>

(2) 관측 자료의 활용
- 모수적 검정 → 관측된 자료를 이용해 구한 표본평균, 표본분산 등을 이용
- 비모수 검정 → 관측값의 절대적인 크기에 의존하지 않는 관측값들의 순위(rank)나 두 관측값 차이의 부호 등을 이용

<br>

### 대표적인 비모수 검정 방법

1. 부호검정 (sign test) : 쌍으로 관측된 표본
2. 윌콕슨의 순위합검정 (rank sum test)
3. 윌콕슨의 부호순위합검정 (signed rack test)
4. 만-위트니의 U검정
5. 런검정(run test)
6. 스페어만의 순위상관계수
