from PIL import Image, ImageFilter

# 画像を開く
input_image = "/Users/sk/code/sosui.github.io/public/NTTRandD.png"  # 入力画像のパス
output_image = "./NTTRandD.png"  # 出力画像のパス

# 画像を開く
image = Image.open(input_image)

# 画像をぼかす（GaussianBlurの例）
blurred_image = image.filter(ImageFilter.GaussianBlur(radius=15))

# 画像を保存
blurred_image.save(output_image)

print("画像をぼかして保存しました:", output_image)
