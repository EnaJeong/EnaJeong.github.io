---
category: 'Deep Learning'
title: 밑바닥부터 시작하는 딥러닝 03 신경망
---


```python
import numpy as np
import matplotlib.pyplot as plt
```

## Perceptron


$$
\left.
\begin{matrix}
1 & \xrightarrow{w_0 = b} & b \\
x_1 & \xrightarrow{w_1} & w_1 \cdot x_1 \\
\vdots &  & \vdots \\
x_d & \xrightarrow{w_d} & w_d \cdot x_d
\end{matrix}
\quad
\right\}
\quad \Sigma \quad \to \quad z \quad \xrightarrow{\text{Activation function}} \quad \phi(z) = y(x)
$$

- b : bias (편향)
- w : weight (가중치)
- $\phi$ : activation function (활성화 함수)

<br>


## Hidden Layer Activation Function (은닉층 활성화 함수)

> 신경망의 활성화 함수로는 비선형 함수를 사용해야 한다.
>
> 선형함수를 사용하는 경우 여러 층으로 구성하는 이점을 살릴 수가 없다.
>
> h(x) = cx 라면, y(x) = h(h(h(x))) = c * c * c * x = αx  ⇒ 한 층만 있는 것과 같다.

### Step Function (계단 함수)

$$
y =
\begin{cases}
0,  & \text{if $z$ < 0} \\
1, & \text{if $z$ ≥ 0}
\end{cases}
$$


```python
def step_function(x):
    tmp = x >= 0

    return tmp.astype(np.int)
```

### Sigmoid

$$ \phi(z) = \frac{1}{1 + e^{-z}}$$


```python
def sigmoid(x):
    return 1 / (1 + np.exp(-x))
```

### ReLU (Rectified Linear Unit)

$$
y^{relu} =
\begin{cases}
0,  & \text{if $z$ < 0} \\
z, & \text{if $z$ ≥ 0}
\end{cases}
$$


```python
def relu(x):
    return np.maximum(0, x)
```

### Tanh (Hyperbolic Tangent)

$$y = \frac{e^z - e^{-z}}{e^z + e^{-z}}$$

> 책에서 소개하지 않은 함수


```python
def tanh(x):
    return (np.exp(x) - np.exp(-x)) / (np.exp(x) + np.exp(-x))
```

### 그래프


```python
x = np.arange(-5, 5, 0.01)
act_funcs = {'Step Function': step_function(x), 'Sigmoid':sigmoid(x),
             'ReLU': relu(x), 'Tanh': tanh(x)}

fig, axs = plt.subplots(figsize=(15, 10), nrows=2, ncols=2)

for i, (title, y) in enumerate(act_funcs.items()):
    low_idx = i // 2
    col_idx = i % 2

    axs[low_idx][col_idx].plot(x, y)
    axs[low_idx][col_idx].set_title(title, fontsize=15)
    axs[low_idx][col_idx].set_ylim([-1.1, 1.1])
    axs[low_idx][col_idx].grid(True)

plt.show()
```
<figure class="fixed-img">
  <img src="/assets/images/post/2021-02-23-Activation_Functions.png" alt="Hidden Layer Activation Functions" style="background-color: #888; min-width: 600px;">
</figure>

<br>




## Output Activation Function (출력층 활성화 함수)

- 회귀 : Identity Function (항등 함수)  
- 이진분류 : Sigmoid
- 다중분류 : Softmax

<br>


### Softmax

$$y_k = \frac{exp(a_k)}{\sum_{i=1}^{n}exp(a_i)}$$

> Softmax 함수는 단조 증가 함수이기 때문에, 원소들의 대소 관계는 Softmax 함수를 적용하기 전과 후가 같다.
>
> 따라서 학습이 아닌 추론 과정에서는 Softmax 함수의 적용을 생략해도 된다.


```python
def softmax(x):
    exp_x = np.exp(x)

    return exp_x / np.sum(exp_x)

test_data = np.array([-0.2,  1.5,  4.3])
softmax(test_data)
```




    array([0.01036365, 0.05673009, 0.93290626])



이러한 형태는 식을 제대로 표현하고 있지만 컴퓨터로 계산할 때 큰 입력값에 대해 오버플로가 발생하기 쉽다.

따라서 다음과 같은 형태로 개선할 수 있다.

$$
\begin{align}
y_k &= \frac{exp(a_k)}{\sum_{i=1}^{n}exp(a_k)}  \\
&= \frac{C \cdot exp(a_k)}{C \cdot \sum_{i=1}^{n}exp(a_k)}  \\
&= \frac{exp(a_k + logC)}{\sum_{i=1}^{n}exp(a_k + logC)}  \\
&= \frac{exp(a_k - C')}{\sum_{i=1}^{n}exp(a_k - C')}  \\
\end{align}
$$

여기서 $C'$ 값을 입력값 $a_k$ 중 가장 큰 값으로 정한다.


```python
test_data = np.array([1010, 1000, 990])
np.exp(test_data)
```

    # <ipython-input-8-ab640272c1e1>:2: RuntimeWarning: overflow encountered in exp
    #  np.exp(test_data)

    array([inf, inf, inf])




```python
def softmax(x):
    c = np.max(x)
    exp_x = np.exp(x - c)

    return exp_x / np.sum(exp_x)

test_data = np.array([1010, 1000, 990])
softmax(test_data)
```




    array([9.99954600e-01, 4.53978686e-05, 2.06106005e-09])


<br>


## 3층 신경망 구성

### 첫번째 Layer


```python
# 입력
X = np.array([1.0, 0.5])

# weight, bias
W1 = np.array([[0.1, 0.3, 0.5], [0.2, 0.4, 0.6]])
b1 = np.array([0.1, 0.2, 0.3])

print(f"X.shape  : {X.shape}")    # (2, )  => 1 X 2
print(f"W1.shape : {W1.shape}")   # (2, 3)
print(f"b1.shape : {b1.shape}")   # (3, )

# weight와 bias 적용
A1 = np.dot(X, W1) + b1

# 활성화 함수 적용
Z1 = sigmoid(A1)

print()
print(f"A1 : {A1}")
print(f"Z1 : {Z1}")
```

    X.shape  : (2,)
    W1.shape : (2, 3)
    b1.shape : (3,)

    A1 : [0.3 0.7 1.1]
    Z1 : [0.57444252 0.66818777 0.75026011]


### 3층 신경망


```python
# 초기값 설정
def init_network():
    network = {'W1': np.array([[0.1, 0.3, 0.5], [0.2, 0.4, 0.6]]),
               'b1': np.array([0.1, 0.2, 0.3]),
               'W2':np.array([[0.1, 0.4], [0.2, 0.5], [0.3, 0.6]]),
               'b2': np.array([0.1, 0.2]),
               'W3':np.array([[0.1, 0.3], [0.2, 0.4]]),
               'b3': np.array([0.1, 0.2])
              }

    return network

def forward(network, x):
    W1, W2, W3 = network['W1'], network['W2'], network['W3']
    b1, b2, b3 = network['b1'], network['b2'], network['b3']

    # 1st layer
    a1 = np.dot(x, W1) + b1
    z1 = sigmoid(a1)

    # 2nd layer
    a2 = np.dot(z1, W2) + b2
    z2 = sigmoid(a2)

    # output layer
    a3 = np.dot(z2, W3) + b3
    y = a3                        # output 활성화 함수로 항등함수 사용

    return y

network = init_network()
x = np.array([1.0, 0.5])
y = forward(network, x)
print(y)
```

    [0.31682708 0.69627909]


<br>


## MNIST 손글씨 숫자 인식

> 아직 훈련을 하지는 않으므로 가중치(weight)와 편향(bias)을 불러와서 사용한다.
>
> 데이터와 가중치, 편향을 불러오는 코드는 생략한다.

```python
def sigmoid(x):
    return 1 / (1 + np.exp(-x))

def softmax(x):
    c = np.max(x)
    exp_x = np.exp(x - c)

    return exp_x / np.sum(exp_x)

def predict(network, x):
    W1, W2, W3 = network['W1'], network['W2'], network['W3']
    b1, b2, b3 = network['b1'], network['b2'], network['b3']

    # 1st layer
    a1 = np.dot(x, W1) + b1
    z1 = sigmoid(a1)

    # 2nd layer
    a2 = np.dot(z1, W2) + b2
    z2 = sigmoid(a2)

    # output layer
    a3 = np.dot(z2, W3) + b3
    y = softmax(a3)            # 다중 분류이므로 Softmax 사용

    return y


(x_train, t_train), (x_test, t_test) = load_mnist()
network = init_network()

accuracy_cnt = 0
for i, x in enumerate(x_test):
    y = predict(network, x)
    p = np.argmax(y)

    if p == t_test[i]:
        accuracy_cnt += 1

print(f"Accuracy: {accuracy_cnt / len(x_test)}")
```

    Accuracy: 0.9352


<br>


### 배치처리

책에서 배치처리에서 Softmax 함수를 언급하지 않고 그냥 넘어가고 있는데 앞에서 구현한 Softmax 함수는 배치 처리를 고려하지 않고 짜여져 있다.

다음과 같이 (2 , 3)의 `ndarray`의 `np.sum`을 구하면 각 행마다의 합을 구하는 것이 아니라 전체 원소의 합을 반환하며, 특정 `axis`의 합을 구하고 싶은 경우에는 매개변수로 `axis`를 지정해 주어야 한다. 즉, 각 열(`axis: 0`)별로 행(`axis: 1`)들의 합을 구하고 싶은 경우에는 행의 합을 구하고 싶은 것이므로 `axis=1`로 지정해야 한다.


```python
test = np.array([[1, 2, 3], [4, 5, 6]])

print(np.sum(test))
print(np.sum(test, axis=1))
```

    21
    [ 6 15]


앞서 구현한 Softmax 함수는 `np.sum(exp_x)`을 이용하고 있으므로, 결국 각 입력값마다의 합으로 나누는 것이 아니라 같은 배치에 속하는 모든 입력값의 합으로 나누게 된다. 물론 이 경우에 각 row의 우선순위는 변하지 않기 때문에 이 장에서 확인하는 Accuracy에는 영향을 주지 않지만, 제대로 Softmax 함수를 적용하고 있는 것은 아니다.


```python
test_data = np.array([[ 1, 2, 3, 4],
                      [ 1, 3, 5, 7]])
print(test_data)

print()
print('np.sum :', np.sum(test_data))
print(test_data / np.sum(test_data))

print()
test_sum = np.sum(test_data, axis=1)
print('np.sum, axis=1 :', test_sum)
print('reshape :', test_sum.reshape(-1, 1))
print(np.divide(test_data, test_sum.reshape(-1, 1)))
```

    [[1 2 3 4]
     [1 3 5 7]]

    np.sum : 26
    [[0.03846154 0.07692308 0.11538462 0.15384615]
     [0.03846154 0.11538462 0.19230769 0.26923077]]

    np.sum, axis=1 : [10 16]
    reshape : [[10]
     [16]]
    [[0.1    0.2    0.3    0.4   ]
     [0.0625 0.1875 0.3125 0.4375]]


따라서 `softmax`함수를 다음과 같이 정의해야 batch 여부에 상관없이 정상적으로 값을 반환해준다.  

> `axis`를 `1`이 아니라 `-1`로 지정한 이유는 배치인 경우와 배치가 아닌 경우 모두 계산할 수 있도록 하기 위해서이다.


```python
def softmax(x):
    c = np.max(x, axis=-1).reshape(-1, 1)
    exp_x = np.exp(x - c)
    sum_exp_x = np.sum(exp_x, axis=-1).reshape(-1, 1)

    return exp_x / sum_exp_x

no_batch = np.array([1, 2, 3, 4])
batch = np.array([[ 1, 2, 3, 4],
                  [ 1, 3, 5, 7]])

print(softmax(no_batch))
print(softmax(batch))
```

    [[0.0320586  0.08714432 0.23688282 0.64391426]]
    [[0.0320586  0.08714432 0.23688282 0.64391426]
     [0.00214401 0.0158422  0.11705891 0.86495488]]


입력값이 형태가 바뀌는 것이 싫다면 다음과 같이 구현할 수도 있다.


```python
def softmax(x):
    if x.ndim == 1:
        exp_x = np.exp(x - np.max(x))
        sum_exp_x = np.sum(exp_x)
    else:
        c = np.max(x, axis=1).reshape(-1, 1)
        exp_x = np.exp(x - c)
        sum_exp_x = np.sum(exp_x, axis=1).reshape(-1, 1)

    return exp_x / sum_exp_x

no_batch = np.array([1, 2, 3, 4])
batch = np.array([[ 1, 2, 3, 4],
                  [ 1, 3, 5, 7]])

print(softmax(no_batch))
print(softmax(batch))
```

    [0.0320586  0.08714432 0.23688282 0.64391426]
    [[0.0320586  0.08714432 0.23688282 0.64391426]
     [0.00214401 0.0158422  0.11705891 0.86495488]]



```python
def softmax(x):
    c = np.max(x, axis=-1).reshape(-1, 1)
    exp_x = np.exp(x - c)
    sum_exp_x = np.sum(exp_x, axis=-1).reshape(-1, 1)

    return exp_x / sum_exp_x

def predict(network, x):
    W1, W2, W3 = network['W1'], network['W2'], network['W3']
    b1, b2, b3 = network['b1'], network['b2'], network['b3']

    a1 = np.dot(x, W1) + b1
    z1 = sigmoid(a1)

    a2 = np.dot(z1, W2) + b2
    z2 = sigmoid(a2)

    a3 = np.dot(z2, W3) + b3
    y = softmax(a3)

    return y


(x_train, t_train), (x_test, t_test) = load_mnist()
network = init_network()

batch_size = 100
accuracy_cnt = 0

for i in np.arange(0, len(x_test), batch_size):
    x_batch = x_test[i:i + batch_size]
    y_batch = predict(network, x_batch)
    p = np.argmax(y_batch, axis=1)

    accuracy_cnt += np.sum(p == t_test[i:i + batch_size])

print(f"Accuracy: {accuracy_cnt / len(x_test)}")
```

    Accuracy: 0.9352
