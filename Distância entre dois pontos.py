import math
x1 = float(input("Digite o valor de x1: "))

x2 = float(input("Digite o valor de x2: "))

y1 = float(input("Digite o valor de y1: "))

y2 = float(input("Digite o valor de y2: "))

valor = ((x1 - x2)**2) + ((y1 - y2)**2)

dist = math.sqrt(valor)

if dist >= 10:
    print("longe")
else:
    print("perto")
    
