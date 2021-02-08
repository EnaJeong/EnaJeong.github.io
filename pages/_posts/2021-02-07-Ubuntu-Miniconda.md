---
category: 'Ubuntu App'
tags: ['Miniconda']
title: Ubuntu 앱에 Miniconda 설치 및 세팅
---

처음에는 pip만을 이용해서 설치해보았는데, 아무래도 가상환경을 만들어주는 것이 좋을 것 같았다. 그래서 anaconda를 설치하려다가 서브로 사용할 예정이기 때문에 모든 패키지가 포함되어 있을 필요가 없으므로 `Miniconda`를 설치해 보기로 했다.

> 참고: [Conda - install](https://docs.conda.io/projects/conda/en/latest/user-guide/install/linux.html)

<br>

## Miniconda 설치파일 다운로드

우선 다운로드받을 폴더로 이동한다.

[Miniconda - installer](https://docs.conda.io/en/latest/miniconda.html#linux-installers)에서 최신 버전을 다운로드한다.

```
curl -O https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh
```

> `curl`
>
> - -O : 파일명 그대로 저장
> - -o : 파일명을 지정해 저장

<br>

다음 명령어를 사용해 hash 값을 계산하고 맞는지 확인한다.

```
sha256sum Miniconda3-latest-Linux-x86_64.sh
```

<br>


## Miniconda 설치

```
bash Miniconda3-latest-Linux-x86_64.sh
```

이 명령어를 날리면 문서가 보여진다 열심히 `enter`를 눌러 끝까지 읽으면 다음과 같은 질문이 뜰 것이다.

```
Do you accept the license terms? [yes|no]
```

`yes`를 입력하면, `Miniconda3`을 설치할 경로를 설정할 수 있다.

`enter`를 입력해 기본 폴더로 진행하거나, 경로를 따로 입력하면 설치가 시작된다.

마지막으로 다음과 같은 질문을 하는데 `no`를 입력하면 조금 번거로울 것 같아서 `yes`를 입력했다.

```
Do you wish the installer to initialize Miniconda3 by running conda init?
```
> If you enter “no”, then conda will not modify your shell scripts at all. In order to initialize after the installation process is done, first run source <path to conda>/bin/activate and then run conda init.
>
> See [FAQ](https://docs.anaconda.com/anaconda/user-guide/faq/#distribution-faq-linux-path).

설치가 완료되면 Ubuntu 앱을 종료했다가 재시작해준다.

<br>

잘 설치되었는지 확인하기 위해 다음 명령어를 입력하면, 설치된 패키지 목록을 확인할 수 있다.

```
conda list
```

<br>

> **기타 명령어**
>
> Updating Miniconda
>
> ```
> conda update conda
> ```
>
> <br>
>
> Uninstalling Miniconda
>
> ```
> rm -rf ~/miniconda
> ```
>
> - `~/.bash_profile` : to remove the Miniconda directory from your PATH environment variable.
> - `~/.condarc ~/.conda ~/.continuum`: to remove hidden file and folders

<br>


## 환경 생성 및 활성화

`conda create -n (환경이름) python=(버전)` : 특정 python 버전의 환경을 생성

예시)

```
conda create -n new_env python=3.7
```

<br>

`conda activate (환경이름)` : 해당 환경 활성화

예시)

```
conda activate new_env
```

<br>

> 참고: [Conda - Managing Environments](https://conda.io/projects/conda/en/latest/user-guide/tasks/manage-environments.html)

<br>


## 패키지 설치

`conda install (패키지)` : 현재 활성화되어 있는 환경에 해당 패기지 인스톨

`conda install --name (환경이름) (패키지)` : 해당 환경에 해당 패기지 인스톨

예시)

```
conda install jupyter
```

<br>


## Jupyter Notebook 설정

ubuntu 앱에서 서버만 실행시키고 윈도우 화면에서 접속하는 방식으로 사용할 수 있다.

다음과 같이 jupyter notebook을 브라우저 없이 실행하겠다는 옵션을 주고 실행하면, 브라우저가 실행되지 않고 서버에 접속할 수 있는 URL이 출력된다. 그 URL을 복사해서 윈도우에서 접속하면 된다.

```
jupyter notebook --no-browser
```

종료하고 싶은 경우에는 `ctrl + c`를 입력한다.

<br>

### Jupyter config 수정

실행할 때마다 옵션을 입력해야 하면 번거로우니 config 파일을 변경하자.

```
jupyter notebook --generate-config
```

이 명령어를 입력하면 `.jupyter`라는 폴더 안에 `jupyter_notebook_config.py` 파일이 생성된다.

<br>

파일을 열어서 `c.NotebookApp.open_browser` 값을 `False`로
설정하고 저장한다.

```python
c.NotebookApp.open_browser = False
```

이제 옵션을 붙이지 않고 jupyter notebook을 실행해도 브라우저 없이 서버만 실행된다.

```
jupyter notebook
````

<br>

이 외에도 `c.NotebookApp.notebook_dir` 값을 바꿔 시작 경로를 바꿀 수도 있다.

```python
c.NotebookApp.notebook_dir = '원하는 경로'
```
