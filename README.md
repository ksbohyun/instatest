# 사용 방법

서버 루트에 .env 파일을 만들어서 MONGODB_CONNECTION_STRING, JWT_SECRET 값을 설정해줘야 한다.

1. 몽고는 본인 host 혹은 아틀라스 host를 쓴다.

   > > https://www.mongodb.com/cloud/atlas

2. JWT_SECRET 의 값을 설정한다. (참고 값)

   > > https://passwordsgenerator.net/

3. .env 파일 생성 후, 값을 대입한다.

   > > MONGODB_CONNECTION_STRING=<가져온 url connection>

   > > JWT_SECRET=d2k=wf<)(Y\pef8@Aq[MW{A5XXsa>\$!FXft9:RL~Q\3ftSdeTg (50자의 string이 포함된 암호화 키이다.)

4. yarn 을 이용하여 json 형식으로 묶여있는 노드 모듈을 풀어준다.

   > >

# npm install

yarn install 또는 yarn

# npm i <package> --save

yarn add <package>

# npm i <package> --save-dev

yarn add <package> --dev : --dev 옵션은 -D 와 같다.

# 패키지 삭제

yarn remove <package>
