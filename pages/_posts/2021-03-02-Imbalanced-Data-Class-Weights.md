---
category: 'Data Analysis'
title: 불균형 데이터 처리 기법 - Class Weights
---

손실함수에서 소수 클래스에 가중치를 부여해 소수 클래스가 잘못 분류되는 경우에 다수 클래스가 잘못 분류되는 경우보다 더 큰 벌점을 부과하는 방법

⇒ 훈련 과정에서 손실함수를 최소화하려고 하기 때문에 소수 클래스가 잘못 분류되는 에러를 줄이는 효과가 있다.

<br>

> 대부분의 분류기는 가중치를 부여하는 변수를 가지고 있다.
>
> - sklearn의 분류기 : `class_weight`
> - LightGBM: `class_weigth`, `is_unbalance`, `scale_pos_weight`
> - XGBoost : `scale_pos_weight`
> - CatBoost : `class_weights`, `scape_pos_weight`, `auto_class_weights`

<br>


## 가중치 부과

일반적으로 자주 쓰이는 가중치 계산 방법은 다음과 같다.

<br>

###  Inverse Class Frequency

해당 클래스의 빈도수 비율을 역으로 적용하는 방식으로 가중치를 부여한다.  

즉, 가중치는 (전체 샘플 개수 / 해당 클래스에 속하는 샘플 개수 )가 된다.

<br>

예를 들어 다음과 같은 데이터가 있다고 하자.

- 전체 샘플 개수 : 100
- 전체 클래스 개수 : 2  (이진 분류, 0 & 1)
- 클래스가 0인 샘플 개수 : 90
- 클래스가 1인 샘플 개수 : 10

<br>

이때, 가중치를 계산해보면 다음과 같다.

- 클래스 0의 가중치 = 100 / 90 = 1.111...

- 클래스 1의 가중치 = 100 / 10 = 10

<br>

> 가장 기본적인 가중치 계산 방법으로 `sklearn`, `LightGBM`, `CatBoost` 모두 이 방법을 제공하고 있다.
>
> LightGBM : `is_unbalance=True`
>
> CatBoost : `auto_class_weights='Balanced'`
>
> sklearn : `class_weigth='balanced'`

<br>

> 일반적으로는 이 방법이 좋은 결과를 주는 것으로 알려져 있지만 극단적으로 불균형한 경우에는 성능이 좋지 않다고 한다.

<br>

### Inverse Square Root of Class Frequency

가중치를 (전체 샘플 개수 / 해당 클래스에 속하는 샘플 개수 )의 제곱근 값으로 부여한다.

> Inverse Class Frequency의 크기를 완만하게 적용하는 방식이라고 볼 수 있다.

<br>

위의 예시 데이터를 다시 사용하자.

- 전체 샘플 개수 : 100
- 전체 클래스 개수 : 2  (이진 분류, 0 & 1)
- 클래스가 0인 샘플 개수 : 90
- 클래스가 1인 샘플 개수 : 10

<br>

제곱급 버전으로 가중치를 계산하면 다음과 같다.

클래스 0의 가중치 = $\sqrt{\frac{100}{90}}$ = 1.054...

클래스 1의 가중치 =  $\sqrt{\frac{100}{10}}$ = 3.162...

<br>

> CatBoost는 이 가중치 부과 방법도 제공한다.
>
> `auto_class_weights='SqrtBalanced'`
