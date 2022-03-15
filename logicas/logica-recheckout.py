import csv
file = open("codigo.csv", "r")
csvreader = csv.reader(file)
header = next(csvreader)
rows = []
for row in csvreader:
    rows.append(row)
file.close()

onda = rows
qtdantes = len(onda)
checados = []
novos = []

def buscaIndice(chave, onda):
    for item, index in zip(onda, range(len(onda))):
        if item[2] == chave:
            return index
    return -1


while True:
    chave = input("BIPA CHAVE: ")
    if chave == "1":
        break

    if chave in checados:
        print("JA FOI BIPADO")
    else:
        checados.append(chave)
        index = buscaIndice(chave, onda)
        if index != -1:
            del(onda[index])

print("")
for i in onda:
    print(i)


print("")
print("Total: ", qtdantes)
print("Falta: ", len(onda))
