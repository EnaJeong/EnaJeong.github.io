---
category: 'Data Analysis'
tags: ['AD(s)P']
title: "[AD(s)P] 분류 모형 평가"
---
모형 평가
: 다양한 분류 분석 모형 중에서 데이터 마이닝의 목적 및 데이터 특성에 따라 가장 적합한 모형을 선택

<br>


## 모형 평가 기준

(1) 일반화 가능성
: 같은 모집단 내의 다른 데이터에 적용하는 경우에도 안정적인 결과를 제공하는지. 확장 적용 가능성

(2) 효율성
: 얼마나 효과적으로 구축되었는지 (얼마나 적은 입력변수를 필요로 하는지)

(3) 예측과 분류의 정확성
: 실제 문제에 적용했을 때 정확한 결과를 내는지

<br>


## 데이터 분할

전체 자료에서 모형 구축을 위한 훈련용 자료와 성과 검증을 위한 검증용 자료를 추출

> 주어진 데이터에서만 높은 성과를 보이는 모형의 Overfitting (과적합화) 문제를 해결하기 위한 단계
>
> 2종 오류 (잘못된 가설 가정) 발생 방지

<br>

### Hold-out 방법
: 원천 데이터를 랜덤하게 두 분류로 분리하여 교차 검정 실시하는 방법

일반적으로 전체의 70%를 훈련용으로 사용하고 30%는 검증용 자료로 사용

<br>

### Cross-validation (교차검증)
: 주어진 데이터를 가지고 반복적으로 성과를 측정하여 그 결과를 평균한 것으로 모형을 평가하는 방법

<br>

#### k-fold 교차검증
: 전체를 사이즈가 동일한 k개의 subset으로 나누고 k번째 subset을 검증용 자료로 나머지를 훈련용 자료로 사용

이를 k번 반복 측정하고 각각의 결과를 평균 낸 값을 최종 평가로 사용

> 일반적으로 10-fold 교차 검증이 사용된다. 집합 분포에 따라 적절한 k 선정 필
요

<br>

### Bootstrap
: 평가를 반복하는 것은 교차검증과 같지만 훈련용 자료를 복원 추출법으로 반복 재선정한다는 점이 차이

-> 전체 데이터의 양이 크지 않은 경우의 모형 평가에 가장 적합

> e.g) 0.632 Bootstrap : 선택되지 않은 36.8% 관측이가 검증용 자료로 사용됨

<br>


## Confusion Matrix (오분류표)

<table style="text-align: center;">
  <tbody>
    <tr>
      <th colspan="2" rowspan="2" style="visibility: hidden;"></th>
      <th colspan="2">Predicted</th>
    </tr>
    <tr>
      <th>Positive</th>
      <th>Negative</th>
    </tr>
    <tr>
      <th rowspan="2">Actual</th>
      <th>Positive</th>
      <td>TP</td>
      <td>FN</td>
      <td>P</td>
    </tr>
    <tr>
      <th>Negative</th>
      <td>FP</td>
      <td>TN</td>
      <td>N</td>
    </tr>
    <tr>
      <th colspan="2"  style="visibility: hidden;"></th>
      <td>P'</td>
      <td>N'</td>
    </tr>
  </tbody>
</table>

<br>


#### Accuracy (정분류율, Recognition Rate)
: 제대로 예측한 정도

$$Accuracy = \frac{TP + TN}{TP + FN + TN + FP}$$

<br>

#### Error Rate (오분류율, Misclassification Rate)
: 잘못 예측한 정도

$$Error Rate = \frac{FP + FN}{TP + FN + TN + FP}$$

<br>

#### Sensitivity (민감도)
: `Positive`를 제대로 예측한 정도

$$Sensitivity = \frac{TP}{TP + FN}$$

<br>

#### Specificity (특이도)
: `Negative`를 제대로 예측한 정도

$$Specificity = \frac{TN}{TN + FP}$$

<br>

#### Precison (정확도)
: `Positive` 예측의 정확도

$$Precison = \frac{TP}{TP + FP}$$

<br>

#### Recall (재현율)
: 민감도와 동일, `Positive`를 제대로 예측한 정도

$$Recall = \frac{TP}{TP + FP}$$

<br>

=> 모형의 완전성 평가지표

<br>

#### F1 score & $ F_β $ 지표
: 정확도와 재현율을 보정해 하나의 지표로 나타낸 것

$$F_1 = 2 \cdot \frac{Precision \times Recall}{Precision + Recall}$$

> Precision과 Recall의 조화 평균

<br>

$$F_\beta = \frac{(1 + \beta^2) \cdot Precision \times Recall}{ \beta^2 \cdot Precision + Recall}$$

> β 만큼 재현율에 가중치, 1/β 만큼 정확도에 가중치


<br>


## ROC 그래프

![ROC Curve](/assets/images/post/2020-08-17-ROC-Curve.png)

> (0, 1)에 가까우면서 면적이 넓을 수록 좋은 모형이다.

<br>

### 데이터

```python
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.neural_network import MLPClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import confusion_matrix, roc_auc_score
```

```python
infert = pd.read_csv('./datasets/infert.csv')

X_data = infert[['age', 'parity', 'induced', 'spontaneous']]
y_data = infert['case']

X_train, X_test, y_train, y_test = train_test_split(X_data, y_data, test_size=0.3)
y_label = np.array([1 - y_test, y_test]).T
n_classes = infert['case'].nunique()
```

### ANN

```python
# default: solver='adam', activation='relu'
mlp = MLPClassifier(hidden_layer_sizes=(4, ), max_iter=10000)
mlp.fit(X_train, y_train)

print('Confusion Matrix :')
print(confusion_matrix(y_test, mlp.predict(X_test)))

print('\nScore :', mlp.score(X_test, y_test))

y_score = mlp.predict_proba(X_test)
print('ROC AUC macro :', roc_auc_score(y_label, y_score))
print('ROC AUC micro :', roc_auc_score(y_label, y_score, average='micro'))
print('ROC AUC [0]   :', roc_auc_score(y_label[:, 0], y_score[:, 0]))
print('ROC AUC [1]   :', roc_auc_score(y_label[:, 1], y_score[:, 1], average='micro'))
```

    Confusion Matrix :
    [[49  5]
     [11 10]]

    Score : 0.7866666666666666
    ROC AUC macro : 0.7654320987654322
    ROC AUC micro : 0.8531555555555556
    ROC AUC [0]   : 0.7654320987654322
    ROC AUC [1]   : 0.7654320987654321


### Decision Tree

```python
dt_entropy = DecisionTreeClassifier(criterion='entropy', max_depth=3)
dt_entropy.fit(X_train, y_train)

print('Confusion Matrix :')
print(confusion_matrix(y_test, dt_entropy.predict(X_test)))

print('\nScore :', dt_entropy.score(X_test, y_test))

y_score = dt_entropy.predict_proba(X_test)
print('ROC AUC macro :', roc_auc_score(y_label, y_score))
print('ROC AUC micro :', roc_auc_score(y_label, y_score, average='micro'))
print('ROC AUC [0]   :', roc_auc_score(y_label[:, 0], y_score[:, 0]))
print('ROC AUC [1]   :', roc_auc_score(y_label[:, 1], y_score[:, 1], average='micro'))
```

    Confusion Matrix :
    [[47  7]
     [10 11]]

    Score : 0.7733333333333333
    ROC AUC macro : 0.7526455026455026
    ROC AUC micro : 0.7902222222222223
    ROC AUC [0]   : 0.7526455026455026
    ROC AUC [1]   : 0.7526455026455027

<br>

### Scikit-plot 이용

> [Scikit-plot](https://scikit-plot.readthedocs.io/en/stable/index.html)

```python
import scikitplot as skplt
```

```python
skplt.metrics.plot_roc(y_test, mlp.predict_proba(X_test), figsize=(7, 7), title_fontsize=15, text_fontsize=12)
```

<figure class="fixed-img">
  <img src="/assets/images/post/2020-08-17-ROC-ANN.png" alt="ROC - ANN" style="background-color: #888; min-width: 600px;">
</figure>

```python
skplt.metrics.plot_roc(y_test, dt_entropy.predict_proba(X_test), figsize=(7, 7), title_fontsize=15, text_fontsize=12)
```

<figure class="fixed-img">
  <img src="/assets/images/post/2020-08-17-ROC-Decision-Tree.png" alt="ROC - Decision Tree" style="background-color: #888; min-width: 600px;">
</figure>

<br>

### Matplotlib 이용

`scikitplot`를 쓰지 않고 `matplotlib`을 이용해 구현할 수도 있으나, `scikitplot`이 훨씬 편하다.


```python
import matplotlib.pyplot as plt
from sklearn.metrics import roc_curve, auc

scores = {}
scores['ANN'] = mlp.predict_proba(X_test)
scores['Tree'] = dt_entropy.predict_proba(X_test)

# Compute micro-average ROC curve and ROC area
fprs, tprs, roc_aucs = {}, {}, {}
for key, value in scores.items():
    fprs[key], tprs[key], _ = roc_curve(y_test, value[:, 1])
    roc_aucs[key] = auc(fprs[key], tprs[key])

colors = {'ANN': 'blue', 'Tree': 'green'}

# plot
LINE_WIDTH = 2
plt.figure(figsize=(7, 7))
for key, value in roc_aucs.items():
    plt.plot(fprs[key], tprs[key], color=colors[key], lw=LINE_WIDTH, label=f'{key} (area = {value:.2f})')
plt.plot([0, 1], [0, 1], color='salmon', lw=LINE_WIDTH, linestyle='--')
plt.xlim([0.0, 1.0])
plt.ylim([0.0, 1.0])
plt.xlabel('False Positive Rate')
plt.ylabel('True Positive Rate')
plt.title('ROC Curve')
plt.legend(loc="lower right")
plt.grid(True)
plt.show()
```

<figure class="fixed-img">
  <img src="/assets/images/post/2020-08-17-ROC-Matplotlib.png" alt="ROC -  Matplotlib" style="background-color: #888; min-width: 600px;">
</figure>

<br>


## 이익 도표 & 향상도 곡선

이익 도표 (Gain Chart)
: 등급에 따라 계산된 이익값을 누적으로 연결한 도표

<br>

향상도 곡선 (Lift Curve)
: 램던 모델과 비교하여 해당 모델의 성과가 얼마나 향상되었는지를 각 등급별로 파악하는 그래프

<br>

```python
y_probas = mlp.predict_proba(X_test)

fig, axs = plt.subplots(1, 2, figsize=(15, 5))
skplt.metrics.plot_cumulative_gain(y_test, y_probas, ax=axs[0])
skplt.metrics.plot_lift_curve(y_test, y_probas, ax=axs[1])
```

<figure class="fixed-img">
  <img src="/assets/images/post/2020-08-17-Lift-ANN.png" alt="Lift - ANN" style="background-color: #888; min-width: 600px;">
</figure>

```python
y_probas = dt_entropy.predict_proba(X_test)

fig, axs = plt.subplots(1, 2, figsize=(15, 5))
skplt.metrics.plot_cumulative_gain(y_test, y_probas, ax=axs[0])
skplt.metrics.plot_lift_curve(y_test, y_probas, ax=axs[1])
```

<figure class="fixed-img">
  <img src="/assets/images/post/2020-08-17-Lift-Decision-Tree.png" alt="Lift - Decision Tree" style="background-color: #888; min-width: 600px;">
</figure>
