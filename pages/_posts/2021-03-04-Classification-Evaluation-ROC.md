---
category: 'Data Analysis'
tags: ['Classification']
title: 분류모델 평가 - ROC (Receiver Operating Characteristic)
---

![ROC Graph](https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Roc-draft-xkcd-style.svg/1024px-Roc-draft-xkcd-style.svg.png){: style="width: 400px;"}

> 출처 : [wikipedia](https://en.wikipedia.org/wiki/Receiver_operating_characteristic#/media/File:Roc-draft-xkcd-style.svg)

ROC 그래프는 X 축이 false positive rate, Y 축이 true positive rate를 나타내는 그래프이다.

> True positive rate를 benefit, false positive rate를 costs라고 생각하면,
> ROC 그래프는 효용과 비용 사이의 상대적인 트레이드 오프 관계를 묘사하는 그래프이다.

<br>

## ROC 곡선에 사용되는 지표

<table style="text-align: center;">
  <tbody>
    <tr>
      <th colspan="2" rowspan="2"></th>
      <th colspan="2">Actual</th>
      <th rowspan="2">합계</th>
    </tr>
    <tr>
      <th>Positive</th>
        <th>Negative</th>
    </tr>
    <tr>
      <th rowspan="2">Predicted</th>
      <th>Positive</th>
      <td>TP</td>
      <td>FP</td>
      <td>P'</td>
    </tr>
    <tr>
      <th>Negative</th>
      <td>FN</td>
      <td>TN</td>
      <td>N'</td>
    </tr>
    <tr>
      <th colspan="2">합계</th>
      <td>P</td>
      <td>N</td>
      <td>P + N</td>
    </tr>
  </tbody>
</table>

<br>

`True Positive Rate` : Positives correctly classified / Total positives

$$\text{TP rate} = \frac{TP}{TP + FN}$$

<br>

`False Positive Rate` : Negatives incorrectly classified / Total negatives

$$\text{FP rate} = \frac{FP}{TN + FP}$$

<br>

`Sensitivity` (민감도) : `Positive`를 제대로 예측한 정도

$$\text{Sensitivity} = \frac{TP}{TP + FN}$$

<br>

`Specificity` (특이도) : `Negative`를 제대로 예측한 정도

$$\text{Specificity} = \frac{TN}{TN + FP}$$

> `False Positive Rate` = 1 - `Specificity`

<br>

## ROC graph

> ROC 그래프에 대한 자세한 설명은 다음 문서를 바탕으로 작성했다.
> <br>
> 참고 : [An introduction to ROC analysis](https://www.math.ucdavis.edu/~saito/data/roc/fawcett-roc.pdf)

<br>

### ROC space

분류 결과가 `positive` 또는 `negative`로 나온다면, 결과에 따른 false positive rate과 true positive rate 한 쌍이 계산되며 ROC 공간에 하나의 점으로 표시된다.

다음 그림은 다섯가지 분류모델을 보여주고 있다.

![A basic ROC graph](/assets/images/post/2021-03-04-A_basic_ROC_graph.png){: style="width: 400px;"}

True positive rate이 높고 false positive rate이 낮을 수록 좋은 모델이므로, `(0, 1)`은 완벽하게 분류한 경우를 나타내며 `(0, 1)`에 가까울수록 좋은 모델임을 알 수 있다. 또한 `(0, 0)`은 모두 `negative`로 분류한 경우를 나타내고 `(1, 1)`은 모두 `positive`로 분류한 경우를 나타낸다.

`D`는 `(0, 1)`에 위치하며 완벽한 분류 모델을 나타낸다.

<br>

ROC 곡선의 왼쪽에 아래에 있는 분류 모델은 강한 증거가 있어야만 `positive`로 분류하는 모델로 `positive`로 잘못 분류되는 `negative`가 적지만 `positive`를 제대로 분류하는 비율도 낮다. 따라서 false positive rate과 true positive rate 모두 낮다.

반대로 오른쪽 위에 있는 분류 모델은 약한 증거를 가지고 `positive`로 분류하는 모델로 `positive`를 잘 맞추지만 `positive`로 잘못 분류되는 `negative`도 많다. 따라서 false positive rate과 true positive rate 모두 높다.

> 각각 "conservative"하다고 하고, "liberal"하다고 한다.

`A`가 `B`보다 더 "conservative" 하다.

<br>

점선으로 표시된 `y = x` 직선은 랜덤하게 추측한 결과를 나타낸다.

> 랜덤하게 절반을 `positive`로 예측하고 절반을 `negative`로 예측하는 경우, 확률적으로 예측 결과 중 절반씩을 틀린다고 볼 수 있으므로 기대 값은 `(0.5, 0.5)`이다. 90%를 `positive`로 예측한 경우, 확률적으로 예측 결과 중 절반씩 틀린다고 볼 수 있다. 따라서  TP = 45, FP = 45, TN = 5, FN = 5이 되고 false positive rate과 true positive rate의 기대값 모두 `0.9`가 되어 `(0.9, 0.9)`로 표시된다. 같은 논리로 랜덤하게 예측하는 경우에는 false positive rate과 true positive rate가 같으므로 `y = x` 직선 위의 모든 점들이 랜덤하게 추측한 경우를 나타낸다.


`C`는 대략 (0.7, 0.7)에 위치하므로 랜덤하게 70%를 `positive`라고 예측하는 분류 모델을 나타낸다.

<br>

`y = x` 직선의 아래에 위치하는 분류모델은 랜덤하게 예측하는 것보다 나쁜 결과를 내고 있다. 따라서 일반적으로 여기는 비어있다.

> 만약 해당 분류모델의 결과를 반대로 하면, `y = x` 직선의 왼쪽 위의 점으로 나타내진다.

`E`는 랜덤 모델보다 성능이 좋지 않으며, `B`의 예측 결과와 반대되는 결과를 내고 있다.

<br>

> `y = x` 직선 위의 분류 모델은 분류 클래스에 대한 정보가 없다고 할 수 있고, `y = x` 직선의 오른쪽 아래에 위치하는 분류 모델은 유용한 정보가 있으나 잘못 적용하고 있다고 할 수 있다. (Flach and Wu, 2003).

<br>

### Curves in ROC space

> Forman은 어느 분류 모델의 성능이 랜덤 모델보다 조금 더 좋게 나타난 경우에, 분류 모델의 성능이 정말로 의미있는지 아니면 분류 모델이 우연히 랜덤 모델보다 좋게 결과가 나온건지를 ROC 곡선을 통해 판단할 수 있는 방법론을 제시했다.

<br>

분류의 결과로 어느 클래스에 속할 확률을 얻는 경우에는 특정 threshold(임계값)를 기준으로 `positive`인지 `negative`인지 판단할 수 있다. 각 threshold 값마다 ROC 공간상의 다른 점이 만들어지고, threshold를 -∞ 부터 ∞까지 변화시키면 ROC 공간에 그래프로 표현될 것이다.

> 결과과 threshold보다 높으면 `positive`, 아니면 `negative`로 판단한다.

> 여기서 말하는 확률은 확률의 표준 이론에 부합하는 확률일 수도 있고, 점수가 높을수록 확률이 높다는 속성만 있는 보정되지 않은 점수일 수도 있다. 후자의 경우 엄밀하게는 확률이 아니지만 여기에서는 편의상 모두 확률이라고 부르기로 한다.

<br>

다음 그림은 10개의 `positive`와 10개의 `negative`로 이루어진 테스트 셋에 대한 ROC 곡선이다.

> 왼쪽 표에서 테스트 셋의 정보와 예측 결과 확률을 확인할 수 있다. 각 샘플은 score를 기준으로 오름차순으로 정렬되어 있다.

![The ROC curve created by thresholding a test set](/assets/images/post/2021-03-04-The_ROC_curve_created_by_thresholding_a_test_set.png)

> 보통 ROC 곡선이라고 부르지만, 사실 유한개의 샘플로 구해지는 ROC 그래프는 계단 함수 형태이고 샘플의 개수가 무한대에 가까워 질수록 곡선에 가까워진다.

<br>

Threshold가 1인 경우에는 `positive`로 분류할 수 있는 샘플이 하나도 없으므로 분류 결과는 `(0, 0)`에 해당한다. 그 후 threshold를 천천히 줄여가면 threshod가 `0.9`가 될 때 처음으로 1번 샘플을 `Positive`로 분류하고 `(0, 0.1)` 결과를 얻을 수 있다. Threshold를 점점 줄여나가면 오른쪽 그래프를 따라 오른쪽 위로 올라가지며, threshold가 `0.1`이 되었을 때 `(1, 1)`에 도달하게 된다.

> Threshold가 낮아짐에 따라 "conservative"에서 "liberal"로 변한다.

> 이 분류모델은 threshold가 0.54일 때 (0.1, 0.5)에서 70%로 가장 높은 정확도를 보인다. 즉, "conservative"한 곳에서 더 좋은 성능을 보이며, 이는 `negative`보다 `positive`로 추정되는 샘플을 더 잘 구분한다고 할 수 있다.

<br>

많은 분류 모델은 이산형 모델로 각 테스트 샘플의 클래스 레이블만 예측하도록 설계되었지만, ROC 공간 상의 하나의 점이 아니라 이렇게 ROC 곡선 전체를 생성하기 위해서는 score를 만들어야 한다.

<br>

#### Relative VS. Absolute Scores

ROC 그래프는 분류 모델의 상대적인 score를 만드는 능력을 측정한다.

> 분류 모델은 보정된 정확한 확률이 아니어도, `positive`와 `negative`를 구분할 수 있는 상대적인 점수만 만들면 된다.

<br>

다음은 어느 분류 모델의 ROC 곡선과 분류 결과 이다.

![Scores and classifications of 10 instances, and the resulting ROC curve](/assets/images/post/2021-03-04-Scores_and_classifications_and_the_resulting_ROC_curve.png){: style="width: 600px;"}

오른쪽 결과를 보면 score를 바탕으로 threshold `0.5`를 기준으로 예측한 것을 알 수 있으며, `7`, `8`번 샘플의 예측을 틀렸으므로 정확도는 80%가 된다. 그런데 왼쪽의 ROC 그래프를 보면 `(0, 0)`부터 `(0, 1)`까지 수직으로 올라가고 `(1, 1)`까지 수직으로 되어 있다. 즉, 이 분류 모델은 해당 테스트 셋에서 완벽한 분류 성능을 낸다는 것을 의미한다.

왜 이런 불일치가 일어날까?

이는 무엇을 측정하는지를 통해 설명할 수 있다. ROC 곡선은 상대적으로 `negative`인지 `positive`인지 판단하여 순위를 매기는 능력을 보여준다. 위의 분류 모델의 경우, 실제로 `positive`인 샘플의 점수가 `negative`인 샘플들의 점수보다 상대적으로 높으므로 이 능력은 완벽하다. 반면에 정확도는 threshold를 0.5로 두고 만들어지는 분류 결과를 가지고 계산한다. 만약 점수가 적절한 확률이라면 이렇게 정확도를 측정하는 것이 적합하겠지만 위의 예는 그렇지 않은 것이다. 위의 점수가 실제 확률 처럼 적절하게 보정되지 않았다고 볼 수도 있다.

> ROC 공간에서 threshold를 0.5로 부과하면 위의 그림에서 동그라미 쳐진 "accuracy point" 결과를 내는데 이는 최적이 아니고, threshold를 0.6으로 두는 경우에도 여전히 정확도는 90% 밖에 되지 않으므로 최적이 아니다.

이를 해결하기 위해 분류 모델의 점수를 보정하는 방법도 있고, 상대적인 성능을 기반으로 threshold를 선택하는 방법도 있다.

서로 다른 분류 모델에 대해서 상대적으로 점수를 매긴 결과를 비교하면 안된다. 어느 모델은 [0, 1] 범위로 점수를 만들 수도 있고, 어느 모델은 [-1, 1] 또는 [1, 100] 범위로 점수를 만들 수도 있다. 따라서 공통된 threshold를 기준으로 모델의 성능을 비교하는 것은 의미가 없다.

<br>

#### Class Skew (클래스 불균형)

테스트 셋의 `positive`와 `negative`의 비율이 바뀌어도 ROC 곡선은 변하지 않는다. 즉, ROC 곡선은 클래스 분포의 변화에 민감하지 않다. 오분류표(confusion matrix)를 생각해 보면, 클래스의 분포는 왼쪽 열과 오른쪽  열의 관계를 보여준다. 따라서 두 열의 값을 사용하는 metric들인 정확도(accuracy), 정밀도(precision), 이익(lift), F-score 등은 본질적으로 클래스 불균형에 민감하다. 클래스 분류가 변하면 분류 모델의 근본적인 성능은 변하지 않더라도 이 측정값들은 변경된다. 하지만 ROC 그래프는 각 column의 비율인 `true positive rate`와 `false positive rate`를 기반으로 하기 때문에 클래스 분포에 의존하지 않는다.

<br>

다음 그림은 ROC 곡선과 precision-recall 곡선으로 클래스 불균형의 효과를 보여주고 있다.

> (a) ROC curves, 1:1 ㅤ (b) Precision-recall curves, 1:1
> <br>
> (c) ROC curves, 1:10ㅤ(d) Precision-recall curves, 1:10.

![ROC and precision-recall curves under class skew](/assets/images/post/2021-03-04-ROC_and_precision-recall_curves_under_class_skew.png){: style="width: 600px;"}

`(a)`와 `(b)`에서 테스트 셋은 1:1의 균형잡힌 클래스 분포를 가진다. `(c)`와 `(d)`는 같은 도메인에 있는 두 개의 분류기를 보여주고 있지만, `negative`인 샘플의 수가 10배 더 많다.

> 분류모델과 기본 개념은 변하지 않았고, 클래스의 분포만 다르다.

`(a)`와 `(c)`의 ROC 그래프는 같지만 `(b)`와 `(d)`의 precision-recall 그래프는 상당히 다른 것을 볼 수 있다. 따라서, 더 좋은 성능을 나타내는 분류 모델은 분포의 변화에 따라 달라질 수 있다.

<br>


## Scikit-learn, Scikit-plot 활용

- 데이터 : 유방암 데이터
- 모델 : 의사결정나무

```python
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier

breast_cancer = load_breast_cancer()
X_train, X_test, y_train, y_test = train_test_split(breast_cancer.data, breast_cancer.target, test_size=0.2)

clf = DecisionTreeClassifier(max_depth=4)
clf.fit(X_train, y_train)
```

<br>


```python
from sklearn.metrics import roc_auc_score, plot_roc_curve
from scikitplot.metrics import plot_roc
import matplotlib.pyplot as plt
```

### ROC AUC

```python
y_proba = clf.predict_proba(X_test)
y_proba
```

    array([[1.        , 0.        ],
           [0.00806452, 0.99193548],
           [0.00806452, 0.99193548],
           [1.        , 0.        ],
           [0.00806452, 0.99193548],
           .
           .
           .
           [0.        , 1.        ],
           [0.00806452, 0.99193548],
           [0.00806452, 0.99193548],
           [0.00806452, 0.99193548],
           [0.00806452, 0.99193548]])


```python
y_proba = clf.predict_proba(X_test)[:, 1]

roc_auc_score(y_test, y_proba)
```

    0.9802350427350428


<br>


### Scikit-learn 이용해서 시각화

```python
plot_roc_curve(clf, X_test, y_test)
plt.show()
```

![output](/assets/images/post/2021-03-04-output_9_0.png){: style="background-color: #888;"}

<br>

Reference line을 표시하고 싶으면 따로 그려주어야 한다.

```python
plot_roc_curve(clf, X_test, y_test)
plt.plot([0, 1], [0, 1], linestyle='--', lw=2, color='r', alpha=.8)
plt.show()
```

![output](/assets/images/post/2021-03-04-output_10_0.png){: style="background-color: #888;"}

<br>


### Scikit-plot 이용해서 시각화

Scikit-plot은 모든 `y_proba`들을 넣어주면 모든 클래스에 대한 곡선을 한 번에 다 그려주고 reference line까지 그려준다.

```python
y_proba = clf.predict_proba(X_test)

plot_roc(y_test, y_proba)
plt.show()
```

![output](/assets/images/post/2021-03-04-output_13_0.png){: style="background-color: #888;"}
