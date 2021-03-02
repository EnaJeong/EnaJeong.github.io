---
category: 'Data Analysis'
title: 불균형 데이터 처리 기법 - Resampling
---

불균형 데이터를 처리하는 방법으로는 균형을 맞춰서 샘플링을 하는 방법과 가중치를 부여하는 방법이 있다.

1. 샘플링
<br>
1) Oversampling
<br>
2) Undersampling
<br>
3) Hybrid Sampling
2. 가중치 부여

<br>

이 중 샘플링 기법에 대해 정리해 보았다.

```python
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.datasets import make_classification
from sklearn.linear_model import LogisticRegression
```

<br>

### 테스트용 데이터 생성


```python
X, y = make_classification(n_samples=100, n_features=2, n_redundant=0,
                           n_classes=2, n_clusters_per_class=1, weights=[0.1, 0.9], random_state=591)

plt.figure(figsize=(8, 5))
plt.scatter(X[:, 0], X[:, 1], c=y, s=100, alpha=0.5)
plt.show()
```



![output ](/assets/images/post/2021-03-01-output_3_0.png){: style="background-color: #888;"}




```python
clf = LogisticRegression()
clf.fit(X, y)


plot_step = 0.02
x_min, x_max = X[:, 0].min() - 1, X[:, 0].max() + 1
y_min, y_max = X[:, 1].min() - 1, X[:, 1].max() + 1
xx, yy = np.meshgrid(np.arange(x_min, x_max, plot_step), np.arange(y_min, y_max, plot_step))

Z = clf.predict(np.c_[xx.ravel(), yy.ravel()])
Z = Z.reshape(xx.shape)

plt.contourf(xx, yy, Z, alpha=0.4)
plt.scatter(X[:, 0], X[:, 1], c=y, alpha=0.8)
```




    <matplotlib.collections.PathCollection at 0x1adf7c89a88>





![output ](/assets/images/post/2021-03-01-output_4_1.png){: style="background-color: #888;"}



<br>

### 그래프 함수


```python
def plot_samples(X, y, ax, title):
    ax.scatter(X[:, 0], X[:, 1], c=y, alpha=0.5)
    if title is not None:
        ax.set_title(title)
    sns.despine(ax=ax, offset=10)
```


```python
def plot_decision_function(X, y, clf, ax, title=None):
    plot_step = 0.02
    x_min, x_max = X[:, 0].min() - 1, X[:, 0].max() + 1
    y_min, y_max = X[:, 1].min() - 1, X[:, 1].max() + 1
    xx, yy = np.meshgrid(np.arange(x_min, x_max, plot_step), np.arange(y_min, y_max, plot_step))

    Z = clf.predict(np.c_[xx.ravel(), yy.ravel()])
    Z = Z.reshape(xx.shape)
    ax.contourf(xx, yy, Z, alpha=0.4)
    ax.scatter(X[:, 0], X[:, 1], alpha=0.8, c=y, edgecolor="k")

    if title is not None:
        ax.set_title(title)
```

<br>

## Over-sampling

`Random Over-sampling` : 소수 클래스의 원 데이터를 중복 생성

`SMOTE` : Interpolation을 통해 새로운 데이터를 생성 (아래 이미지 참고)

`ADASYN` : `SMOTE`와 같이 interpolation을 통해 생성하나, 원 데이터 중 k-NN으로 잘못 분류되는 데이터들을 중점적으로 생성

<br>

![SMOTE](https://imbalanced-learn.org/stable/_images/sphx_glr_plot_illustration_generation_sample_001.png){: style="width: 400px;"}

> 출처 : https://imbalanced-learn.org/stable/auto_examples/over-sampling/plot_illustration_generation_sample.html

<br>

`imbalanced-learn`에서 제공하는 함수는 다음과 같다.

| Method | Description |
|:-----------------:|:--------------------------------------------------------------------------------|
| RandomOverSampler | Random over-sampling
| SMOTE             | Over-sample using SMOTE.                                                        |
| SMOTENC           | Over-sample using SMOTE for continuous and categorical features.                |
| SMOTEN            | Over-sample using the SMOTE variant specifically for categorical features only. |
| ADASYN            | Over-sample using ADASYN.                                                       |
| BorderlineSMOTE   | Over-sample using Borderline-SMOTE.                                             |
| KMeansSMOTE       | Over-sample applying a clustering before to oversample using SMOTE.             |
| SVMSMOTE          | Over-sampling using SVM-SMOTE.                                                  |

<br>


```python
from imblearn.over_sampling import *
```

### Random Oversampling VS. SMOTE VS. ADASYN


```python
X_samples = {'Raw': X}
y_samples = {'Raw': y}

samplers = {'Random': RandomOverSampler(),
            'SMOTE': SMOTE(),
            'ADASYN': ADASYN()}

for name, sampler in samplers.items():
    X_samples[name], y_samples[name] = sampler.fit_resample(X, y)
```


```python
fig, axs = plt.subplots(nrows=2, ncols=2, figsize=(10, 10))

for ax, key in zip(axs.ravel(), X_samples.keys()):
    plot_samples(X_samples[key], y_samples[key], ax, title=key)
fig.tight_layout()
```



![output ](/assets/images/post/2021-03-01-output_20_0.png){: style="background-color: #888;"}




```python
fig, axs = plt.subplots(nrows=2, ncols=2, figsize=(10, 10))

clf = LogisticRegression()

for ax, key in zip(axs.ravel(), X_samples.keys()):
    clf.fit(X_samples[key], y_samples[key])
    plot_decision_function(X_samples[key], y_samples[key], clf, ax, title=key)
fig.tight_layout()
```



![output ](/assets/images/post/2021-03-01-output_21_0.png){: style="background-color: #888;"}



<br>

### Random Over-sampling

- `shrinkage` : Parameter controlling the shrinkage applied to the covariance matrix.

> smoothed bootstrap 생성을 위해 사용


```python
shrinkages = [0, 1, 3, 5]

fig, axs = plt.subplots(nrows=2, ncols=2, figsize=(10, 10))

for ax, shrinkage in zip(axs.ravel(), shrinkages):
    sampler = RandomOverSampler(shrinkage=shrinkage)
    X_sample, y_sample = sampler.fit_resample(X, y)
    plot_samples(X_sample, y_sample, ax, title=shrinkage)

fig.suptitle('Random Over-sampling')
fig.tight_layout()
```



![output ](/assets/images/post/2021-03-01-output_25_0.png){: style="background-color: #888;"}



<br>

### SMOTE

`BorderlineSMOTE` : Borderline 버전 (두 클래스의 경계에 위치한 데이터들을 오버 샘플링)

`SVMSMOTE` : SVM 버전 (Borderline을 파악할 때 support vector 사용)

`KMeansSMOTE` : KMeans 버전 (데이터를 생성하기 전에 군집을 생성한 후, 소수 데이터가 많은 군집의 데이터만 오버 샘플링)

> [Borderline-SMOTE](https://sci2s.ugr.es/keel/keel-dataset/pdfs/2005-Han-LNCS.pdf)
>
> [Oversampling for Imbalanced Learning
Based on K-Means and SMOTE](https://arxiv.org/pdf/1711.00837.pdf)


```python
X_samples = {'Raw': X}
y_samples = {'Raw': y}

samplers = {'SMOTE': SMOTE(),
            'ADASYN': ADASYN(),
            'Borderline SMOTE': BorderlineSMOTE(),
            'SVM SMOTE': SVMSMOTE(),
            'K-Means SMOTE': KMeansSMOTE()}

for name, sampler in samplers.items():
    X_samples[name], y_samples[name] = sampler.fit_resample(X, y)
```

    C:\Users\gekri\Anaconda3\envs\AI_dev_env\lib\site-packages\sklearn\cluster\_kmeans.py:888: UserWarning: MiniBatchKMeans is known to have a memory leak on Windows with MKL, when there are less chunks than available threads. You can prevent it by setting batch_size >= 2048 or by setting the environment variable OMP_NUM_THREADS=1
      f"MiniBatchKMeans is known to have a memory leak on "



```python
fig, axs = plt.subplots(nrows=2, ncols=3, figsize=(15, 10))

for ax, key in zip(axs.ravel(), X_samples.keys()):
    plot_samples(X_samples[key], y_samples[key], ax, title=key)
fig.tight_layout()
```



![output ](/assets/images/post/2021-03-01-output_30_0.png){: style="background-color: #888;"}



<br>

## Under-sampling

| Method | Description |
|:-------------------------------:|:---------------------------------------------------------------------|
| RandomUnderSampler              | Class to perform random under-sampling.                              |
| NearMiss                        | Class to perform under-sampling based on NearMiss methods.           |
| TomekLinks                      | Under-sampling by removing Tomek’s links.                            |
| EditedNearestNeighbours         | Undersample based on the edited nearest neighbour method.            |
| RepeatedEditedNearestNeighbours | Undersample based on the repeated edited nearest neighbour method.   |
| AllKNN                          | Undersample based on the AllKNN method.                              |
| CondensedNearestNeighbour       | Undersample based on the condensed nearest neighbour method.         |
| OneSidedSelection               | Class to perform under-sampling based on one-sided selection method. |
| NeighbourhoodCleaningRule       | Undersample based on the neighbourhood cleaning rule.                |
| InstanceHardnessThreshold       | Undersample based on the instance hardness threshold.                |
| ClusterCentroids                | Undersample by generating centroids based on clustering methods.     |


<br>


```python
from imblearn.under_sampling import *
```

### Random Under-sampling VS. Tomek Links VS. ENN

> 하이브리드에서 Tomek Links와 ENN을 사용하기 때문에 비교 대상으로 삼았다.


```python
X_samples = {'Raw': X}
y_samples = {'Raw': y}

samplers = {'Random': RandomUnderSampler(),
            'Tomek': TomekLinks(),
            'ENN': EditedNearestNeighbours()}

for name, sampler in samplers.items():
    X_samples[name], y_samples[name] = sampler.fit_resample(X, y)
```


```python
fig, axs = plt.subplots(nrows=2, ncols=2, figsize=(10, 10))

for ax, key in zip(axs.ravel(), X_samples.keys()):
    plot_samples(X_samples[key], y_samples[key], ax, title=key)
fig.tight_layout()
```



![output ](/assets/images/post/2021-03-01-output_39_0.png){: style="background-color: #888;"}




```python
fig, axs = plt.subplots(nrows=2, ncols=2, figsize=(10, 10))

clf = LogisticRegression()

for ax, key in zip(axs.ravel(), X_samples.keys()):
    clf.fit(X_samples[key], y_samples[key])
    plot_decision_function(X_samples[key], y_samples[key], clf, ax, title=key)
fig.tight_layout()
```



![output ](/assets/images/post/2021-03-01-output_40_0.png){: style="background-color: #888;"}



<br>

### Cluster Centroids

다른 알고리즘들과 달리 `ClusterCentroids`는 원 데이터에서 선택하는 것이 아니라 K-means를 통해 데이터를 생성한다. (K-means의 중심)


```python
fig, axs = plt.subplots(nrows=1, ncols=2, figsize=(10, 5))

X_samples = {'Raw': X}
y_samples = {'Raw': y}

X_samples['Cluster Centroids'], y_samples['Cluster Centroids'] = ClusterCentroids().fit_resample(X, y)

for ax, key in zip(axs.ravel(), X_samples.keys()):
    plot_samples(X_samples[key], y_samples[key], ax, title=key)
fig.tight_layout()
```



![output ](/assets/images/post/2021-03-01-output_44_0.png){: style="background-color: #888;"}



<br>

### NearMiss

- NearMiss-1 : 다수 클래스의 데이터 중 소수 클래스의 k nearest 데이터와의 평균 거리가 짧은 데이터 제거
- NearMiss-2 : 다수 클래스의 데이터 중 소수 클래스의 가장 먼 데이터와의 평균 거리가 짧은 데이터 제거
- NearMiss-3 : 다수 클래스의 데이터의 m nearest 이웃 ->  k nearest 데이터와의 평균 거리가 긴 데이터 선택

![NearMiss](/assets/images/post/2021-03-01-Near-Miss.png)

> 출처 : https://imbalanced-learn.org/stable/auto_examples/under-sampling/plot_illustration_nearmiss.html

```python
fig, axs = plt.subplots(nrows=2, ncols=2, figsize=(10, 10))

X_samples = {'Raw': X}
y_samples = {'Raw': y}

samplers = {'NearMiss-1': NearMiss(),
            'NearMiss-2': NearMiss(version=2),
            'NearMiss-3': NearMiss(n_neighbors_ver3=5)}

for name, sampler in samplers.items():
    X_samples[name], y_samples[name] = sampler.fit_resample(X, y)

for ax, key in zip(axs.ravel(), X_samples.keys()):
    plot_samples(X_samples[key], y_samples[key], ax, title=key)
fig.tight_layout()
```



![output ](/assets/images/post/2021-03-01-output_49_0.png){: style="background-color: #888;"}



<br>

### Tomek Link

Tomek link는 서로 가장 가까운 이웃이면서 클래스가 다른 데이터 쌍을 의미한다. 이러한 Tomek link를 제거하는 방식이다.

![Tomek Link](https://imbalanced-learn.org/stable/_images/sphx_glr_plot_illustration_tomek_links_001.png){: style="width: 400px;"}

이 때, 기본 설정에서는 다수 클래스에 속하는 데이터만 제거하고, `sampling_strategy='all'`로 설정하면 둘 다 제거한다.

> Hybrid 모델에서 'all' 사용

![Comparison between 'auto' and 'all'](https://imbalanced-learn.org/stable/_images/sphx_glr_plot_illustration_tomek_links_002.png)


> 출처 : https://imbalanced-learn.org/stable/auto_examples/under-sampling/plot_illustration_tomek_links.html


```python
fig, axs = plt.subplots(nrows=1, ncols=3, figsize=(15, 5))

X_samples = {'Raw': X}
y_samples = {'Raw': y}

samplers = {'Tomek - auto': TomekLinks(),
            'Tomek - all': TomekLinks(sampling_strategy='all')}

for name, sampler in samplers.items():
    X_samples[name], y_samples[name] = sampler.fit_resample(X, y)

for ax, key in zip(axs.ravel(), X_samples.keys()):
    plot_samples(X_samples[key], y_samples[key], ax, title=key)
fig.tight_layout()
```



![output ](/assets/images/post/2021-03-01-output_53_0.png){: style="background-color: #888;"}



<br>

###  Edited Data Set Using Nearest Neighbours

`Edited Nearest Neighbours (ENN)` : k-NN을 적용하고 기준(이웃들이 충분히 같은 클래스인지)을 충족하지 않는 데이터 제거

`Repeated Edited Nearest Neighbours (RENN)` : `ENN` 반복

`All k-NN (ANN)` : 반복 과정에서 k-NN의 이웃 수가 증가



```python
fig, axs = plt.subplots(nrows=1, ncols=3, figsize=(15, 5))

X_samples = {'Raw': X}
y_samples = {'Raw': y}

samplers = {'ENN - auto': EditedNearestNeighbours(),
            'ENN - all': EditedNearestNeighbours(sampling_strategy='all')}

for name, sampler in samplers.items():
    X_samples[name], y_samples[name] = sampler.fit_resample(X, y)

for ax, key in zip(axs.ravel(), X_samples.keys()):
    plot_samples(X_samples[key], y_samples[key], ax, title=key)
fig.tight_layout()
```



![output ](/assets/images/post/2021-03-01-output_57_0.png){: style="background-color: #888;"}




```python
fig, axs = plt.subplots(nrows=2, ncols=2, figsize=(10, 10))

X_samples = {'Raw': X}
y_samples = {'Raw': y}

samplers = {'ENN': EditedNearestNeighbours(),
            'Repeated ENN': RepeatedEditedNearestNeighbours(),
            'All KNN': AllKNN()}

for name, sampler in samplers.items():
    X_samples[name], y_samples[name] = sampler.fit_resample(X, y)

for ax, key in zip(axs.ravel(), X_samples.keys()):
    plot_samples(X_samples[key], y_samples[key], ax, title=key)
fig.tight_layout()
```



![output ](/assets/images/post/2021-03-01-output_58_0.png){: style="background-color: #888;"}



<br>

### Condensed Nearest Neighbors

`Condensed Nearest Neighbour (CNN)` : 1-NN을 반복적으로 적용

`One Sided Selection (OSS)` : 1-NN을 적용하고 `TomekLinks`을 사용해 잡음 제거

`Neighbourhood Cleaning Rule (NCR)` : 1-NN을 적용하고 `EditedNearestNeighbours`을 사용해 잡음 제거

<br>


> **Condensed Nearest Neighbour (CNN)**
>
> `sampling_strategy='auto'`에서 수행하는 과정을 정리하면 다음과 같다.
>
> 1. 모든 소수 클래스의 데이터를 `STORE`에 넣는다.
> 2. 다수 클래스의 데이터를 하나 `STORE`에 추가한다.
> 3. 나머지 다수 클래스의 데이터들을 하나씩 `STORE`에 있는 데이터들과 1-NN을 적용해서, 분류가 잘못되면 `STORE`에 추가하고 분류가 잘 되면 `GRABBAG`에 추가한다.
> 4. `GRABBAG`에서 더 이상 옮길 데이터가 없을 때까지 3번을 반복한다. (`GRABBAG`에 데이터가 없거나 3번 과정을 수행하는 동안 이동하는 데이터가 없는 상태)
> 5. `GRABBAG`에 있는 데이터는 제거하고 `STORE`에 있는 데이터들만 남긴다.
>
> [The Condensed Nearest Neighbor Rule](https://ieeexplore.ieee.org/document/1056066)

> **One-Sided Selection (OSS)**
>
> 1. Let S be the original training set.
> 2. Initially, C contains all positive examples from S and one randomly selected negative example.
> 3. Classify S with the 1-NN rule using the examples in C, and compare the assigned concept labels with the original ones. Move all misclassified examples into C that is now consistent with S while being smaller.
> 4. Remove from C all negative examples participating in Tomek links. This removes those negative examples that are believed borderline and/or noisy. All positive examples are retained. The resulting set is referred to as T.
>
> 출처 : [Addressing the Curse of Imbalanced Training Sets: One-Sided Selection](https://sci2s.ugr.es/keel/pdf/algorithm/congreso/kubat97addressing.pdf)


```python
fig, axs = plt.subplots(nrows=2, ncols=2, figsize=(10, 10))

X_samples = {'Raw': X}
y_samples = {'Raw': y}

samplers = {'Condensed Nearest Neighbour': CondensedNearestNeighbour(),
            'One Sided Selection': OneSidedSelection(),
            'Neighbourhood Cleaning Rule': NeighbourhoodCleaningRule()}

for name, sampler in samplers.items():
    X_samples[name], y_samples[name] = sampler.fit_resample(X, y)

for ax, key in zip(axs.ravel(), X_samples.keys()):
    plot_samples(X_samples[key], y_samples[key], ax, title=key)
fig.tight_layout()
```



![output ](/assets/images/post/2021-03-01-output_64_0.png){: style="background-color: #888;"}



<br>

### Instance Hardness Threshold

분류기의 예측 결과 확률이 낮은 데이터 제거


```python
fig, axs = plt.subplots(nrows=1, ncols=3, figsize=(15, 5))

X_samples = {'Raw': X}
y_samples = {'Raw': y}

samplers = {'Random Forest': InstanceHardnessThreshold(),  # default
            'Logistic Regression': InstanceHardnessThreshold(estimator=LogisticRegression())}

for name, sampler in samplers.items():
    X_samples[name], y_samples[name] = sampler.fit_resample(X, y)

for ax, key in zip(axs.ravel(), X_samples.keys()):
    plot_samples(X_samples[key], y_samples[key], ax, title=key)
fig.tight_layout()
```



![output ](/assets/images/post/2021-03-01-output_68_0.png){: style="background-color: #888;"}



<br>

## Hybrid Sampling

> `SMOTE`를 통해 생성된 잡음이 낀 샘플을 undersampling을 거쳐 잡음을 제거

| Method | Description |
|:----------:|:----------------------------------------------------------|
| SMOTEENN   | Over-sampling using SMOTE and cleaning using ENN.         |
| SMOTETomek | Over-sampling using SMOTE and cleaning using Tomek links. |

<br>


```python
from imblearn.combine import *
```


```python
RANDOM_STATE = 0

X_samples = {'Raw': X}
y_samples = {'Raw': y}

X_samples['SMOTE'], y_samples['SMOTE'] = SMOTE(random_state=RANDOM_STATE).fit_resample(X, y)
X_samples['SMOTE + Tomek'], y_samples['SMOTE + Tomek'] = SMOTETomek(random_state=RANDOM_STATE).fit_resample(X, y)
X_samples['SMOTE + ENN'], y_samples['SMOTE + ENN'] = SMOTEENN(random_state=RANDOM_STATE).fit_resample(X, y)
```


```python
fig, axs = plt.subplots(nrows=2, ncols=2, figsize=(10, 10))

for ax, key in zip(axs.ravel(), X_samples.keys()):
    plot_samples(X_samples[key], y_samples[key], ax, title=key)
fig.tight_layout()
```



![output ](/assets/images/post/2021-03-01-output_76_0.png){: style="background-color: #888;"}



<br>

### SMOTE 적용 후 Tomek Link 또는 ENN을 적용한 결과와 비교


```python
RANDOM_STATE = 0

X_samples = {}
y_samples = {}

X_samples['SMOTE + Tomek'], y_samples['SMOTE + Tomek'] = SMOTETomek(random_state=RANDOM_STATE).fit_resample(X, y)
X_samples['SMOTE + ENN'], y_samples['SMOTE + ENN'] = SMOTEENN(random_state=RANDOM_STATE).fit_resample(X, y)

X_sample, y_sample = SMOTE(random_state=RANDOM_STATE).fit_resample(X, y)
X_samples['SMOTE -> Tomek'], y_samples['SMOTE -> Tomek'] = TomekLinks(sampling_strategy='all').fit_resample(X_sample, y_sample)
X_samples['SMOTE -> ENN'], y_samples['SMOTE -> ENN'] = EditedNearestNeighbours(sampling_strategy='all').fit_resample(X_sample, y_sample)

fig, axs = plt.subplots(nrows=2, ncols=2, figsize=(10, 10))

for ax, key in zip(axs.ravel(), X_samples.keys()):
    plot_samples(X_samples[key], y_samples[key], ax, title=key)
fig.tight_layout()
```



![output ](/assets/images/post/2021-03-01-output_79_0.png){: style="background-color: #888;"}



> 결과가 같은 것을 확인할 수 있다.
