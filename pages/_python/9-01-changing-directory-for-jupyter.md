---
title: Jupyter Notebook 시작경로 변경
slug: changing-directory-for-jupyter
category: Others
---

## 1. Config 파일 생성
Anaconda Powershell Prompt를 실행한다.

명령어 jupyter notebook --generate-config 실행한다.

![generate config](/assets/images/python/jupyter-generate-config.png){: width="679" height="141"}

<br>


## 2. Config 파일에 원하는 경로 설정

생성된 경로로 가서 config 파일을 열고 `# c.NotebookApp.notebook_dir = ''` 를 찾는다.

![directory for notebook](/assets/images/python/jupyter-config-directory-default.png){: width="503" height="71"}

주석을 삭제하고 원하는 경로를 넣어준다.

![change directory for notebook](/assets/images/python/jupyter-config-directory-changed.png){: width="648" height="71"}

<br>


## 3. Jupyter Notebook 설정 변경
Jupyter Notebook 속성을 열어 `"%USERPROFILE%/"`를 삭제한다.

![properties of jupyter](/assets/images/python/jupyter-properties.png){: width="453" height="713"}
