---
category: 'Data Analysis'
tags: ['AD(s)P']
title: "[AD(s)P] 군집 분석 -  혼합 분포 군집 (Mixture Distribution Clustering)"
---

혼합 분포 군집 (Mixture Distribution Clustering)
: 데이터가 k개의 모수적 모형의 가중합으로 표현되는 모집단 모형으로부터 나왔다는 가정하에 수와 함께 가중치를 자료로부터 추정하는 방법 사용

> 모형 기반 군집 방법

<br>

각 데이터는 추정된 k개의 모형 (군집을 의미) 중 어느 모형으로부터 나왔을 확률이 높은지에 따라 군집 분류

-> 흔히 최대가능도추정(모수와 가중치의 추정)에는 EM 알고리즘이 사용됨

<br>

$$P(x \mid \theta) = \sum_{i=1}^{M}P(x \mid C_i, \theta_i)P(C_i)$$

- $C$ : 군집 클래스
- $\theta$ : 모수벡터
- $P(x \mid C_i, \theta_i)$ : 혼합 모델을 이루는 단일 pdf (확률 밀도 함수)
- $P(C_i)$ : 군집이 혼합 모형에서 차지하는 중요도 또는 가중치 ($\alpha_i$)


<br>


## EM(Expectation-Maximization) 알고리즘

![EM Algorithm](/assets/images/post/em_algorithm_200821.png)

<br>


## 특징

- k-평균군집의 절차와 유사하나 확률분포를 도입하여 군집을 수행하는 모형기반의 군집 방법
- 몇 개의 모수로 표현 가능, 서로 다르 크기나 모양의 군집을 찾을 수 있음
- EM 알고리즘을 이용한 모수 추정에서 데이터가 커지면 수렴하는데 시간이 걸릴 수 있고 군집의 크기가 너무 작으면 추정의 정도가 떨어지거나 어려울 수 있음
- 이상값 자료에 민감
