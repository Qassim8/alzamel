# يفكّ ضغط HEIC عبر WIC (دعم ويندوز المدمج) إلى PNG مؤقت.
# sharp لا يستطيع فكّ HEVC داخل HEIC، وffmpeg 6 بلا demuxer لـ HEIF.
param([string]$Src, [string]$Dst)
Add-Type -AssemblyName PresentationCore
$stream = [System.IO.File]::OpenRead($Src)
try {
  $decoder = [System.Windows.Media.Imaging.BitmapDecoder]::Create(
    $stream, 'None', 'OnLoad')
  $encoder = New-Object System.Windows.Media.Imaging.PngBitmapEncoder
  $encoder.Frames.Add($decoder.Frames[0])
  $out = [System.IO.File]::Open($Dst, 'Create')
  try { $encoder.Save($out) } finally { $out.Close() }
} finally { $stream.Close() }
