---
category: 'Data Analysis'
tags: ['AD(s)P']
title: "[AD(s)P] 분류 분석 - Artificial Neural Network (인공신경망)"
---

인공신경망 (Artificial Neural network) 모형

<br>


## 단층신경망 (single-layer neural network) 구조 (Perceptron)

: 입력의 직접 출력층에 연결되는 구조

<br>

$$
\left.
\begin{matrix}
1 & \to & w_0 \\
x_1 & \to & w_1 \\
\vdots &  & \vdots \\
x_d & \to & w_d
\end{matrix}
\quad
\right\}
\quad \Sigma \quad \to \quad z \quad \xrightarrow{\text{Activation function}} \quad \phi(z) = y(x)
$$

<br>

- x : d-차원 입력벡터

- $z = w' x + w_0 = \omega_0 + \sum_{j=1}^d\omega_jx_j$

- $\phi(z)$ : 활성함수

- $\omega$ = $(\omega_1, \ldots, \omega_i)'$ : 가중치 → 의사 결정 경계의 방향을 나타내는 모수

- $\omega_0$ : 편의 (bias) → 의사결정 경계의 위치를 나타내는 모수

<br>

학습을 통해 오차 제곱항이 최소가 되는 방향으로 갱신

최종 목표값 y(x)는 z에 대해 비선형 활성함수 $\phi$를 적용해 구해진다.

<br>


## 활성함수

### 부호(sign) 또는 threshold 함수
> 이진형(-1 또는 1)

$$
y =
\begin{cases}
-1,  & \text{if $z$ < 0} \\
1, & \text{if $z$ ≥ 0}
\end{cases}
$$

<br>

### 계단(step) 함수
> 이진형(0 또는 1)

$$
y =
\begin{cases}
0,  & \text{if $z$ < 0} \\
1, & \text{if $z$ ≥ 0}
\end{cases}
$$

<br>

### 시그모이드(sigmoid) 함수
> 연속형 (0 ≤ y ≤ 1)

$$y = \frac{1}{1+ e^{-z}}$$

<br>

### Softmax 함수 : 표준화지수함수 (or 일반화로지스틱함수)
> 출력값 z가 L개, 목표치가 다범주

$$y_i = \frac{e^(z_j)}{\sum_{i=1}^{L}e^{z_i}} \quad j = 1, \ldots , L$$

<br>

### tanh 함수
> 연속형 (-1 ≤ y ≤ 1)

$$y = \frac{e^z - e^{-z}}{e^z + e^{-z}}$$

<br>

### 가우스(Gauss) 함수
> 연속형 (0 ≤ y ≤ 1)

$$y = e^{-\frac{z^2}{2}}$$

<br>

### Relu 함수

$$
y^{relu} =
\begin{cases}
0,  & \text{if $z$ < 0} \\
x, & \text{if $z$ ≥ 0}
\end{cases}
$$

<br>


## Python 구현

> [scikit-learn - neural_networks_supervised](https://scikit-learn.org/stable/modules/neural_networks_supervised.html)

<br>

> '데이터 분석 전문가 가이드'의 예제를 파이썬으로 구현


```r
nn.iris <- nnet(Species~., data=iris, size=2, rang=0.1, decay=5e-4, maxit=200)
summary(nn.iris)
```

- size  : 은닉층의 노드 수
- rang  : 가중치 초기값 범위 \[-0.1, 0.1\]
- decay : 가중치 decay
- maxit : 최대반복수

<br>

> MLPClassifier에서는 초기값을 지정하기 힘들기 때문에, 최대 반복수를 높여서 훈련시켰다.

```python
import numpy as np
from sklearn import datasets
from sklearn.neural_network import MLPClassifier
from sklearn.metrics import confusion_matrix

iris = datasets.load_iris()
```

```python
# default: solver='adam', activation='relu', max_iter=200
mlp = MLPClassifier(hidden_layer_sizes=(2, ), alpha=5e-4, max_iter=10000, verbose=True)
mlp.fit(iris.data, iris.target)
```

    Iteration 1, loss = 1.37605499
    Iteration 2, loss = 1.37156622
    Iteration 3, loss = 1.36713681
    Iteration 4, loss = 1.36276736
    Iteration 5, loss = 1.35845841
    .
    .
    .
    Iteration 1782, loss = 0.12743146
    Iteration 1783, loss = 0.12733323
    Training loss did not improve more than tol=0.000100 for 10 consecutive epochs. Stopping.


    MLPClassifier(alpha=0.0005, hidden_layer_sizes=(2,), max_iter=10000,
                  verbose=True)


```python
mlp.coefs_
```

    [array([[-0.24402825,  1.37301206],
            [-0.51371795,  0.92434506],
            [ 1.55880162, -1.3018885 ],
            [ 1.38947326, -0.36604157]]),
     array([[-1.28356613,  0.09533215,  1.32940555],
            [ 0.71198932,  0.18465155, -1.51388911]])]


```python
confusion_matrix(iris.target, mlp.predict(iris.data))
```

    array([[50,  0,  0],
           [ 0, 47,  3],
           [ 0,  0, 50]], dtype=int64)


```python
mlp.score(iris.data, iris.target)
```

    0.98
