$dest = "C:\Users\0000\Desktop\New folder (3)\bahir-dar-explorer\public\images"
$ok = 0; $fail = 0

function Get-WikiImageUrl($filename) {
  $enc = [System.Uri]::EscapeDataString($filename)
  $apiUrl = "https://commons.wikimedia.org/w/api.php?action=query&titles=File:$enc&prop=imageinfo&iiprop=url&iiurlwidth=1200&format=json"
  try {
    $r = Invoke-WebRequest -Uri $apiUrl -UseBasicParsing -TimeoutSec 20
    $json = $r.Content | ConvertFrom-Json
    $pages = $json.query.pages
    $page = $pages.PSObject.Properties.Value | Select-Object -First 1
    return $page.imageinfo[0].thumburl
  } catch { return $null }
}

function Download-Image($filename, $saveas) {
  $url = Get-WikiImageUrl $filename
  if (-not $url) { Write-Host "NO URL: $filename"; return $false }
  $path = "$dest\$saveas"
  try {
    Invoke-WebRequest -Uri $url -OutFile $path -UseBasicParsing -TimeoutSec 30
    $size = (Get-Item $path).Length
    if ($size -gt 5000) {
      Write-Host "OK ($([math]::Round($size/1024))KB): $saveas <- $filename"
      return $true
    } else {
      Write-Host "TOO SMALL: $saveas"
      return $false
    }
  } catch { Write-Host "FAIL DOWNLOAD: $saveas"; return $false }
}

# Map: Wikimedia filename -> local save name
$images = @(
  # BLUE NILE FALLS
  @{ file="BlueNileFallsEthiopia.jpg";                                          save="blue-nile-falls-hero.jpg" },
  @{ file="Blue Nile Falls-01, by CT Snow.jpg";                                 save="blue-nile-falls.jpg" },
  @{ file="Blue Nile Falls-01, by CT Snow.jpg";                                 save="gal-01.jpg" },

  # LAKE TANA
  @{ file="ET Amhara asv2018-02 img068 Lake Tana at Bahir Dar.jpg";             save="lake-tana-hero.jpg" },
  @{ file="Papyrus - Lake Tana Bahir Dar.jpg";                                  save="lake-tana.jpg" },
  @{ file="ET Amhara asv2018-02 img068 Lake Tana at Bahir Dar.jpg";             save="gal-02.jpg" },
  @{ file="Papyrus - Lake Tana Bahir Dar.jpg";                                  save="gal-11.jpg" },

  # BAHIR DAR CITY
  @{ file="Bahir Dar - panoramio (3).jpg";                                      save="bahir-dar-hero.jpg" },
  @{ file="Bahir Dar - panoramio (3).jpg";                                      save="bahir-dar-city.jpg" },
  @{ file="Bahir Dar - panoramio (3).jpg";                                      save="gal-03.jpg" },
  @{ file="Bahir Dar City Satelite View.jpg";                                   save="gal-07.jpg" },
  @{ file="Bahar dar market.jpg";                                               save="gal-14.jpg" },

  # URA KIDANE MEHRET
  @{ file="Ura Kidane Meret, Lake Tana, Ethiopia (5).jpg";                      save="gal-10.jpg" },
  @{ file="Ura Kidane Meret, Lake Tana, Ethiopia (5).jpg";                      save="att-ura-kidane.jpg" },

  # NARGA SELASSIE
  @{ file="Narga Selassie, Lake Tana, Ethiopia (3).jpg";                        save="gal-13.jpg" },
  @{ file="Narga Selassie, Lake Tana, Ethiopia (3).jpg";                        save="att-narga.jpg" },

  # MONASTERIES
  @{ file="Lake Tana Monasteries.jpg";                                          save="monasteries.jpg" },
  @{ file="Kibran Gabriel, Lake Tana, Ethiopia.jpg";                            save="gal-04.jpg" },
  @{ file="Kibran Gabriel, Lake Tana, Ethiopia.jpg";                            save="gal-15.jpg" },
  @{ file="Kibran Gabriel, Lake Tana, Ethiopia.jpg";                            save="att-kibran.jpg" },

  # TIMKAT
  @{ file="Timkat in Lalibela.jpg";                                             save="gal-08.jpg" },

  # ETHIOPIAN CULTURE
  @{ file="Ethiopian Orthodox clergy.jpg";                                      save="gal-12.jpg" },

  # ETHIOPIAN HIGHLANDS
  @{ file="Ethiopian Highlands.jpg";                                            save="gal-05.jpg" },
  @{ file="Ethiopia landscape.jpg";                                             save="gal-06.jpg" },

  # PAPYRUS BOATS
  @{ file="Papyrus - Lake Tana Bahir Dar.jpg";                                  save="gal-09.jpg" },

  # ZEGE PENINSULA
  @{ file="Zege Peninsula, Lake Tana, Ethiopia.jpg";                            save="gal-16.jpg" },

  # ATTRACTIONS
  @{ file="BlueNileFallsEthiopia.jpg";                                          save="att-blue-nile.jpg" },
  @{ file="ET Amhara asv2018-02 img068 Lake Tana at Bahir Dar.jpg";             save="att-lake-tana.jpg" },
  @{ file="Bahir Dar - panoramio (3).jpg";                                      save="att-bezawit.jpg" },
  @{ file="Bahar dar market.jpg";                                               save="att-market.jpg" },
  @{ file="Kibran Gabriel, Lake Tana, Ethiopia.jpg";                            save="att-debre.jpg" },
  @{ file="Zege Peninsula, Lake Tana, Ethiopia.jpg";                            save="att-zege.jpg" },

  # BLOG
  @{ file="Bahir Dar - panoramio (3).jpg";                                      save="blog-history.jpg" },
  @{ file="ET Amhara asv2018-02 img068 Lake Tana at Bahir Dar.jpg";             save="blog-lake-tana.jpg" },
  @{ file="BlueNileFallsEthiopia.jpg";                                          save="blog-falls.jpg" },
  @{ file="Ethiopian Orthodox clergy.jpg";                                      save="blog-culture.jpg" },
  @{ file="Blue Nile Falls-01, by CT Snow.jpg";                                 save="blog-best-places.jpg" }
)

Write-Host "Starting download of $($images.Count) images..."
Write-Host "================================================"

foreach ($img in $images) {
  $path = "$dest\$($img.save)"
  # Skip if already good (from a previous successful run)
  if ((Test-Path $path) -and (Get-Item $path).Length -gt 50000) {
    Write-Host "SKIP (exists): $($img.save)"; $ok++; continue
  }
  if (Download-Image $img.file $img.save) { $ok++ } else { $fail++ }
  Start-Sleep -Milliseconds 300
}

Write-Host ""
Write-Host "================================================"
Write-Host "DONE: $ok downloaded, $fail failed"
Write-Host ""

# List all files with sizes
Write-Host "=== FILES IN public/images/ ==="
Get-ChildItem "$dest" -Filter "*.jpg" | Sort-Object Name | ForEach-Object {
  Write-Host "$($_.Name.PadRight(35)) $([math]::Round($_.Length/1024)) KB"
}
