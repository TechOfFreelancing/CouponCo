sudo apt update -y
sudo apt upgrade 
sudo apt install mysql-server -y
sudo apt install curl -y
sudo mysql -u root -p -e "ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Ridham@693#';"
echo "[client] user=root password=Ridham@693#" > .my.cnf
chmod 600 .my.cnf
mysql -u root -pRidham@693# -e "CREATE DATABASE Coupons;"
mysql -u root -pRidham@693# -e "GRANT ALL PRIVILEGES ON *.* TO 'root'@'localhost' WITH GRANT OPTION;"
#mysql -u root -pRidham@693# Coupons < backup.sql
