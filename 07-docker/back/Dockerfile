FROM node:14 

WORKDIR /sourceCode/

# 변경 사항이 있으면 해당 줄 아래로 전부 재실행
# 때문에 COPY보다 install명령어가 상단에 위치해야 함
COPY ./package.json /sourceCode/
COPY ./yarn.lock /sourceCode/
RUN yarn install

COPY . /sourceCode/


CMD yarn dev