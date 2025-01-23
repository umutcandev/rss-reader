# RSS Reader

Modern ve kullanıcı dostu bir RSS okuyucu uygulaması. Next.js ve Tailwind CSS ile geliştirilmiş, koyu/açık tema desteği ve gelişmiş arama özellikleri sunan bir web uygulaması.

![RSS Reader](public/preview.png)

## 🚀 Özellikler

- 📱 Responsive tasarım (Mobil, tablet ve masaüstü uyumlu)
- 🌓 Koyu/Açık tema desteği
- 🔍 Gelişmiş arama özellikleri
  - Klavye kısayolu ile hızlı arama (⌘/Ctrl + S)
  - İçerik bazlı arama
  - Anlık sonuçlar
- 📰 RSS Feed Yönetimi
  - Özel RSS kaynağı ekleme
  - Varsayılan kaynak (Teknogoal RSS)
  - Kaynak doğrulama
- 💫 Modern UI/UX
  - Görsel önizlemeler
  - Yükleme animasyonları
  - Hover efektleri
  - Pürüzsüz geçişler
- ⚡️ Performans Optimizasyonları
  - Sayfalama (9 makale gösterimi)
  - Lazy loading
  - Önbellekleme

## 🛠️ Kullanılan Teknolojiler

- [Next.js 15](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - UI bileşenleri
- [TypeScript](https://www.typescriptlang.org/) - Tip güvenliği
- [RSS Parser](https://www.npmjs.com/package/rss-parser) - RSS feed işleme
- [Lucide Icons](https://lucide.dev/) - İkonlar
- [next-themes](https://github.com/pacocoursey/next-themes) - Tema yönetimi
- [cmdk](https://cmdk.paco.me/) - Komut paleti

## 🚀 Kurulum

1. Projeyi klonlayın:
```bash
git clone https://github.com/umutcandev/rss-reader.git
```

2. Proje dizinine gidin:
```bash
cd rss-reader
```

3. Bağımlılıkları yükleyin:
```bash
npm install
# veya
yarn install
```

4. Geliştirme sunucusunu başlatın:
```bash
npm run dev
# veya
yarn dev
```

5. Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açın.

## 📝 Kullanım

1. Ana sayfada varsayılan olarak Teknogoal RSS kaynağı yüklenir
2. Kendi RSS kaynağınızı eklemek için:
   - "RSS Kaynağınızı Seçin" dialogunu açın
   - RSS bağlantınızı yapıştırın
   - "Ekle" butonuna tıklayın
3. Makalelerde arama yapmak için:
   - Arama butonuna tıklayın veya ⌘/Ctrl + S kısayolunu kullanın
   - Arama terimini girin
   - Sonuçlar anında görüntülenecektir
4. Tema değiştirmek için:
   - Sağ üst köşedeki tema butonunu kullanın

## 🤝 Katkıda Bulunma

1. Bu repository'yi fork edin
2. Yeni bir branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'feat: Add amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Daha fazla bilgi için [LICENSE](LICENSE) dosyasına bakın.

## 👤 Geliştirici

- GitHub: [@umutcandev](https://github.com/umutcandev)
