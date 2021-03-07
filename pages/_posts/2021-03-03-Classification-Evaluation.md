---
category: 'Data Analysis'
tags: ['Classification']
title: 분류모델 평가 - 오분류표 (Confusion Matrix)
---

<table style="text-align: center;">
  <tbody>
    <tr>
      <th colspan="2" rowspan="2"></th>
      <th colspan="2">Predicted</th>
      <th rowspan="2">합계</th>
    </tr>
    <tr>
      <th>Negative</th>
      <th>Positive</th>
    </tr>
    <tr>
      <th rowspan="2">Actual</th>
      <th>Negative</th>
      <td>TN</td>
      <td>FP</td>
      <td>N</td>
    </tr>
    <tr>
      <th>Positive</th>
      <td>FN</td>
      <td>TP</td>
      <td>P</td>
    </tr>
    <tr>
      <th colspan="2">합계</th>
      <td>N'</td>
      <td>P'</td>
      <td>P + N</td>
    </tr>
  </tbody>
</table>

> Scikit-learn의 Confusion Matrix 구조에 맞췄다.

- TN (True Negative) : 실제값과 예측치 모두 `Negative`인 빈도
- FP (False Positive) : 실제값은 `Negative`인데 `Positive`로 예측한 빈도
- TP (True Positive) : 실제값과 예측치 모두 `Positive`인 빈도
- FN (False Negative) : 실제값은 `Positive`인데 `Negative`로 예측한 빈도

<br>


## Confusion Matrix를 이용한 Metrics

`Accuracy` (정분류율, Recognition Rate) : 제대로 예측한 정도

$$Accuracy = \frac{TP + TN}{TP + FN + TN + FP}$$

<br>

`Precison` (정확도) : `Positive` 예측의 정확도

$$Precison = \frac{TP}{TP + FP}$$

<br>

`Recall` (재현율) : `Positive`를 제대로 예측한 정도

$$Recall = \frac{TP}{TP + FN}$$

<br>

`F1 score` & `F-β score` : 정확도와 재현율을 보정해 하나의 지표로 나타낸 것

$$F_1 = 2 \cdot \frac{Precision \times Recall}{Precision + Recall}$$

$$F_\beta = \frac{(1 + \beta^2) \cdot Precision \times Recall}{ \beta^2 \cdot Precision + Recall}$$

> β 만큼 재현율에 가중치, 1/β 만큼 정확도에 가중치


<br>


## Scikit-learn 활용

- 데이터 : 유방암 데이터
- 모델 : 의사결정나무


```python
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier

breast_cancer = load_breast_cancer()
X_train, X_test, y_train, y_test = train_test_split(breast_cancer.data, breast_cancer.target, test_size=0.2)

clf = DecisionTreeClassifier()
clf.fit(X_train, y_train)
```

<br>

### Confusion Matrix


```python
from sklearn.metrics import confusion_matrix, plot_confusion_matrix
import matplotlib.pyplot as plt
```


```python
print(confusion_matrix(y_test, clf.predict(X_test)))
```

    [[47  3]
     [ 6 58]]


<br>

Scikit-learn은 confusion matrix를 heat map으로 시각화하는 함수도 제공한다.

```python
plot_confusion_matrix(clf, X_test, y_test, cmap=plt.cm.Blues)
plt.show()
```

![output](/assets/images/post/2021-03-03-output_9_0.png){: style="background-color: #888;"}

<br>

`normalize` 변수를 사용하면 비율로 표현할 수 있다.

- `normalize='true'` : 실제 값이 같은 그룹에서의 비율
- `normalize='pred'` : 예측 결과가 같은 그룹에서의 비율
- `normalize='all'` : 전체 샘플 중에서의 비율

```python
options = ['true', 'pred', 'all']

fig, axes = plt.subplots(nrows=1, ncols=3, figsize=(15, 5))

for ax, option in zip(axes, options):
    plot_confusion_matrix(clf, X_test, y_test, cmap=plt.cm.Blues, normalize=option, ax=ax)
    ax.set_title(f'Nomalize = {option}')
plt.show()
```

![output](/assets/images/post/2021-03-03-output_10_0.png){: style="background-color: #888;"}

<br>

### Metrics


```python
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, fbeta_score
```


```python
y_pred = clf.predict(X_test)

print('Accuracy  :', accuracy_score(y_test, y_pred))
print('Precision :', precision_score(y_test, y_pred))
print('Recall    :', recall_score(y_test, y_pred))
```

    Accuracy  : 0.9210526315789473
    Precision : 0.9508196721311475
    Recall    : 0.90625



```python
print('F-1 Score   :', f1_score(y_test, y_pred))
print('F-2 Score   :', fbeta_score(y_test, y_pred, beta=2))
print('F-1/2 Score :', fbeta_score(y_test, y_pred, beta=1/2))
```

    F-1 Score   : 0.9279999999999999
    F-2 Score   : 0.9148264984227129
    F-1/2 Score : 0.9415584415584415

<br>

직접 계산한 값과 비교하면 동일한 것을 확인할 수 있다.

```python
precision = precision_score(y_test, y_pred)
recall = recall_score(y_test, y_pred)

f1 = 2 * precision * recall / (precision + recall)
f2 = (1 + 2 ** 2) * precision * recall / ((2 ** 2) * precision + recall)
f1_2 = (1 + 0.5 ** 2) * precision * recall / ((0.5 ** 2) * precision + recall)

print('F-1 Score   :', f1)
print('F-2 Score   :', f2)
print('F-1/2 Score :', f1_2)
```

    F-1 Score   : 0.9279999999999999
    F-2 Score   : 0.9148264984227129
    F-1/2 Score : 0.9415584415584415
