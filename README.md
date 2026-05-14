# 👟 Kalıp & Model Takip — Vercel Deploy Rehberi

## Klasör Yapısı

```
kalip-takip/
├── api/
│   ├── load.js       ← Veriyi KV'den okur
│   ├── save.js       ← Veriyi KV'ye yazar
│   └── ping.js       ← Bağlantı kontrolü
├── public/
│   └── index.html    ← Ana uygulama
├── package.json
└── vercel.json
```

---

## Deploy Adımları

### 1. GitHub'a yükle

```bash
git init
git add .
git commit -m "kalip takip ilk commit"
git remote add origin https://github.com/KULLANICI_ADIN/kalip-takip.git
git push -u origin main
```

### 2. Vercel'e bağla

1. [vercel.com](https://vercel.com) → "Add New Project"
2. GitHub repoyu seç → "Import"
3. Framework: **Other** olarak bırak
4. "Deploy" butonuna bas

### 3. Vercel KV (Redis) oluştur — ÖNEMLİ

Vercel KV olmadan veri kaydetmez!

1. Vercel dashboard → projeye gir
2. Sol menü → **Storage** sekmesi
3. **"Create Database"** → **KV** seç
4. İsim ver (örn: `kalip-kv`) → **Create**
5. Oluşan KV'nin sayfasında → **"Connect Project"** butonuna tıkla → projeyi seç
6. Bu adım otomatik olarak `KV_URL`, `KV_REST_API_URL`, `KV_REST_API_TOKEN` environment variable'larını ekler

### 4. Redeploy

KV'yi bağladıktan sonra:
- Vercel dashboard → **Deployments** sekmesi
- En son deployment → **"..."** menüsü → **Redeploy**

---

## Mevcut Veriyi Taşıma (opsiyonel)

Elindeki `veri.json` dosyasını yeni sisteme aktarmak istersen:

1. Siteye gir, uygulamayı aç
2. Tarayıcı konsolunu aç (F12)
3. Şunu yapıştır ve çalıştır:

```javascript
// veri.json içeriğini buraya yapıştır
const eskiVeri = { /* veri.json içeriği */ };
fetch("/api/save", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(eskiVeri)
}).then(r => r.json()).then(console.log);
```

---

## Notlar

- Vercel ücretsiz planında KV limiti: **30.000 istek/ay** — normal kullanım için fazlasıyla yeterli
- Resimler base64 olarak veriye gömülü saklanır
- Veri kaybolursa: tarayıcıda `localStorage.getItem("kalip_yedek")` ile yedek bulunabilir
