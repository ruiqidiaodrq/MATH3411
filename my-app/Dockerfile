# use node.js
FROM node:22-alpine AS build

# setting working directory
WORKDIR /app

# copy package.json and package-lock.json
COPY package*.json ./

# install dependency
RUN npm install

# copy original code
COPY . .

# # construct react app
RUN npm run build
# # RUN npm start

# # Serve React build
# FROM nginx:alpine

# # 
# # COPY --from=build /app/build /usr/share/nginx/html
# COPY --from=build /app/dist /usr/share/nginx/html

# # expose 80 port
# EXPOSE 80

# # start Nginx
# CMD ["nginx", "-g", "daemon off;"]

# Expose port 5173 (default Vite port)
# EXPOSE 5173
EXPOSE 4173

# Run Vite in preview mode (for production-like behavior)
# CMD ["npm", "run", "preview"]
CMD ["npm", "start"]


