---
category: 'Ubuntu App'
tags: ['Khaiii']
title: Ubuntu 앱에 Khaiii 설치
---

[Khaiii](https://github.com/kakao/khaiii) : "Kakao Hangul Analyzer III" 카카오에서 개발한 세 번째 형태소분석기

>  khaiii의 경우 현재 [Ubuntu 20.04에서는 빌드가 되지 않는 이슈](https://github.com/kakao/khaiii/issues/96)가 있다고 한다.

<br>

## Khaiii git cloning

```
git clone https://github.com/kakao/khaiii.git
```

<br>

> 만약에 git이 없다면 git을 먼저 설치해야 한다.
>
> ```
> sudo apt-get install git
> ```
> [github - install git on linux](https://github.com/git-guides/install-git#install-git-on-linux)

<br>


## Khaiii 빌드 및 설치

```
cd khaiii
```

khaiii 폴더로 이동한 후, [Khaiii - 빌드 및 설치](https://github.com/kakao/khaiii/wiki/%EB%B9%8C%EB%93%9C-%EB%B0%8F-%EC%84%A4%EC%B9%98)를 따라하면 된다.

> 매우 잘 정리되어 있어서 같은 걸 적는 건 의미가 없는 것 같다.

<br>


## 이슈사항

1) <u>라지 모델로 리소스 빌드 후 `ctest` 테스트 실패</u>

`Khaiii`에서 실행프로그램과 리소스 빌드를 마치고 잘 실행되는지 테스트하기 위해 직접 실행해 보는 방법과 테스트 프로그램을 실행해보는 방법 두 가지를 안내하고 있다. `base 모델`의 경우 두 개 모두 정상적으로 확인이 가능하나, `large 모델`의 경우 직접 실행해보니 잘 동작했는데 `ctest` 결과는 Failed였다.

원인은 정확히는 모르겠으나 테스트가 `base 모델`용인 것 같다.

형태소 분석을 해보면 `large 모델`로 분석이 잘 된다.

<br>

2) <u>Python 바인딩할때, base 모델로 생성</u>

`package_python`를 생성하고 해당 폴더 안의 `setup.py` 파일을 열어보면 다음과 같이 설정되어 있다.

```python
subprocess.check_call('make all resource', cwd=build_dir, shell=True)
```

이는 `base 모델`의 리소스를 만드는 것으로 `large 모델`을 사용하고 싶은 경우에는 `make all large_resource`로 수정하고 실행하면 된다.

```python
subprocess.check_call('make all large_resource', cwd=build_dir, shell=True)
```

> 참고: [Issue - python package에서 large_resource 사용](https://github.com/kakao/khaiii/issues/69)

<br>

`KhaiiiApi` 객체를 생성할 때 `rsc_dir` 인자로 리소스 디렉토리를 지정할 수 있기 때문에 두 모델 모두 사용이 가능하지만, 경로를 지정하는 건 번거로울 수 있으니 더 자주 사용할 모델로 생성하면 될 것 같다.

```python
KhaiiiApi(rsc_dir='리소스 경로')
```

<br>


## 기타

- [Khaiii - Method](https://github.com/kakao/khaiii/issues/34)
- [Khaiii - 코퍼스](https://github.com/kakao/khaiii/wiki/%EC%BD%94%ED%8D%BC%EC%8A%A4)
- [Khaiii - 기분석 사전](https://github.com/kakao/khaiii/wiki/%EA%B8%B0%EB%B6%84%EC%84%9D-%EC%82%AC%EC%A0%84)
- [Khaiii - 오분석 패치](https://github.com/kakao/khaiii/wiki/%EC%98%A4%EB%B6%84%EC%84%9D-%ED%8C%A8%EC%B9%98)
- [Khaiii - 사용자 사전 자동 추출](https://github.com/kakao/khaiii/wiki/%EC%82%AC%EC%9A%A9%EC%9E%90-%EC%82%AC%EC%A0%84-%EC%9E%90%EB%8F%99-%EC%B6%94%EC%B6%9C)
