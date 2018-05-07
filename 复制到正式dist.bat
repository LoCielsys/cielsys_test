
rd /s /Q D:\xampp\htdocs\linhuiba_admin-branches\dist
md D:\xampp\htdocs\linhuiba_admin-branches\dist
pause
xcopy "D:\xampp\htdocs\linhuiba_admin\dist" "D:\xampp\htdocs\linhuiba_admin-branches\dist" /s /f /h /y
echo '复制完成！请查看正式 dist 文件夹'
pause
