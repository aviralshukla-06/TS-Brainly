FROM node:22-alpine

WORKDIR /app

COPY ./package* . 
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "node", "dist/index.js" ]



# in pkg.json changed scripts 
# initial it was :
#     // "dev": "tsc -b && node ./dist/index.js"