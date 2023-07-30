# An example JavaScript(+ ReactJS) application to call a Responsive REST API(Stream API)
### How to run the app

This App uses server from https://github.com/csardarMarkAny/hands-on-spring-web-flux 
first start that all after that, follow below instructions
    
    npm install
    npm start

Open http://localhost:3000/ (Will have CROS error)
Setup an NginX like - 

    worker_processes  1;

    events {
        worker_connections  1024;
    }


    http {

        include       mime.types;
        default_type  application/octet-stream;

        sendfile        on;

        keepalive_timeout  900;

        client_max_body_size 1024M;


        server {
            listen       80;
            server_name  localhost;

            proxy_read_timeout 900;

            location / {
                proxy_pass http://localhost:3000/;
            }

            location /hello-spring-web-flux/ {
                proxy_pass http://127.0.0.1:8080/hello-spring-web-flux/;
            }

            error_page   500 502 503 504  /50x.html;
            location = /50x.html {
                root   html;
            }
        }
    }


Open http://127.0.0.1/

### Reference Libery 

https://github.com/Azure/fetch-event-source
