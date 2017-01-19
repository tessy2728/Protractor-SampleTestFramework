#!/bin/bash
#
# This script will install base components for an application like node, npm, nvm ...
echo "*****************************************"
echo " 2. Install nvm + node 4.2.1"
echo "*****************************************"
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.25.4/install.sh | bash
# reload bash profile
apt-get install -y npm 
source ~/.bashrc
sudo nvm install 4.2.1
sudo nvm alias default node
echo "*****************************************"
echo " 3. Install global node modules"
echo "*****************************************"
sudo npm install -g gulp
sudo npm install -g grunt
sudo npm install -g grunt-cli
sudo npm install -g protractor
echo "*****************************************"
echo " 4. Install local node modules"
echo "*****************************************"
sudo npm install
echo "*****************************************"
echo " 5. Updating webdriver-manager"	
echo "*****************************************"
sudo node node_modules/protractor/bin/webdriver-manager update