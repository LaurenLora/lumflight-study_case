#!/bin/bash

# Mono repo dizinine git
echo "Mono repo dizinine gidiliyor..."
cd /path/to/your/mono-repo

# Tüm bağımlılıkları yükle (ana dizin için npm kullanılıyor)
echo "Ana dizindeki bağımlılıklar yükleniyor..."
npm install

if [ $? -ne 0 ]; then
  echo "Hata: Ana dizindeki bağımlılıklar yüklenirken bir hata oluştu."
  exit 1
fi

# Apps dizinindeki tüm projelerin bağımlılıklarını yükle
echo "Apps dizinindeki projelerin bağımlılıkları yükleniyor..."
cd apps
for dir in */; do
  if [ -f "$dir/package.json" ]; then
    echo "$dir projesinin bağımlılıkları yükleniyor..."
    cd "$dir"

    # Proje yarn kullanıyorsa yarn, npm kullanıyorsa npm ile yükle
    if [ -f "yarn.lock" ]; then
      echo "$dir projesi yarn kullanıyor. Yarn ile bağımlılıklar yükleniyor..."
      yarn install
    elif [ -f "package-lock.json" ] || [ -f "package.json" ]; then
      echo "$dir projesi npm kullanıyor. NPM ile bağımlılıklar yükleniyor..."
      npm install
    else
      echo "Uyarı: $dir projesi için paket yöneticisi belirlenemedi. Geçiliyor..."
    fi

    if [ $? -ne 0 ]; then
      echo "Hata: $dir projesinin bağımlılıkları yüklenirken bir hata oluştu."
      exit 1
    fi

    cd ..
  fi
done

# Projeleri başlat
echo "Projeler başlatılıyor..."
npm run start

if [ $? -ne 0 ]; then
  echo "Hata: Projeler başlatılırken bir hata oluştu."
  exit 1
fi

echo "Tüm projeler başarıyla başlatıldı."