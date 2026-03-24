import os, re, colorsys

old_light_color = "#7F6029"
old_dark_color = "#4F3A1A"
old_stripe_color = "#AAFFAA"
old_spot_color = "#FFFFAA"
def recolor_svg_cat(file_path: str, path_to_new: str, color_name: str, lightColor: str, darkColor: str, stripe_color: str, spot_color: str):
    with open(file_path) as svg:
        lines = svg.readlines()
        new_lines = []
        for line in lines:
            new_line = line.replace(old_light_color, lightColor).replace(old_dark_color, darkColor).replace(old_stripe_color, stripe_color).replace(old_spot_color, spot_color)
            new_lines.append(new_line)
    
    if color_name not in os.listdir(path_to_new):
        os.mkdir(os.path.join(path_to_new, color_name))
    with open(os.path.join(path_to_new, color_name, file_path), "w+") as new_svg:
        new_svg.writelines(new_lines) 


         
def recolor_all(path_to_new: str, color_name: str, light_color: str, dark_color: str, stripe_color: str, spot_color: str):
    recolor_svg_cat("cat_walk.svg", path_to_new, color_name, light_color, dark_color, stripe_color, spot_color)
    recolor_svg_cat("cat_walk2.svg", path_to_new, color_name, light_color, dark_color, stripe_color, spot_color)
    recolor_svg_cat("cat_sleep.svg", path_to_new, color_name, light_color, dark_color, stripe_color, spot_color)
    recolor_svg_cat("cat_sit.svg", path_to_new, color_name, light_color, dark_color, stripe_color, spot_color)

path_to_assets = "../../raw-assets/preload{m}/cat"


recolor_all(path_to_assets, "babyLeo", "#7F6029", "#4F3A1A",  "#ffffff00",  "#302310")
recolor_all(path_to_assets, "silverBengal", "#B8AE9D", "#574D3E",  "#ffffff00",  "#42392C")
recolor_all(path_to_assets, "black", "#595a5c", "#362f24", "#ffffff00", "#ffffff00")
recolor_all(path_to_assets, "orange", "#FFC55A", "#BD704C", "#ffffff00", "#ffffff00")
recolor_all(path_to_assets, "kyle", "#FFC55A", "#BD704C", "#cf9e7cff", "#ffffff00")
recolor_all(path_to_assets, "grey", "#B3A791", "#877961", "#ffffff00", "#ffffff00")
recolor_all(path_to_assets, "white", "#FFF1D7", "#ffe4b9", "#ffffff00", "#ffffff00")
recolor_all(path_to_assets, "snowLeopard", "#FFF1D7", "#ffe4b9", "#ffffff00", "#be987eff")