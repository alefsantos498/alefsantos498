''' Verificar palíndromo'''

#Tratamento de erro
try:
    '''Variável que solicita uma entrada do usuário'''
    text = input('Digite uma frase ou palavra: ').lower()
    

    #Variável que inverte o valor da entrada
    t = text[::-1]
    #Bloco de condição para verificar se é um palíndromo
    if t == text:
        print(f'A palavra {t} é um palíndromo')
    else:
        print('Não encontramos um palindromo')
except TyperError:
    print('Erro!!! Digite apenas texto')

