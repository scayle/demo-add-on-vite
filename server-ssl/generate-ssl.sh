#! /bin/bash

which openssl

if [ "$?" -ne 0 ]; then
    echo "You do not have openssl CLI command installed"
    exit 1
fi

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
ROOT_DIR=$SCRIPT_DIR/../

cd "$SCRIPT_DIR"

if [ -f "$ROOT_DIR"/.env ]; then
    source "$ROOT_DIR"/.env
fi

if [ -z "$CONFIG_SERVER_HOST" ]; then
    SERVER_HOST=demo-add-on.cloud-panel.aboutyou.test
else
    SERVER_HOST=$CONFIG_SERVER_HOST
fi

cp default.conf temp.conf

case "$(uname -sr)" in
   Darwin*)
        sed -i '' "s/{{SERVER_HOST}}/$SERVER_HOST/g" temp.conf
     ;;

   *)
        sed -i "s/{{SERVER_HOST}}/$SERVER_HOST/g" temp.conf
     ;;
esac

openssl genrsa -out default.key 2048
openssl req -new -x509 -key default.key -out default.crt -days 3650 -subj /CN=$SERVER_HOST -extensions SAN -config temp.conf

echo "Generated certificate for: $SERVER_HOST"

case "$(uname -sr)" in

   Darwin*)
        sudo security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain default.crt
     ;;

   Linux*)
        source /etc/os-release
        if [ "$ID_LIKE" == "debian" ] || [ "$ID" == "ubuntu" ]; then
            apt-get install -y ca-certificates
            sudo cp default.crt /usr/local/share/ca-certificates/default.crt
            sudo update-ca-certificates
        elif [ "$ID" == "fedora" ]; then
            trust anchor default.crt
            update-ca-trust
        else
            echo "Your OS is not supported. You will have to trust your certificate by yourself"
        fi
     ;;

   CYGWIN*|MINGW32*|MINGW*|MSYS*)
        certutil -addstore -f "ROOT" new-root-certificate.crt
     ;;

   *)
        echo "Your OS is not supported. You will have to trust your certificate by yourself"
     ;;
esac

rm temp.conf

