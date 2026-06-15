# Downloads all images locally from picsum.photos (verified working)
$dest = "C:\Users\0000\Desktop\New folder (3)\bahir-dar-explorer\public\images"
New-Item -ItemType Directory -Force -Path $dest | Out-Null

# id -> filename mapping (picsum seed IDs chosen for landscapes/nature/culture)
$imgs = @(
  # Hero / destinations
  @{ id=1036; file="blue-nile-falls-hero.jpg"; w=1920; h=1080 },
  @{ id=417;  file="lake-tana-hero.jpg";       w=1920; h=1080 },
  @{ id=325;  file="bahir-dar-hero.jpg";       w=1920; h=1080 },
  # Destinations
  @{ id=1036; file="blue-nile-falls.jpg";      w=900;  h=600  },
  @{ id=417;  file="lake-tana.jpg";            w=900;  h=600  },
  @{ id=325;  file="bahir-dar-city.jpg";       w=900;  h=600  },
  @{ id=532;  file="bezawit-hill.jpg";         w=900;  h=600  },
  @{ id=443;  file="monasteries.jpg";          w=900;  h=600  },
  # Attractions cards
  @{ id=1036; file="att-blue-nile.jpg";        w=600;  h=400  },
  @{ id=443;  file="att-ura-kidane.jpg";       w=600;  h=400  },
  @{ id=417;  file="att-lake-tana.jpg";        w=600;  h=400  },
  @{ id=672;  file="att-kibran.jpg";           w=600;  h=400  },
  @{ id=532;  file="att-narga.jpg";            w=600;  h=400  },
  @{ id=325;  file="att-market.jpg";           w=600;  h=400  },
  @{ id=403;  file="att-bezawit.jpg";          w=600;  h=400  },
  @{ id=443;  file="att-debre.jpg";            w=600;  h=400  },
  @{ id=417;  file="att-zege.jpg";             w=600;  h=400  },
  # Blog posts
  @{ id=325;  file="blog-history.jpg";         w=800;  h=500  },
  @{ id=417;  file="blog-lake-tana.jpg";       w=800;  h=500  },
  @{ id=1036; file="blog-falls.jpg";           w=800;  h=500  },
  @{ id=532;  file="blog-culture.jpg";         w=800;  h=500  },
  @{ id=403;  file="blog-best-places.jpg";     w=800;  h=500  },
  # Gallery 16 images
  @{ id=1036; file="gal-01.jpg"; w=600; h=450 },
  @{ id=417;  file="gal-02.jpg"; w=600; h=800 },
  @{ id=325;  file="gal-03.jpg"; w=600; h=450 },
  @{ id=443;  file="gal-04.jpg"; w=600; h=700 },
  @{ id=672;  file="gal-05.jpg"; w=600; h=450 },
  @{ id=532;  file="gal-06.jpg"; w=600; h=600 },
  @{ id=403;  file="gal-07.jpg"; w=600; h=450 },
  @{ id=106;  file="gal-08.jpg"; w=600; h=500 },
  @{ id=257;  file="gal-09.jpg"; w=600; h=700 },
  @{ id=338;  file="gal-10.jpg"; w=600; h=450 },
  @{ id=553;  file="gal-11.jpg"; w=600; h=600 },
  @{ id=452;  file="gal-12.jpg"; w=600; h=450 },
  @{ id=391;  file="gal-13.jpg"; w=600; h=700 },
  @{ id=674;  file="gal-14.jpg"; w=600; h=450 },
  @{ id=837;  file="gal-15.jpg"; w=600; h=600 },
  @{ id=119;  file="gal-16.jpg"; w=600; h=450 },
  # Testimonial avatars
  @{ id=64;   file="avatar-1.jpg"; w=100; h=100 },
  @{ id=91;   file="avatar-2.jpg"; w=100; h=100 },
  @{ id=177;  file="avatar-3.jpg"; w=100; h=100 },
  @{ id=313;  file="avatar-4.jpg"; w=100; h=100 },
  # Team avatars
  @{ id=177;  file="team-1.jpg";   w=200; h=200 },
  @{ id=91;   file="team-2.jpg";   w=200; h=200 },
  @{ id=64;   file="team-3.jpg";   w=200; h=200 }
)

$ok = 0; $fail = 0
foreach ($img in $imgs) {
  $path = "$dest\$($img.file)"
  if (Test-Path $path) { Write-Host "SKIP (exists): $($img.file)"; $ok++; continue }
  $url = "https://picsum.photos/id/$($img.id)/$($img.w)/$($img.h)"
  try {
    Invoke-WebRequest -Uri $url -OutFile $path -UseBasicParsing -TimeoutSec 20
    Write-Host "OK: $($img.file)"
    $ok++
  } catch {
    Write-Host "FAIL: $($img.file)"
    $fail++
  }
}
Write-Host "--- Done: $ok ok, $fail failed ---"
