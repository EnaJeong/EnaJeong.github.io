---
category: 'Deep Learning'
title: 밑바닥부터 시작하는 딥러닝 05 오차역전파법
---

> 전반적으로 책의 구현과 조금 다르다.

```python
import numpy as np
from collections import OrderedDict
```

## 역전파 (Backpropagation)

### 단순 곱셈 노드

$$h(x) = f(g(x))$$

$$g(x) = x * y$$

$$
\begin{align}
h'(x) &= f'(g(x)) \cdot g'(x) \\
&= f'(x * y) \cdot y
\end{align}
$$



```python
class MulLayer:
    def __init__(self):
        self.x = None
        self.y = None

    def forward(self, x, y):
        self.x = x
        self.y = y

        return x * y

    def backward(self, dout):   # 입력 : f'(g(x, y))
        dx = dout * self.y      # dx = f'(g(x, y)) * g'(x)
        dy = dout * self.x      # dy = f'(g(x, y)) * g'(y)

        return dx, dy
```

<br>

### 단순 덧셈 노드

$$h(x) = f(g(x))$$

$$g(x) = x + y$$

$$
\begin{align}
h'(x) &= f'(g(x)) \cdot g'(x) \\
&= f'(x + y) \cdot 1
\end{align}
$$


```python
class AddLayer:
    def forward(self, x, y):
        self.x = x
        self.y = y

        return x + y

    def backward(self, dout):   # 입력 : f'(g(x, y))
        dx = dout * 1           # dx = f'(g(x, y)) * g'(x)
        dy = dout * 1           # dy = f'(g(x, y)) * g'(y)

        return dx, dy
```

<br>

### 역전파를 이용해 미분값 계산 예

price = (apple * apple_num + orange * orange_num) * tax


```python
apple, apple_num = 100, 2
orange, orange_num = 150, 3
tax = 1.1

# 계층들
mul_apple_layer = MulLayer()
mul_orange_layer = MulLayer()
add_apple_orange_layer = AddLayer()
mul_tax_layer = MulLayer()

# 순전파
apple_price = mul_apple_layer.forward(apple, apple_num)
orange_price = mul_orange_layer.forward(orange, orange_num)
all_price = add_apple_orange_layer.forward(apple_price, orange_price)
price = mul_tax_layer.forward(all_price, tax)

# 역전파
d_price = 1    # d price / d price = 1
d_all_price, d_tax = mul_tax_layer.backward(d_price)
d_apple_price, d_orange_price = add_apple_orange_layer.backward(d_all_price)
d_orange, d_orange_num = mul_orange_layer.backward(d_orange_price)
d_apple, d_apple_num = mul_apple_layer.backward(d_apple_price)

print(f"price : {price}")
print(f"d price / d apple       : {d_apple}")
print(f"d price / d apple_num   : {d_apple_num}")
print(f"d price / d orange      : {d_orange}")
print(f"d price / d orange_num  : {d_orange_num}")
print(f"d price / d tax         : {d_tax}")
```

    price : 715.0000000000001
    d price / d apple       : 2.2
    d price / d apple_num   : 110.00000000000001
    d price / d orange      : 3.3000000000000003
    d price / d orange_num  : 165.0
    d price / d tax         : 650


> 원래 식 price = (apple * apple_num + orange * orange_num) * tax 를 각 변수로 편미분 한 결과와 비교해보면 일치하는 것을 확인할 수 있다.

<br>


## 활성화 함수 계층

### ReLU

$$
y =
\begin{cases}
0,  & \text{if $x$ < 0} \\
x, & \text{if $x$ ≥ 0}
\end{cases}
$$

$$
\frac{d y}{d x} =
\begin{cases}
0,  & \text{if $x$ < 0} \\
1, & \text{if $x$ ≥ 0}
\end{cases}
$$


```python
class Relu:
    def __init__(self):
        self.mask = None

    def forward(self, x):
        self.mask = (x <= 0)
        out = x.copy()
        out[self.mask] = 0

        return out

    def backward(self, dout):
        dx = dout.copy()
        dx[self.mask] = 0

        return dx
```

<br>

### Sigmoid

$$y = \frac{1}{1 + e^{-x}}$$

$$
\begin{align}
\frac{d y}{d x} &= - \frac{1}{(1 + e^{-x})^2} \cdot (1 + e^{-x})' \\
&= - \frac{1}{(1 + e^{-x})^2} \cdot e^{-x} \cdot (-x)' \\
&= - \frac{1}{(1 + e^{-x})^2} \cdot e^{-x} \cdot (-1) \\
&= \frac{1}{1 + e^{-x}} \frac{e^{-x}}{1 + e^{-x}} \\
&= y (1 - y)
\end{align}
$$


```python
class Sigmoid:
    def __init__(self):
        self.out = None

    def forward(self, x):
        out = 1 / (1 + np.exp(-x))
        self.out = out

        return out

    def backward(self, dout):
        dx = dout * self.out * (1 - self.out)

        return dx
```

<br>


## Affine 계층

> Perceptron에서 입력값에 가중치와 편향을 더하는 연산 과정

<br>

$$ Y = X \cdot W + B $$

$$
W =
\begin{bmatrix}
w_{11} & \cdots & w_{1m} \\
 & \vdots &  \\
w_{n1} & \cdots & w_{nm}
\end{bmatrix}
\; , \quad
B = [b_1, \cdots, b_m]
\; , \quad
X = [x_1, \cdots, x_n]
$$


$$ Y
= [\; w_{11} \cdot x_1 + w_{1n} \cdot x_n + b_1 \;, \cdots ,\; w_{m1} \cdot x_1 + w_{mn} \cdot x_n + b_m \;]
= [y_1, \cdots, y_m]$$

<br>

> W : (n, m) , B : (m, ) , X : (n, ) , Y : (m, )

- n : 입력값 개수
- m : 출력값 개수

<br>

$$
\frac{\partial y_k}{\partial x_i} = w_{ki} \;, \quad
\frac{\partial y_k}{\partial w_{ki}} = x_i \;, \quad
\frac{\partial y_k}{\partial b_k} = 1
$$

<br>

### 체인룰 적용

$$
\frac{\partial L}{\partial Y} = [\frac{\partial L}{\partial y_1}, \cdots, \frac{\partial L}{\partial y_m}]
$$

$$
\frac{\partial L}{\partial x_i}
= \sum_k \frac{\partial L}{\partial y_k} \cdot \frac{\partial y_k}{\partial x_i}
= \sum_k \frac{\partial L}{\partial y_k} \cdot w_{ki}
$$

$$
\frac{\partial L}{\partial w_{ki}}
= \frac{\partial L}{\partial y_k} \cdot \frac{\partial y_k}{\partial w_{ki}}
= \frac{\partial L}{\partial y_k} \cdot x_i
$$

$$
\frac{\partial L}{\partial b_k}
= \frac{\partial L}{\partial y_k} \cdot \frac{\partial y_k}{\partial b_k}
= \frac{\partial L}{\partial y_k} \cdot 1
$$

<br>

정리하면 다음과 같다.

$$
\frac{\partial L}{\partial X}
= \left[ \sum_k \frac{\partial L}{\partial y_k} \cdot w_{k1}, \ldots, \sum_k \frac{\partial L}{\partial y_k} \cdot w_{kn} \right]
= \frac{\partial L}{\partial Y} \cdot W^T
$$

$$
\frac{\partial L}{\partial W} =
\begin{bmatrix}
\frac{\partial L}{\partial y_1} x_1 & \cdots & \frac{\partial L}{\partial y_m} x_1 \\
 & \vdots &  \\
\frac{\partial L}{\partial y_1} x_n & \cdots & \frac{\partial L}{\partial y_m} x_n
\end{bmatrix}
= X^T \cdot \frac{\partial L}{\partial Y}
$$

$$
\frac{\partial L}{\partial B} = \frac{\partial L}{\partial Y}
$$

<br>

### 배치 형태인 경우

$$ Y = X \cdot W + B$$

$$
W =
\begin{bmatrix}
w_{11} & \cdots & w_{1m} \\
 & \vdots &  \\
w_{n1} & \cdots & w_{nm}
\end{bmatrix}
\; , \quad
B = [b_1, \cdots, b_m]
\; , \quad
X =
\left.
\begin{bmatrix}
[x_1, \cdots, x_n] \\
\vdots \\
[x_1, \cdots, x_n]
\end{bmatrix}
\;
\right\} N
\; , \quad
Y =
\left.
\begin{bmatrix}
[y_1, \cdots, y_m] \\
\vdots \\
[y_1, \cdots, y_m]
\end{bmatrix}
\;
\right\} N
$$

<br>

> W : (n, m) , B : (m, ) , X : (N, n) , Y : (N, m)

- N : 배치 사이즈
- n : 입력값 개수
- m : 출력값 개수

> B의 경우 Numpy의 broadcasting으로 인해 (m, ) → (1, m) → (N, m) 형태로 연산을 수행한다.

<br>

$$
\frac{\partial L^{batch}}{\partial Y^{batch}} =
\begin{bmatrix}
[\frac{\partial L}{\partial y_1}, \cdots, \frac{\partial L}{\partial y_m}] \\
\vdots \\
[\frac{\partial L}{\partial y_1}, \cdots, \frac{\partial L}{\partial y_m}]
\end{bmatrix}
$$

$$
\frac{\partial L}{\partial X} =
\begin{bmatrix}
\left[ \sum_k \frac{\partial L}{\partial y_k} \cdot w_{k1}, \ldots, \sum_k \frac{\partial L}{\partial y_k} \cdot w_{kn} \right] \\
\vdots \\
\left[ \sum_k \frac{\partial L}{\partial y_k} \cdot w_{k1}, \ldots, \sum_k \frac{\partial L}{\partial y_k} \cdot w_{kn} \right]
\end{bmatrix}
= \frac{\partial L}{\partial Y} \cdot W^T
$$

<br>

> $\frac{\partial L}{\partial W}$ 와 $\frac{\partial L}{\partial B}$는 배치의 원소의 편미분값의 합으로 계산한다
>
> $X^T \cdot \frac{\partial L}{\partial Y}$ 구현을 그대로 유지하려고 하는 것 같다. 뒤에서 구현하는 신경망을 보면 대신 dx 값을 배치의 크기로 나눈다.

<br>

$$
\frac{\partial L}{\partial W} =
\begin{bmatrix}
\sum^N \frac{\partial L}{\partial y_1} x_1 & \cdots & \sum^N \frac{\partial L}{\partial y_m} x_1 \\
 & \vdots &  \\
\sum^N \frac{\partial L}{\partial y_1} x_n & \cdots & \sum^N \frac{\partial L}{\partial y_m} x_n
\end{bmatrix}
= X^T \cdot \frac{\partial L}{\partial Y}
$$

$$
\frac{\partial L}{\partial B} =
\left[\sum^N \frac{\partial L}{\partial y_1}, \cdots, \sum^N \frac{\partial L}{\partial y_m} \right]
$$


```python
class Affine:
    def __init__(self, W, b):
        self.W = W
        self.b = b

        # dW, db 계산용
        self.x = None
        self.dW = None
        self.db = None

    def forward(self, x):
        self.x = x
        out = np.dot(x, self.W) + self.b

        return out

    def backward(self, dout):
        dx = np.dot(dout, self.W.T)

        self.dW = np.dot(self.x.T, dout)
        self.db = np.sum(dout, axis=0)

        return dx
```

<br>


## Softmax-with-Loss

$$
y_k = \frac{exp(a_k)}{\sum_{i=1}^{n}exp(a_i)}
\; , \quad
L = - \sum_k t_k log(y_k)
$$

<br>

$$
\frac{\partial L}{\partial y_k} = - \frac{t_k}{y_k}
$$

$$
\frac{\partial y_k}{\partial a_k}
= y_k - \frac{exp(2 a_k)}{\left(\sum_i exp(a_i) \right)^2}
= y_k - y_k^2
$$

$$
\frac{\partial y_j}{\partial a_k}
= - \frac{exp(a_k) \cdot exp(a_j)}{\left(\sum_i exp(a_i) \right)^2}
= - y_j \cdot y_k
\; ,\quad \text{where j ≠ k}
$$

<br>

체인룰을 적용하여 $\frac{\partial L}{\partial a_k}$ 를 다음과 같이 계산할 수 있다.

$$
\begin{align}
\frac{\partial L}{\partial a_k} &= \sum_j \frac{\partial L}{\partial y_j} \cdot \frac{\partial y_j}{\partial a_k} \\
&= \frac{\partial L}{\partial y_k} \cdot \frac{\partial y_k}{\partial a_k}
 + \sum_{j \neq k} \frac{\partial L}{\partial y_j} \cdot \frac{\partial y_j}{\partial a_k} \\
&= - \frac{t_k}{y_k} (y_k - y_k^2) + \sum_{j \neq k} (- \frac{t_j}{y_j})(- y_j \cdot y_k) \\
&= - t_k + t_k \cdot y_k + y_k \sum_{j \neq k} t_j \\
&= - t_k + y_k \underbrace{\sum_{j} t_j}_1 \\
&= y_k - t_k
\end{align}
$$

> '소프트맥스' 함수의 손실함수로 '교차 엔트로피 오차'를 사용할 때의 역전파가 $y_k - t_k$로 떨어지는 것처럼 '항등함수'의 손실함수로 '오차제곱합'을 사용하면 역전파의 결과가 $y_k - t_k$로 떨어진다.
>
> 그렇게 설계되었다고 한다.


```python
def softmax(x):
    c = np.max(x, axis=-1).reshape(-1, 1)
    exp_x = np.exp(x - c)
    sum_exp_x = np.sum(exp_x, axis=-1).reshape(-1, 1)

    return exp_x / sum_exp_x

def cross_entropy_error(y, t):
    delta = 1e-7

    # one-hot encoding인 경우 숫자 인덱스로 변환
    if t.size == y.size:
        t = np.argmax(t, axis=-1)

    batch_size = y.shape[0]
    return - np.sum(np.log(y[np.arange(batch_size), t] + delta)) / batch_size

class SoftmaxWithLoss:
    def __init__(self):
        self.loss = None
        self.y = None
        self.t = None

    def forward(self, x, t):
        self.t = t
        self.y = softmax(x)
        self.loss = cross_entropy_error(self.y, t)

        return self.loss

    def backward(self, dout=1):
        batch_size = self.y.shape[0]

        if self.t.size == self.y.size:       # one-hot encoding인 경우
            dx = (self.y - self.t)
        else:
            dx = self.y.copy()
            dx[np.arange(batch_size), self.t] -= 1

        return dx / batch_size   # 배치의 수로 나눠서 전파
```

> 배치 수로 나누는 것은 $\frac{\partial L}{\partial W}$ 와 $\frac{\partial L}{\partial B}$ 를 계산할 때 배치의 원소들을 다 합하기 때문에 크기를 맞춰주기 위해 하는 것 같다.

<br>


## 오차역전파법 구현

```python
def numerical_gradient(f, x):
    h = 1e-4
    grad = np.zeros_like(x)

    for idx, x_i in np.ndenumerate(x):
        x[idx] = x_i + h
        f_forward = f(x)

        x[idx] = x_i - h
        f_backward = f(x)

        grad[idx] = (f_forward - f_backward) / (2 * h)
        x[idx] = x_i

    return grad

class TwoLayerNet:
    def __init__(self, input_size, hidden_size, output_size, weight_init_std=0.01):
        #  가중치 초기화
        self.params = {}
        self.params['W1'] = weight_init_std * np.random.randn(input_size, hidden_size)
        self.params['b1'] = np.zeros(hidden_size)
        self.params['W2'] = weight_init_std * np.random.randn(hidden_size, output_size)
        self.params['b2'] = np.zeros(output_size)

        # 계층 생성
        self.layers = OrderedDict()
        self.layers['Affine1'] = Affine(self.params['W1'], self.params['b1'])
        self.layers['Relu1'] = Relu()
        self.layers['Affine2'] = Affine(self.params['W2'], self.params['b2'])

        self.last_layer = SoftmaxWithLoss()

    def predict(self, x):
        for layer in self.layers.values():
            x = layer.forward(x)

        return x

    def loss(self, x, t):
        y = self.predict(x)
        return self.last_layer.forward(y, t)

    def accuracy(self, x, t):
        y = self.predict(x)

        if y.size == t.size:   # one-hot encoding인 경우 숫자 인덱스로 변환
            t = np.argmax(t, axis=1)
        y = np.argmax(y, axis=1)

        return np.sum(y == t) / t.size

    def numerical_gradient(self, x, t):
        loss_W = lambda W: self.loss(x, t)

        grads = {}
        grads['W1'] = numerical_gradient(loss_W, self.params['W1'])
        grads['b1'] = numerical_gradient(loss_W, self.params['b1'])
        grads['W2'] = numerical_gradient(loss_W, self.params['W2'])
        grads['b2'] = numerical_gradient(loss_W, self.params['b2'])

        return grads

    def gradient(self, x, t):
        # 순전파
        self.loss(x, t)

        # 역전파
        dout = self.last_layer.backward()
        for layer in reversed(self.layers.values()):
            dout = layer.backward(dout)

        # Gradient
        grads = {}
        grads['W1'], grads['b1'] = self.layers['Affine1'].dW, self.layers['Affine1'].db
        grads['W2'], grads['b2'] = self.layers['Affine2'].dW, self.layers['Affine2'].db

        return grads
```

<br>

### 수치미분을 이용해 오차역전파법 구현 검증

```python
# 검증용 데이터
x_train, t_train, x_test, t_test = load_mnist()   # normalize=True, flatten=True, one_hot_label=False
x_batch, t_batch = x_train[:3], t_train[:3]

# 신경망 생성
network = TwoLayerNet(input_size=784, hidden_size=50, output_size=10)

grad_numerical = network.numerical_gradient(x_batch, t_batch)
grad_backprop = network.gradient(x_batch, t_batch)

for key, value in grad_numerical.items():
    diff = np.average(np.abs(grad_backprop[key] - value))
    print(f'{key} : {diff}')
```

    W1 : 5.52850180722519e-10
    b1 : 3.3030986719916577e-09
    W2 : 5.808290972341432e-09
    b2 : 1.398841067520862e-07


> 오차가 매우 작음을 확인할 수 있다.

<br>

### 학습

```python
x_train, t_train, x_test, t_test = load_mnist()   # normalize=True, flatten=True, one_hot_label=False

network = TwoLayerNet(input_size=784, hidden_size=50, output_size=10)

# hyperparameter
ITERS_NUM = 10000
BATCH_SIZE = 100
LEARNING_RATE = 0.1

train_loss_list = []
train_acc_list = []
test_acc_list = []

train_size = x_train.shape[0]
iter_per_epoch = train_size // BATCH_SIZE   # 1 epoch당 반복 수

for i in range(ITERS_NUM):
    # 미니배치 획득
    batch_mask = np.random.choice(train_size, BATCH_SIZE)
    x_batch = x_train[batch_mask]
    t_batch = t_train[batch_mask]

    # 기울기
    grads = network.gradient(x_batch, t_batch)

    # 매개변수 갱신
    for key, grad in grads.items():
        network.params[key] -= LEARNING_RATE * grad

    # 학습 경과 기록
    loss = network.loss(x_batch, t_batch)
    train_loss_list.append(loss)

    # 1 epoch당 정확도 계산
    if i % iter_per_epoch == 0:
        train_acc = network.accuracy(x_train, t_train)
        test_acc = network.accuracy(x_test, t_test)
        train_acc_list.append(train_acc)
        test_acc_list.append(test_acc)

        print(f"Train Acc = {train_acc} | Test Acc {test_acc}")
```

    Train Acc = 0.09208333333333334 | Test Acc 0.0892
    Train Acc = 0.9047666666666667 | Test Acc 0.9083
    Train Acc = 0.9225 | Test Acc 0.9273
    Train Acc = 0.9353833333333333 | Test Acc 0.9343
    Train Acc = 0.94335 | Test Acc 0.9428
    Train Acc = 0.9507333333333333 | Test Acc 0.947
    Train Acc = 0.9560333333333333 | Test Acc 0.9516
    Train Acc = 0.96005 | Test Acc 0.9557
    Train Acc = 0.9607 | Test Acc 0.9564
    Train Acc = 0.9657 | Test Acc 0.9592
    Train Acc = 0.9680166666666666 | Test Acc 0.9613
    Train Acc = 0.97075 | Test Acc 0.9661
    Train Acc = 0.9723 | Test Acc 0.9653
    Train Acc = 0.9738666666666667 | Test Acc 0.9672
    Train Acc = 0.9752666666666666 | Test Acc 0.9682
    Train Acc = 0.9770166666666666 | Test Acc 0.9686
    Train Acc = 0.97585 | Test Acc 0.9668
