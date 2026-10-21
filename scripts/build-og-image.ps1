# Regenerates public/og-image.png (1200x630), the social link-preview image.
# Windows only (uses System.Drawing). Run: powershell -File scripts/build-og-image.ps1
Add-Type -AssemblyName System.Drawing

$out = Join-Path $PSScriptRoot '..\public\og-image.png'
$w = 1200; $h = 630
$bmp = New-Object System.Drawing.Bitmap $w, $h
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = 'AntiAlias'
$g.TextRenderingHint = 'AntiAliasGridFit'

# Background gradient and grid.
$rect = New-Object System.Drawing.Rectangle 0, 0, $w, $h
$bg = New-Object System.Drawing.Drawing2D.LinearGradientBrush $rect, ([System.Drawing.Color]::FromArgb(11, 17, 32)), ([System.Drawing.Color]::FromArgb(17, 34, 58)), 35
$g.FillRectangle($bg, $rect)
$gridPen = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(14, 148, 163, 184)), 1
for ($x = 0; $x -lt $w; $x += 32) { $g.DrawLine($gridPen, $x, 0, $x, $h) }
for ($y = 0; $y -lt $h; $y += 32) { $g.DrawLine($gridPen, 0, $y, $w, $y) }

$cyan = [System.Drawing.Color]::FromArgb(34, 211, 238)
$white = [System.Drawing.Color]::FromArgb(230, 236, 245)
$muted = [System.Drawing.Color]::FromArgb(154, 168, 194)
$green = [System.Drawing.Color]::FromArgb(74, 222, 128)

# Monogram.
$g.FillRectangle((New-Object System.Drawing.SolidBrush $cyan), 88, 80, 72, 72)
$mono = New-Object System.Drawing.Font 'Segoe UI', 26, ([System.Drawing.FontStyle]::Bold), ([System.Drawing.GraphicsUnit]::Pixel)
$fmt = New-Object System.Drawing.StringFormat
$fmt.Alignment = 'Center'; $fmt.LineAlignment = 'Center'
$g.DrawString('WY', $mono, (New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(4, 32, 42))), (New-Object System.Drawing.RectangleF 88, 80, 72, 72), $fmt)

$label = New-Object System.Drawing.Font 'Consolas', 22, ([System.Drawing.FontStyle]::Regular), ([System.Drawing.GraphicsUnit]::Pixel)
$g.DrawString('~/portfolio', $label, (New-Object System.Drawing.SolidBrush $muted), 180, 102)

# Status pill.
$g.FillEllipse((New-Object System.Drawing.SolidBrush $green), 92, 214, 14, 14)
$pill = New-Object System.Drawing.Font 'Segoe UI', 24, ([System.Drawing.FontStyle]::Bold), ([System.Drawing.GraphicsUnit]::Pixel)
$g.DrawString('Open to a 1-year internship  -  March 2027', $pill, (New-Object System.Drawing.SolidBrush $green), 116, 204)

# Name and role.
$name = New-Object System.Drawing.Font 'Segoe UI', 86, ([System.Drawing.FontStyle]::Bold), ([System.Drawing.GraphicsUnit]::Pixel)
$g.DrawString('Wai Yan Hpone Lat', $name, (New-Object System.Drawing.SolidBrush $white), 80, 262)
$role = New-Object System.Drawing.Font 'Consolas', 30, ([System.Drawing.FontStyle]::Regular), ([System.Drawing.GraphicsUnit]::Pixel)
$g.DrawString('Applied AI & Analytics  |  Nanyang Polytechnic', $role, (New-Object System.Drawing.SolidBrush $cyan), 90, 390)

# Footer line.
$g.FillRectangle((New-Object System.Drawing.SolidBrush $cyan), 92, 470, 120, 5)
$foot = New-Object System.Drawing.Font 'Segoe UI', 26, ([System.Drawing.FontStyle]::Regular), ([System.Drawing.GraphicsUnit]::Pixel)
$g.DrawString('Full-stack  -  Python & ML  -  Data analytics', $foot, (New-Object System.Drawing.SolidBrush $muted), 90, 500)
$g.DrawString('github.com/TeddyQyuon', $label, (New-Object System.Drawing.SolidBrush $muted), 830, 560)

$bmp.Save((Resolve-Path (Split-Path $out)).Path + '\og-image.png', [System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose(); $bmp.Dispose()
Write-Output "Wrote $out"
