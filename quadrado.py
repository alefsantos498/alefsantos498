#Código simples,para desenhar um quadrado com os valores de entrada

try:
    lg = int(input('digite a largura: '))
    alt = int(input('digite a altura: '))

    i = 0
    while i < alt:
        j = 0
        while j < lg:
            print('#', end='')
            j += 1
        print()  
        i += 1
except ValueError:
    print('Erro!! Digite apenas números')
