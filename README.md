MongoDB is hosted on https://mlab.com

https://stackoverflow.com/questions/10175812/how-to-create-a-self-signed-certificate-with-openssl?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa


Download open SSL installer : https://wiki.openssl.org/index.php/Binaries

Also had to create custom config file

>c:\OpenSSL-win64\bin\openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -config .\openssl.conf