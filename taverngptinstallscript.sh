#In this software, you can upload tavern characters, and chat with AI impersonating characters of your choice
#
#CODE SUM: ir clones https://github.com/camenduru/text-generation-webui-colab?tab=readme-ov-file , downlaod the llm model pyg-7b-GPTQ-4bit-128g


#btw, you are suposed to run with sudo privileges
cd
mkdir /character-ai
cd /character-ai
apt-get -y install -qq aria2

git clone -b v2.5 https://github.com/camenduru/text-generation-webui
cd /character-ai/text-generation-webui




#update apt, loading old python
sudo add-apt-repository ppa:deadsnakes/ppa                       
sudo apt update
sudo apt install -y python3.10 python3.10-venv python3.10-distutils 
python3.10 -m venv myenv                                    
source myenv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt







pip install -q -r requirements.txt

aria2c --console-log-level=error -c -x 16 -s 16 -k 1M https://huggingface.co/4bit/pyg-7b-4bit-128g-cuda/raw/main/config.json -d /character-ai/text-generation-webui/models/pyg-7b-4bit-128g-cuda -o config.json
aria2c --console-log-level=error -c -x 16 -s 16 -k 1M https://huggingface.co/4bit/pyg-7b-4bit-128g-cuda/raw/main/generation_config.json -d /character-ai/text-generation-webui/models/pyg-7b-4bit-128g-cuda -o generation_config.json
aria2c --console-log-level=error -c -x 16 -s 16 -k 1M https://huggingface.co/4bit/pyg-7b-4bit-128g-cuda/raw/main/special_tokens_map.json -d /character-ai/text-generation-webui/models/pyg-7b-4bit-128g-cuda -o special_tokens_map.json
aria2c --console-log-level=error -c -x 16 -s 16 -k 1M https://huggingface.co/4bit/pyg-7b-4bit-128g-cuda/resolve/main/tokenizer.model -d /character-ai/text-generation-webui/models/pyg-7b-4bit-128g-cuda -o tokenizer.model
aria2c --console-log-level=error -c -x 16 -s 16 -k 1M https://huggingface.co/4bit/pyg-7b-4bit-128g-cuda/raw/main/tokenizer_config.json -d /character-ai/text-generation-webui/models/pyg-7b-4bit-128g-cuda -o tokenizer_config.json
aria2c --console-log-level=error -c -x 16 -s 16 -k 1M https://huggingface.co/4bit/pyg-7b-4bit-128g-cuda/resolve/main/pyg7b-4bit-128g.safetensors -d /character-ai/text-generation-webui/models/pyg-7b-4bit-128g-cuda -o pyg7b-4bit-128g.safetensors

echo "dark_theme: true" > /character-ai/settings.yaml
echo "chat_style: wpp" >> /character-ai/settings.yaml

cd /character-ai/text-generation-webui
python3.10 server.py --share --settings /character-ai/settings.yaml --wbits 4 --groupsize 128 --loader AutoGPTQ --model /character-ai/text-generation-webui/models/pyg-7b-4bit-128g-cuda


#CREDITS
#
#https://github.com/camenduru/text-generation-webui-colab?tab=readme-ov-file
#https://github.com/oobabooga/text-generation-webui?tab=readme-ov-file
#https://huggingface.co/Neko-Institute-of-Science/pygmalion-7b/tree/main
#https://www.reddit.com/r/PygmalionAI/comments/118bcey/where_i_can_find_ready_characters_for_tavernai/
#https://github.com/oobabooga/text-generation-webui/issues/2910
