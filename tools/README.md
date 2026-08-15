# Ferramentas do projeto

Scripts Python de apoio ficam nesta pasta. Eles devem ser seguros por padrão, documentados e independentes da aplicação React.

## Scripts atuais

### `optimize_images.py`

Redimensiona e comprime JPG, PNG e WebP em uma pasta de saída separada. Nunca sobrescreve a origem por padrão.

```powershell
python tools\optimize_images.py reference\site-original\images optimized-images
```

Opções úteis:

```powershell
python tools\optimize_images.py origem destino --format webp --quality 82 --max-width 2400
```

### `build_reference_bank.py`

Reconstrói os catálogos JSON e a prancha visual do banco de referência.

### `trim_transparency.py`

Remove somente bordas totalmente transparentes, preservando os pixels visíveis do asset original.

```powershell
python tools\trim_transparency.py origem.png destino.png
```

### `mirror_site.py`

Ferramenta usada somente para capturar uma nova versão pública autorizada do site atual. Não deve ser executada durante o desenvolvimento visual comum.

### `capture_ui.mjs`

Reutiliza o Microsoft Edge instalado para validar desktop, 390 px e 360 px com viewport real e detectar overflow horizontal. Screenshots são opcionais porque algumas versões do Edge podem bloquear a captura via protocolo.

```powershell
node tools\capture_ui.mjs http://127.0.0.1:8000/dist/ artifacts\ui
node tools\capture_ui.mjs http://127.0.0.1:8000/dist/ artifacts\ui --screenshots
```

## Dependências

```powershell
python -m pip install -r tools\requirements.txt
```
