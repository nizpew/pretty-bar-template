[status:working]

js e sh scrpt pra mass product pretty bars for softwares cli




template for Instalatiion part of readme:




## How to install
```bash
git clone https://github.com/nizpew/pretty-bar-template.git
cd ; cd pretty-bar-template

#nesse git do template especifico,
 
chmod +x ./install-with-pretty-bar.sh
#if necessary for the script,

sudo ./install-with-pretty-bar.sh
#agora é só alterar o ./specificscript.sh como desejar

```
## Usage

you take modify specificscript.sh content to the commands you want to be ran in the background while the animation occurs.





you modify ./install-with-pretty-bar.sh and puts the dependencies of your project, bcs this part runs only once, on the first boot.
```bash

    # This block runs only the first time
sudo apt update -y
sudo apt install -y nodejs npm
npm install cli-progress

```


TODOS
arrumar bug da ~/marker_file.txt
