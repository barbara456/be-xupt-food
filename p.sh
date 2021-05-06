#!/bin/bash
echo -e "\033[46;37m ----------------------------Begin---------------------------- \033[0m"
git add .
echo -e "\033[34m  Coding your message. \033[0m"
read -p "Writing message: " commitInfo
sh -c "git commit -m \"$commitInfo\""
git push
echo -e "\033[46;37m ----------------------------End---------------------------- \033[0m"