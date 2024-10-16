#Código simples,para desenhar um quadrado com os valores de entrada

try:#Tratamento de Exceções
    lg = int(input('digite a largura: '))#Entradas do usuário
    alt = int(input('digite a altura: '))

    i = 0
    #
    while i < alt:
        j = 0
        while j < lg:
            print('#', end='')
            j += 1
        print()  
        i += 1
except ValueError:
    print('Erro!! Digite apenas números')
