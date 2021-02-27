---
category: 'Deep Learning'
title: 밑바닥부터 시작하는 딥러닝 02 퍼셉트론
---

```python
import numpy as np
```

## Single-Layer Perceptron

### AND Gate


```python
def AND(x1, x2):
    x = np.array([x1, x2])
    w = np.array([0.5, 0.5])
    b = -0.7

    tmp = np.dot(x, w) + b
    if tmp <= 0:
        return 0
    else:
        return 1
```


```python
input_data = ((0, 0), (1, 0), (0, 1), (1, 1))

for x1, x2 in input_data:
    print(f"{x1}, {x2}  =>  {AND(x1, x2)}")
```

    0, 0  =>  0
    1, 0  =>  0
    0, 1  =>  0
    1, 1  =>  1


### NAND Gate


```python
def NAND(x1, x2):
    x = np.array([x1, x2])
    w = np.array([-0.5, -0.5])
    b = 0.7

    tmp = np.dot(x, w) + b
    if tmp <= 0:
        return 0
    else:
        return 1
```


```python
input_data = ((0, 0), (1, 0), (0, 1), (1, 1))

for x1, x2 in input_data:
    print(f"{x1}, {x2}  =>  {NAND(x1, x2)}")
```

    0, 0  =>  1
    1, 0  =>  1
    0, 1  =>  1
    1, 1  =>  0


### OR Gate


```python
def OR(x1, x2):
    x = np.array([x1, x2])
    w = np.array([0.5, 0.5])
    b = -0.3

    tmp = np.dot(x, w) + b
    if tmp <= 0:
        return 0
    else:
        return 1
```


```python
input_data = ((0, 0), (1, 0), (0, 1), (1, 1))

for x1, x2 in input_data:
    print(f"{x1}, {x2}  =>  {OR(x1, x2)}")
```

    0, 0  =>  0
    1, 0  =>  1
    0, 1  =>  1
    1, 1  =>  1

<br>


## Multi-Layer Perceptron

### XOR Gate

XOR 게이트는 AND, NAND, OR와 달리 단층 퍼셉트론으로는 구현이 불가능하다.


```python
def XOR(x1, x2):
    s1 = OR(x1, x2)
    s2 = NAND(x1, x2)

    return AND(s1, s2)
```


```python
input_data = ((0, 0), (1, 0), (0, 1), (1, 1))

for x1, x2 in input_data:
    print(f"{x1}, {x2}  =>  {XOR(x1, x2)}")
```

    0, 0  =>  0
    1, 0  =>  1
    0, 1  =>  1
    1, 1  =>  0
