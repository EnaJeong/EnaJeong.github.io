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
> - XGBoost : `scale_pos_weight`
> - LightGBM : `class_weight`, `is_unbalance`, `scale_pos_weight`
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

<br>


## 분류기별 가중치 부여하는 방법

### sklearn

`class_weight="balanced"`라고 지정하면 Inverse Class Frequency 방법을 적용해 가중치를 부과한다.

직접 입력하고 싶은 경우에는 `dict` 형태로 입력해야 한다. 이때, 다중분류인 경우 `dict`의 `list`를 입력해야 하는데, 입력 형태를 주의해야 한다.

예) `class_weight=[{0: 1, 1: 1}, {0: 1, 1: 5}, {0: 1, 1: 1}, {0: 1, 1: 1}]`

<br>

### XGBoost

`scale_pos_weight` : 이진 분류에서 클래스 1에 부과할 가중치 (사용법 하단 참고)

<br>

> 참고 : [XGBoost - Parameters](https://xgboost.readthedocs.io/en/latest/parameter.html)

<br>

### LightGBM

`class_weight` : dict 형태나 'balanced'

- `class_weights='balanced'` : Inverse Class Frequency 적용
- `class_weights={'a': 1.0, 'b': 0.5, 'c': 2.0}`

`is_unbalance` : 자동으로 가중치를 계산해 부과 (Inverse Class Frequency)

- `is_unbalance=True`

`scale_pos_weight` : 이진 분류에서 클래스 1에 부과할 가중치 (사용법 하단 참고)

> 문서에서 이진분류일 때 `is_unbalance`나 `scale_pos_weight`, 다중 분류일 때 `class_weight`를 사용하라고 한다.

<br>

> 참고 : [LGBMClassifier](https://lightgbm.readthedocs.io/en/latest/pythonapi/lightgbm.LGBMClassifier.html) ,
> [LightGBM - Parameters](https://lightgbm.readthedocs.io/en/latest/Parameters.html)

<br>

### CatBoost

`class_weights` : list 나 dict

- `class_weights=[0.1, 4]`
- `class_weights={'a': 1.0, 'b': 0.5, 'c': 2.0}`

`auto_class_weights` : 자동으로 가중치를 계산해 부과

- `auto_class_weights="Balanced"` : Inverse Class Frequency 적용
- `auto_class_weights="SqrtBalanced"` : Inverse Square Root of Class Frequency 적용

`scale_pos_weight` : 이진 분류에서 클래스 1에 부과할 가중치 (사용법 하단 참고)

<br>

> 참고 : [CatBoost - Training Parameters](https://catboost.ai/docs/concepts/python-reference_parameters-list.html)

<br>

### scale_pos_weight

이진 분류에서 클래스 0의 가중치는 1로 두고 클래스 1에 부과할 가중치를 넣어주는 방식이다.  

`scale_pos_weight` 계산하는 방법은 다음과 같다.

각 클래스에 대한 가중치가 다음과 같다고 하자.

- w_0 : 클래스 0의 가중치

- w_1 : 클래스 1의 가중치

비율 `w_0 : w_1` 은 `1 : w_1 / w_0` 와 같다.
`scale_pos_weight`는 이 `w_1 / w_0` 값으로 설정하면 된다.

<br>

Inverse Class Frequency 방법을 적용하고 싶은 경우를 예로 들면,

- w_0 = 전체 개수 / 클래스 0 개수
- w_1 = 전체 개수 / 클래스 1 개수

이므로 w_1 / w_0 은 (클래스 0 개수 / 클래스 1 개수)로 구할 수 있다.

따라서 `scale_pos_weight`를 (클래스 0 개수 / 클래스 1 개수)로 주면 Inverse class frequency 방식으로 적용할 수 있다.

마찬가지로 Inverse Square Root of Class Frequency 방식을 적용하고 싶으면, (클래스 0 개수 / 클래스 1 개수)의 제곱근을 넣어주면 된다.
