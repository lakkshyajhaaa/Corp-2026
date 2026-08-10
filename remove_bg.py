from PIL import Image

def remove_white(input_path, output_path, threshold=220):
    img = Image.open(input_path).convert("RGBA")
    datas = img.getdata()
    
    new_data = []
    for item in datas:
        # Change pixels close to white to transparent
        if item[0] > threshold and item[1] > threshold and item[2] > threshold:
            new_data.append((255, 255, 255, 0))
        else:
            new_data.append(item)
            
    img.putdata(new_data)
    img.save(output_path, "PNG")

if __name__ == "__main__":
    print("Processing boat...")
    remove_white("public/color_woodblock_2.jpg", "public/color_woodblock_2.png", threshold=200)
    print("Processing kraken...")
    remove_white("public/color_woodblock_3.jpg", "public/color_woodblock_3.png", threshold=200)
    print("Done!")
