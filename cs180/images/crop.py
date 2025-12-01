import os
from skimage import io
import numpy as np

# Parameters
input_folder = './uncropped'  # Current folder
output_folder = '.'
crop_pixels_bottom = 50  # Number of pixels to crop from each side
crop_pixels = 20

# Create output folder if it doesn't exist
os.makedirs(output_folder, exist_ok=True)

# Supported image extensions
extensions = ['.jpg', '.jpeg', '.png', '.tif', '.tiff']

for filename in os.listdir(input_folder):
    if any(filename.lower().endswith(ext) for ext in extensions):
        img_path = os.path.join(input_folder, filename)
        img = io.imread(img_path)
        # Crop
        if img.ndim == 3:
            cropped = img[10:-35, 45:-15, :]
        else:
            cropped = img[crop_pixels:-crop_pixels, crop_pixels:-crop_pixels]
        # Save
        out_path = os.path.join(output_folder, filename)
        io.imsave(out_path, cropped)
        print(f'Cropped and saved: {out_path}')
