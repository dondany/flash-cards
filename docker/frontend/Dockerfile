# Use an official NGINX image as a parent image
FROM nginx:alpine

# Remove default ngnix config
RUN rm /etc/nginx/conf.d/default.conf

# Copy your custom NGINX configuration to the container
COPY files/nginx.conf /etc/nginx/conf.d/

# Copy your Angular app files from the local 'dist' folder into the NGINX web server directory
COPY files/web /usr/share/nginx/html/

# Expose the default NGINX port (usually 80)
EXPOSE 80

# Start NGINX in the foreground
CMD ["nginx", "-g", "daemon off;"]