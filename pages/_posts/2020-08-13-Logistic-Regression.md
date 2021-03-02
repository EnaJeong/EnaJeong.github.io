---
category: 'Data Analysis'
tags: ['AD(s)P']
title: "[AD(s)P] 분류 분석 - Logistic Regression (로지스틱회귀)"
---

Logistic regression (로지스틱 회귀모형)
: 새로운 예측변수의 값이 주어질 때 반응변수의 각 범주에 속할 확률이 얼마인지 추정하여 기준치에 따라 분류

> 반응변수가 범주형이 경우에 적용되는 회귀분석 모형

<br>


## 사후확률(posterior probability)

: 모형의 적합을 통해 추정된 확률

$$\log(\frac{\pi(x)}{1 - \pi(x)}) = \alpha + \beta_1x_1 + \cdots + \beta_kx_k \;, \quad \pi(x) = P(Y=1|x), \; x=(x_1,\; \ldots ,\; x_k)$$

<br>

> 오즈(odds)의 관점에서 해석 가능
>
> - Odds : 성공할 확률이 실패할 확률의 몇 배인지
> - Odds ratio : 오즈의 비율
>
> e.g exp(ß1): 나머지 변수(x2, ..., x )가 주어질 때 x1이 한 단위 증가할 때마다 성공(Y=1)의 오즈가 몇 배 증가하는지

<br>

$$\pi(x) = \frac{exp(\alpha + \beta_1x_1 + \cdots + \beta_kx_k)}{1 + exp(\alpha + \beta_1x_1 + \cdots + \beta_kx_k)} = \frac{1}{1 + exp(-(\alpha + \beta_1x_1 + \cdots + \beta_kx_k))}$$

(1) 설명변수가 한 개(x1) 인 경우

→ ß1의 부호에 따라 S자 모양 또는 역 S자 모양

(2) 누적분포함수 (cdf) F(x)라 할 때,

$$\pi(x) = F(\alpha + \beta_1x_1 + \cdots + \beta_kx_k)$$

<br>


## 분류기준값 결정

: 사전적으로 또는 손실함수를 이용하거나 정분류율, 민감도, 특이도를 동시에 고려하는 등

반응변수의 범주가 3개 이상인 경우에는 다범주 로짓모형을 적합
