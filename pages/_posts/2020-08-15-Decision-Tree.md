---
category: 'Data Analysis'
tags: ['AD(s)P']
title: "[AD(s)P] 분류 분석 - Decision Tree (의사결정나무)"
---

- Classification tree (분류나무) : 목표변수가 이산형인 의사결정나무
- Regression tree (회귀나무) : 목표변수가 연속형인 의사결정나무

<br>

## 분류(기준)변수와 분류기준값의 선택 방법

### 분류나무 (Classification tree)

#### 카이제곱 통계량의 p-값

> 작을 수록 자식 노드 내의 불확실성(이질성)이 큼 → p-값이 크도록

#### 지니 지수

> 자식노드에서 값이 클수록 이질성이 큼 → 지니지수가 작도록

$$G = 1 - \sum_{i=0}^{c}P_i^2 \qquad 0 ≤ G ≤ \frac{1}{2}$$

#### 엔트로피 지수

> 자식노드에서 값이 클수록 이질성이 큼 → 엔트로피지수가 작도록

$$E = - \sum_{i=0}^{c}P_ilog_2(P_i) \qquad 0 ≤ E ≤ 1$$

<br>

### 회귀나무 (Regression tree)

#### ANOVA F-통계량
> F-통계량이 커지는(p-값은 작아지는) 방향으로 가지분할 수행

#### 분산의 감소량
> 분산의 감소량이 최대화되는 방향으로 가지분할 수행

<br>


## 분석 과정

1. 목표변수가 관계가 있는 설명변수들의 선택
2. 분석목적과 자료의 구조에 따라 적절한 분리기준과 정지규칙을 정하여 의사결정 나무 생성
<br>
> 정지규칙
> <br>
> 더 이상 분리가 일어나지 않고 현재의 마디가 끝마치다 되도록 하는 규칙

3. 부적절한 나뭇가지는 제거 (가지치기)
<br>
> 끝마디가 너무 많으면 모형이 과대 접합된 상태로 분류된 관측자의 비율 또는 MSE 등을 고려하여 규칙 제공

4. 이익(Gain), 위험(Risk), 비용(Cost) 등을 고려하여 모형평가
5. 분류 및 예측

<br>


## 알고리즘과 분류 기준변수의 선택법

<table style="text-align: center;">
  <tbody>
    <tr>
      <th style="visibility: hidden;"></th>
      <th>이산형 목표변수</th>
      <th>연속형 목표변수</th>
    </tr>
    <tr>
      <th>CHAID (다지분할)</th>
      <td>카이제곱 통계량</td>
      <td>ANOVA F-통계량</td>
    </tr>
    <tr>
      <th>CART (이진분할)</th>
      <td>지니지수</td>
      <td>분산감소량</td>
    </tr>
    <tr>
      <th>C4, 5</th>
      <td>엔트로피지수</td>
      <td>-</td>
    </tr>
  </tbody>
</table>
