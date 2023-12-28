# 운영체제 및 프로그램 설치 (하나 하나 입력하는 방식)
# FROM ubuntu:22.04

# FROM sudo apt install nodejs
# FROM sudo npm install -g yarn

# 운영체제 및 프로그램 설치 (이미 리눅스, node, yarn 까지 모두 깔려있는 컴퓨터 다운로드하는 방식)
FROM node:14 


# 내 컴퓨터에 있는 폴더나 파일을 도커 컴퓨터 안으로 복사하기
# RUN mkdir sourceCode -> 아래에서 COPY할 때, 자동으로 만들어주므로 굳이 필요 없음
WORKDIR /sourceCode/

# 변경 사항이 있으면 해당 줄 아래로 전부 재실행
# 때문에 COPY보다 install명령어가 상단에 위치해야 함
COPY ./package.json /sourceCode/
COPY ./yarn.lock /sourceCode/
RUN yarn install

COPY . /sourceCode/

# 도커안에서 index.js 실행
CMD yarn start:dev