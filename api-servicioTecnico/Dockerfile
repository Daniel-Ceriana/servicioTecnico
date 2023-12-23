FROM node:20.10.0

WORKDIR /api-servicioTecnico
COPY package.json .
RUN npm install
COPY . .
CMD npm run dev