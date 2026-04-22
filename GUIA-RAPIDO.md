# Guia rápido — só o essencial

## Três palavras, três funções

| Palavra    | O quê é (sem complicação)                                      |
|-----------|-----------------------------------------------------------------|
| **Git**   | O “guardar versões” do teu projeto **no teu PC**.               |
| **GitHub**| Uma **cópia na internet** do mesmo projeto (backup + partilha). |
| **Vercel**| O **site no ar**: lê o GitHub, monta a página e mostra ao mundo.|

Fluxo que importa: **mexes no código → envias para o GitHub → a Vercel atualiza o site** (se o projeto estiver ligado ao repositório).

---

## Quando quiseres “meter as alterações online”

Abre o terminal na pasta do projeto (`Vet2`) e corre **nesta ordem**:

```text
git add .
git commit -m "descreve em poucas palavras o que mudaste"
git push
```

- O **primeiro** prepara as alterações.  
- O **segundo** grava no histórico local com uma mensagem tua.  
- O **terceiro** envia para o **GitHub**; a **Vercel** costuma fazer deploy sozinho em seguida.

Se o `git commit` disser que “não há nada para commitar”, não há alterações novas — está tudo guardado.

---

## Login e segredos (passwords)

- O ficheiro **`.env`** no teu PC **não vai** para o GitHub (está ignorado por segurança).  
- Na **Vercel**: **Project → Settings → Environment Variables** — aí defines o mesmo tipo de variáveis (`VITE_LOGIN_EMAIL`, etc.) para o **site online**.

---

## Vídeos / ficheiros em `public/` que “não atualizam”

Depois de trocares um ficheiro **com o mesmo nome**, sobe o número em **dois sítios**:

1. No teu **`.env`**: `VITE_ASSET_VERSION=3` (ou 4, 5…)  
2. Na **Vercel** (mesmo sítio das variáveis): a mesma variável com o **mesmo** número.

Depois: **commit + push** (ou redeploy no painel da Vercel) para o site novo apanhar o valor.

---

## Repositório deste projeto

- **GitHub:** `https://github.com/cristyyalbertyy-hub/Radiologia`  
- Ramo que usas: **`main`**

---

## Se algo correr mal

- **Push falha por ficheiro grande:** o GitHub recusa ficheiros **> 100 MB**; comprime o vídeo ou usa ficheiro mais pequeno.  
- **Site antigo no browser:** experimenta janela anónima ou outro browser; às vezes é cache (o `VITE_ASSET_VERSION` ajuda a forçar novo ficheiro).

Guarda este ficheiro nos favoritos do projeto — não precisas de decorar nada.
