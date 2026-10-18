"""Compare this site's hero assets with accessible local sibling-project assets."""
from pathlib import Path
from PIL import Image, ImageOps
import hashlib, json, os
root = Path(__file__).resolve().parents[1]
assets = list((root/'public/images').glob('*.webp'))
def dhash(path):
    with Image.open(path) as image:
        data = list(ImageOps.grayscale(image).resize((17,16)).getdata())
    return sum((data[y*17+x] > data[y*17+x+1]) << (y*16+x) for y in range(16) for x in range(16))
ours = [(p, hashlib.sha256(p.read_bytes()).hexdigest(), dhash(p)) for p in assets]
skip = {'node_modules','.git','.next','.cache','test-results','playwright-report'}
checked=0
candidates=[]
errors=[]
for directory, dirs, files in os.walk(root.parent):
    dirs[:] = [d for d in dirs if d not in skip]
    for name in files:
        p=Path(directory)/name
        if p in assets or p.suffix.lower() not in {'.png','.jpg','.jpeg','.webp'}: continue
        try:
            fingerprint=dhash(p)
            sha=hashlib.sha256(p.read_bytes()).hexdigest()
            checked+=1
            for asset,digest,visual in ours:
                distance=(fingerprint^visual).bit_count()
                if sha==digest or distance<=20:
                    candidates.append({'asset':str(asset.relative_to(root)),'candidate':str(p),'exact':sha==digest,'dhash_distance':distance})
        except Exception as e: errors.append({'path':str(p),'error':str(e)})
report={'scope':'Accessible images under '+str(root.parent),'checked_images':checked,'near_duplicate_candidates':candidates,'unreadable_images':errors,'limitations':'Remote sites and inventories outside the local sibling-project directory were not accessible or verified. Perceptual hashing screens candidates; it does not prove portfolio-wide uniqueness.','within_site_distance':(ours[0][2]^ours[1][2]).bit_count()}
(root/'docs/image-uniqueness-check.json').write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps({'checked_images':checked,'candidates':len(candidates),'unreadable':len(errors),'within_site_distance':report['within_site_distance']}))
