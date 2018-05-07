rd /s /Q D:\xampp\htdocs\linhuiba_admin\dist
md D:\xampp\htdocs\linhuiba_admin\dist
echo 'dist 文件夹已重新生成！按任意键将开始编译！'
pause
npm run build
pause
echo '编译完成！请查看 dist 文件夹'
pause
