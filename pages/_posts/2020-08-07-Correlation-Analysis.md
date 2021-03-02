---
category: 'Data Analysis'
tags: ['AD(s)P']
title: "[AD(s)P] 통계 분석 (3) 다변량 분석 - 상관 분석"
---
상관 분석 (Correlation Analysis)
: 데이터 안의 두 변수 간의 관계를 알아보기 위한 분석

<br>

## 상관계수 (Correlation coefficient)

### Pearson correlation (피어슨 상관계수)

등간척도 이상으로 측정되는 두 변수들 간의 상관관계를 측정하는 데 사용

$$\rho = Corr(X, Y) = \frac{cov(X, Y)}{\sigma_x \sigma_y}$$

<br>

피어슨 상관계수 모수를 추청하기 위한 표본상관계수 $r$은 다음과 같다.

$$r = \frac{\sum_{i=1}^{n}(x_i - \bar{x})(y_i - \bar{y})}{\sqrt{\sum_{i=1}^{n}(x_i - \bar{x})^2}\sqrt{\sum_{i=1}^{n}(y_i - \bar{y})^2}}$$

<br>

### Spearman correlation (스피어만 상관계수)

서열척도인 두 변수들의 상관관계를 측정하는 데 사용

$$\theta = \frac{\sum(r_i - \bar{r})(s_i - \bar{s})}{\sqrt{\sum(r_i - \bar{r})^2}\sqrt{\sum(s_i - \bar{s})^2}}$$

- $r_i$는 ${x_1, \cdots, x_n}$ 에서 $x_i$의 순위
- $s_i$는 ${y_1, \cdots, y_n}$ 에서 $y_i$의 순위
