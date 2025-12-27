# # 游戏的脚本可置于此文件中。

# # 声明此游戏使用的角色。颜色参数可使角色姓名着色。

# define e = Character("艾琳")


# # 游戏在此开始。

# label start:

#     # 显示一个背景。此处默认显示占位图，但您也可以在图片目录添加一个文件
#     # （命名为 bg room.png 或 bg room.jpg）来显示。

#     scene bg room

#     # 显示角色立绘。此处使用了占位图，但您也可以在图片目录添加命名为
#     # eileen happy.png 的文件来将其替换掉。

#     show eileen happy

#     # 此处显示各行对话。

#     e "您已创建一个新的 Ren'Py 游戏。"

#     e "当您完善了故事、图片和音乐之后，您就可以向全世界发布了！"

#     # 此处为游戏结尾。

#     return





define p = Character("主角")
define n = Character("NPC")

label start:
    scene forest
    show amy
    n "你相信命运吗？"
    menu:
        "相信":
            p "我相信一切都是注定的。"
            jump ending_a
        "不信":
            p "我只相信自己的选择。"
            jump ending_b


label ending_a:
    n "如果是注定的，你又为什么要挣扎"

label ending_b:
    n "让我看看你做了什么选择"            

    return