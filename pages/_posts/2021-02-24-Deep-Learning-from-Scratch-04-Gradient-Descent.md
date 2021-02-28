---
category: 'Deep Learning'
title: 밑바닥부터 시작하는 딥러닝 04 신경망 학습 - 경사하강법
---


학습 : 훈련 데이터로부터 가중치 매개변수의 최적값을 구하는 것

- 학습 지표 : 손실 함수
- 학습 목표 : 손실 함수의 결괏값을 가장  작게 만드는 가중치 매개변수를 찾는 것

> 정확도는 매개변수의 미묘한 변화에 거의 반응을 보이지 않고 변하더라도 불연속적으로 갑자기 변화하기 때문에 지표로 삼기에 적절하지 않다.

<br>

> 전반적으로 책의 구현과 조금 다르다.

```python
import numpy as np
```

## Loss Function (손실함수) / Cost Function (비용 함수)

### SSE (오차제곱합)

$$E = \frac{1}{2}\sum_k(y_k - t_k)^2$$

- $y$ : 출력값
- $t$ : 정답 레이블 (one-hot encoding)

> $1 \over 2$이 붙은 이유는 해당 함수를 미분할 때 붙는 상수 '2'를 상쇄하기 위해서 이다.


```python
def sum_squares_error(y, t):
    return np.sum((y - t) ** 2) / 2


# 정답 레이블 : 2
t = [0, 0, 1, 0, 0, 0, 0, 0, 0, 0]   # one-hot encoding

# 정답 레이블인 '2'일 확률이 가장 높다고 추정
y = [0.1, 0.05, 0.6, 0.0, 0.05, 0.1, 0.0, 0.1, 0.0, 0.0]
print(sum_squares_error(np.array(y), np.array(t)))

# 정답이 아닌 레이블인 '7'일 확률이 가장 높다고 추정
y = [0.1, 0.05, 0.1, 0.0, 0.05, 0.1, 0.0, 0.6, 0.0, 0.0]
print(sum_squares_error(np.array(y), np.array(t)))
```

    0.09750000000000003
    0.5975

<br>


### Cross Entropy Error (교차 엔트로피 에러)

$$E = - \sum_k t_k \cdot log y_k$$

- $y$ : 출력값
- $t$ : 정답 레이블 (one-hot encoding)

> 결과적으로 정답 인덱스일 확률의 자연로그


```python
def cross_entropy_error(y, t):
    delta = 1e-7
    return - np.sum(t * np.log(y + delta))   # delta의 역할 : np.log의 입력값이 0이 되는 것 방지


# 정답 레이블 : 2
t = [0, 0, 1, 0, 0, 0, 0, 0, 0, 0]   # one-hot encoding

# 정답 레이블인 '2'일 확률이 가장 높다고 추정
y = [0.1, 0.05, 0.6, 0.0, 0.05, 0.1, 0.0, 0.1, 0.0, 0.0]
print(cross_entropy_error(np.array(y), np.array(t)))

# 정답이 아닌 레이블인 '7'일 확률이 가장 높다고 추정
y = [0.1, 0.05, 0.1, 0.0, 0.05, 0.1, 0.0, 0.6, 0.0, 0.0]
print(cross_entropy_error(np.array(y), np.array(t)))
```

    0.510825457099338
    2.302584092994546

<br>


### 배치용 교차 엔트로피 에러

$$E = - \frac{1}{N} \sum_n \sum_k t_{nk} \cdot log y_{nk}$$

- N : 데이터 개수 (batch 크기)
- $t_n$ : n번째 출력값
- $y_n$ : n번째 데이터의 정답 레이블

#### (1) target 레이블이 one-hot encoding 인 경우


```python
def cross_entropy_error(y, t):
    delta = 1e-7
    batch_size = y.shape[0] if y.ndim > 1 else 1

    return - np.sum(t * np.log(y + delta)) / batch_size


# batch가 아닌 형태
t_1 = np.array([1, 0, 0])
y_1 = np.array([0.19632642, 0.44743231, 0.35624127])
e_1 = cross_entropy_error(y_1, t_1)

t_2 = np.array([0, 1, 0])
y_2 = np.array([0.32645762, 0.33436991, 0.33917247])
e_2 = cross_entropy_error(y_2, t_2)

print('배치가 아닌 데이터\n')
print(f'e1 : {e_1}')
print(f'e2 : {e_2}')
print(f'E  : {(e_1 + e_2) / 2}')

# batch 형태
t_batch = np.array([[1, 0, 0], [0, 1, 0]])
y_batch = np.array([[0.19632642, 0.44743231, 0.35624127],
                    [0.32645762, 0.33436991, 0.33917247]])

print('\n배치 데이터\n')
print(cross_entropy_error(y_batch, t_batch))
```

    배치가 아닌 데이터

    e1 : 1.627976087487067
    e2 : 1.0955070848077066
    E  : 1.361741586147387

    배치 데이터

    1.361741586147387


#### (2) target 레이블이 숫자 레이블인 경우


```python
def cross_entropy_error(y, t):
    delta = 1e-7

    if y.ndim == 1:
        return - np.sum(np.log(y[t] + delta))
    else:
        batch_size = y.shape[0]
        return - np.sum(np.log(y[np.arange(batch_size), t] + delta)) / batch_size


# batch가 아닌 형태
t_1 = np.array(0)
y_1 = np.array([0.19632642, 0.44743231, 0.35624127])
e_1 = cross_entropy_error(y_1, t_1)

t_2 = np.array(1)
y_2 = np.array([0.32645762, 0.33436991, 0.33917247])
e_2 = cross_entropy_error(y_2, t_2)

print('배치가 아닌 데이터\n')
print(f'e1 : {e_1}')
print(f'e2 : {e_2}')
print(f'E  : {(e_1 + e_2) / 2}')

# batch 형태
t_batch = np.array([0, 1])
y_batch = np.array([[0.19632642, 0.44743231, 0.35624127],
                    [0.32645762, 0.33436991, 0.33917247]])

print('\n배치 데이터\n')
print(cross_entropy_error(y_batch, t_batch))
```

    배치가 아닌 데이터

    e1 : 1.627976087487067
    e2 : 1.0955070848077066
    E  : 1.361741586147387

    배치 데이터

    1.361741586147387

<br>


## 수치미분

### 미분

$$\frac{df(x)}{dx} = \lim_{h \to 0} \frac{f(x + h) - f(x)}{h}$$

<br>


### 수치 미분

작은 수 `h`를 이용하여 실제 미분값의 근사값을 계산하는 것으로 오차를 포함하게 된다.

> 오차를 줄이기 위해 central difference 방식을 사용할 수 있다.
>
> $$\frac{df(x)}{dx} \approx \frac{f(x + h) - f(x - h)}{2 \cdot h}$$

<br>


$y = 2x^2 + 3x + 1$ 의 x = 5 에서의 미분 계산

> $y' = 4x + 3$


```python
def numerical_diff(f, x):
    h = 1e-4
    return (f(x + h) - f(x - h)) / (2 * h)

def function_1(x):
    return 2 * (x ** 2) + 3 * x + 1


# 수치 미분
numerical_diff(function_1, 5)
```

    22.99999999991087


<br>


### 편미분 (Partial derivative)

$f_x' , \frac{\partial f}{\partial x}$ : 다변수 함수에서 특정 변수에 대해서 나머지 변수들을 상수로 보고 미분

<br>

$f(x_0, x_1) = x_0^2 + x_1^2$ 의 $x_0$ = 3 , $x_1$ = 4 에서의 편미분

> $\frac{\partial f}{\partial x_0} = 2x_0$
>
> $\frac{\partial f}{\partial x_1} = 2x_1$


```python
# x는 ndarray
def function_2(x):
    return np.sum(x ** 2)

# x는 숫자 하나
def numerical_diff(f, x):
    h = 1e-4
    return (f(x + h) - f(x - h)) / (2 * h)

def function_x0(x0):
    return x0 ** 2 + 4 ** 2

def function_x1(x1):
    return 3 ** 2 + x1 ** 2

print(numerical_diff(function_x0, 3))
print(numerical_diff(function_x1, 4))
```

    6.00000000000378
    7.999999999999119


<br>


# Gradient (기울기)

$$\nabla f = [\frac{\partial f}{\partial x_1}, \ldots, \frac{\partial f}{\partial x_n}]$$

> 각 변수의 편미분으로 이루어진 벡터

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


def function_2(x):
    return np.sum(x ** 2)

print(numerical_gradient(function_2, np.array([3.0, 4.0])))
print(numerical_gradient(function_2, np.array([1.5, 2.0])))
print(numerical_gradient(function_2, np.array([3.0, 0.01])))
```

    [6. 8.]
    [3. 4.]
    [6.   0.02]

<br>


### Gradient Descent (경사 하강법)

$$x_k = x_k - \eta \cdot \frac{\partial f}{\partial x_k}$$

- $\eta$ (eta) : 학습률 (learning rate)

> 학습률이 너무 크면 값이 발산해 버리고, 너무 작으면 거의 갱신되지 않기 때문에 적절한 학습률을 설정해야 한다.


```python
def gradient_descent(f, init_x, lr=0.01, step_num=100):
    x = init_x.copy()

    for i in np.arange(step_num):
        grad = numerical_gradient(f, x)
        x -= lr * grad

    return x


def function_2(x):
    return np.sum(x ** 2)


init_x = np.array([-3.0, 4.0])

print('lr = 0.01   :', gradient_descent(function_2, init_x=init_x))
print('lr = 0.1    :', gradient_descent(function_2, init_x=init_x, lr=0.1))
print('lr = 10     :', gradient_descent(function_2, init_x=init_x, lr=10))      # 학습률이 너무 큰 예
print('lr = 1e-10  :', gradient_descent(function_2, init_x=init_x, lr=1e-10))   # 학습률이 너무 작은 예
```

    lr = 0.01   : [-0.39785867  0.53047822]
    lr = 0.1    : [-6.11110793e-10  8.14814391e-10]
    lr = 10     : [-2.58983747e+13 -1.29524862e+12]
    lr = 1e-10  : [-2.99999994  3.99999992]


> **Hyperparameter (하이퍼파라미터)**
> : 학습 과정을 제어하는 파라미터 (사람이 설정해 주어야 하는 파라미터)

<br>


### 신경망에서의 기울기

> 가중치 매개변수에 대한 손실 함수의 기울기


```python
def softmax(x):
    if x.ndim == 1:
        exp_x = np.exp(x - np.max(x))
        sum_exp_x = np.sum(exp_x)
    else:
        c = np.max(x, axis=-1).reshape(-1, 1)
        exp_x = np.exp(x - c)
        sum_exp_x = np.sum(exp_x, axis=-1).reshape(-1, 1)

    return exp_x / sum_exp_x

def cross_entropy_error(y, t):
    delta = 1e-7

    # one-hot encoding인 경우 숫자 인덱스로 변환
    if t.size == y.size:
        t = np.argmax(t, axis=-1)

    if y.ndim == 1:
        return - np.sum(np.log(y[t] + delta))
    else:
        batch_size = y.shape[0]
        return - np.sum(np.log(y[np.arange(batch_size), t] + delta)) / batch_size

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
```


```python
class SimpleNet:
    def __init__(self):
        self.W = np.random.randn(2, 3)

    def predict(self, x):
        return np.dot(x, self.W)

    def loss(self, x, t):
        z = self.predict(x)
        y = softmax(z)
        return cross_entropy_error(y, t)


net = SimpleNet()
x = np.array([0.6, 0.9])
t = np.array([0, 0, 1])

print('초기 가중치')
print(net.W)

print('\n예측')
p = net.predict(x)
print(np.argmax(p), p)

print('\n손실함수')
print(net.loss(x, t))


print('\n기울기')
f = lambda W: net.loss(x, t)
dW = numerical_gradient(f, net.W)
print(dW)

print('\n가중치 업데이트')
net.W -= 0.1 * dW
print(net.W)

print('\n예측')
p = net.predict(x)
print(np.argmax(p), p)

print('\n손실함수')
print(net.loss(x, t))
```

    초기 가중치
    [[-1.88592905  0.433029   -0.8528666 ]
     [-2.5660367  -0.70119347 -1.32334046]]

    예측
    1 [-3.44099046 -0.37125673 -1.70272638]

    손실함수
    1.601894968202963

    기울기
    [[ 0.02125877  0.45783247 -0.47909125]
     [ 0.03188816  0.68674871 -0.71863687]]

    가중치 업데이트
    [[-1.88805493  0.38724575 -0.80495748]
     [-2.56922551 -0.76986835 -1.25147677]]

    예측
    1 [-3.44513592 -0.46053406 -1.60930358]

    손실함수
    1.461816416855366


> 가중치 업데이트 이후 손실 함수가 감소하는 것을 확인할 수 있다.

<br>


## 학습 알고리즘 구현 (2층 신경망 - MNIST data)

SGD (Stochastic Gradient Descent)
: 확률적 경사 하강법

1. 미니배치
2. 기울기 산출
3. 매개변수 갱신
4. 1 ~ 3 반복

> 데이터를 미니배치로 무작위로 선정하기 때문에 확률적 경사 하강법이라고 부른다.


```python
def sigmoid(x):
    return 1 / (1 + np.exp(-x))

def softmax(x):
    if x.ndim == 1:
        exp_x = np.exp(x - np.max(x))
        sum_exp_x = np.sum(exp_x)
    else:
        c = np.max(x, axis=-1).reshape(-1, 1)
        exp_x = np.exp(x - c)
        sum_exp_x = np.sum(exp_x, axis=-1).reshape(-1, 1)

    return exp_x / sum_exp_x

def cross_entropy_error(y, t):
    delta = 1e-7

    # one-hot encoding인 경우 숫자 인덱스로 변환
    if t.size == y.size:
        t = np.argmax(t, axis=-1)

    if y.ndim == 1:
        return - np.sum(np.log(y[t] + delta))
    else:
        batch_size = y.shape[0]
        return - np.sum(np.log(y[np.arange(batch_size), t] + delta)) / batch_size

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
```


```python
class TwoLayerNet:
    def __init__(self, input_size, hidden_size, output_size, weight_init_std=0.01):
        #  가중치 초기화
        self.params = {}
        self.params['W1'] = weight_init_std * np.random.randn(input_size, hidden_size)
        self.params['b1'] = np.zeros(hidden_size)
        self.params['W2'] = weight_init_std * np.random.randn(hidden_size, output_size)
        self.params['b2'] = np.zeros(output_size)

    def predict(self, x):
        W1, W2 = self.params['W1'], self.params['W2']
        b1, b2 = self.params['b1'], self.params['b2']

        # layer 1
        a1 = np.dot(x, W1) + b1
        z1 = sigmoid(a1)

        # layer 2
        a2 = np.dot(z1, W2) + b2
#         y = softmax(a2)

        return a2

    def loss(self, x, t):
        y = self.predict(x)
        y = softmax(y)
        return cross_entropy_error(y, t)

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
```

```python
(x_train, t_train), (x_test, t_test) = load_mnist()   # normalize=True, flatten=True, one_hot_label=False

network = TwoLayerNet(input_size=784, hidden_size=50, output_size=10)

# hyperparameter
ITERS_NUM = 100
BATCH_SIZE = 100
LEARNING_RATE = 0.1

train_size = x_train.shape[0]

for i in range(ITERS_NUM):
    # 미니배치 획득
    batch_mask = np.random.choice(train_size, BATCH_SIZE)
    x_batch = x_train[batch_mask]
    t_batch = t_train[batch_mask]

    # 기울기
    grads = network.numerical_gradient(x_batch, t_batch)

    # 매개변수 갱신
    for key, grad in grads.items():
        network.params[key] -= LEARNING_RATE * grad

    # 학습 경과
    loss = network.loss(x_batch, t_batch)
    train_acc = network.accuracy(x_train, t_train)
    test_acc = network.accuracy(x_test, t_test)

    print(f"loss = {loss:.6f} | train Acc = {train_acc:.6f} | test Acc {test_acc:.6f}")
```

    loss = 2.298417 | train Acc = 0.102183 | test Acc 0.101000
    loss = 2.298946 | train Acc = 0.097517 | test Acc 0.097400
    loss = 2.293412 | train Acc = 0.112367 | test Acc 0.113500
    loss = 2.295133 | train Acc = 0.112367 | test Acc 0.113500
    loss = 2.295944 | train Acc = 0.123067 | test Acc 0.128000
    loss = 2.284849 | train Acc = 0.097517 | test Acc 0.097400
    loss = 2.291966 | train Acc = 0.112367 | test Acc 0.113500
    loss = 2.286020 | train Acc = 0.112367 | test Acc 0.113500
    loss = 2.286642 | train Acc = 0.112367 | test Acc 0.113500
    loss = 2.288241 | train Acc = 0.112367 | test Acc 0.113500
    .
    .
    .

> 너무 오래걸려서 끝까지 실행하는 걸 추천하지는 않는다....
