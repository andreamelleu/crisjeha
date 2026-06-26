Add-Type -AssemblyName System.Drawing

$dir = Split-Path -Parent $MyInvocation.MyCommand.Path

# QR Verde transparente (cardápio)
$imgPath = Join-Path $dir "qr-temp.png"
$outPath = Join-Path $dir "qr-verde-transparente.png"

$img = [System.Drawing.Image]::FromFile($imgPath)
$bmp = New-Object System.Drawing.Bitmap($img)
$img.Dispose()

$bmp.MakeTransparent([System.Drawing.Color]::White)
$bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()

Write-Host "Salvo: $outPath"

# QR Preto transparente (site)
$imgPath2 = Join-Path $dir "qr-temp-preto.png"
$outPath2 = Join-Path $dir "qr-preto-transparente.png"

if (Test-Path $imgPath2) {
    $img2 = [System.Drawing.Image]::FromFile($imgPath2)
    $bmp2 = New-Object System.Drawing.Bitmap($img2)
    $img2.Dispose()
    $bmp2.MakeTransparent([System.Drawing.Color]::White)
    $bmp2.Save($outPath2, [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp2.Dispose()
    Write-Host "Salvo: $outPath2"
}

Write-Host "Concluido!"
