import json

def nomeCidade(cidades, id):
    for c in cidades:
        if id == c['id']:
            return c['nome']

def ordCidade(c):
    return c['nome']

def ordDist(i):
    return i[1]

f = open("mapa.json")
data = json.load(f)
cidades = data['cidades']
cidades.sort(key=ordCidade)
ligacoes = data['ligações']
dicCidades = {}



for l in ligacoes:
    c1 = l['origem']
    c2 = l['destino']
    d = l['distância']

    if c1 in dicCidades:
        dicCidades[c1].append((c2,d))
    else:    
        dicCidades[c1] = [(c2,d)]

    if c2 in dicCidades:
        dicCidades[c2].append((c1,d))
    else:
        dicCidades[c2] = [(c1,d)]
    

pagWeb = """
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Mapa Virtual</title>
</head>

<body>
    <h1>Mapa Virtual</h1>
    <table>
        <tr>
            <td width="30%" valign="top">
                <a name="indice" />
                <h3>Índice</h3>
                <!-- Lista com o índice -->
                <ul>
"""

for c in cidades:
    pagWeb += f"""
        <li>
            <a href="#{c['id']}">{c['nome']}</a>
        </li>
    """

pagWeb += """
</ul>
            </td>
            <td width="70%">
"""

for c in cidades:
    lig = ''

    dicCidades[c['id']].sort(key=ordDist)

    for l in dicCidades[c['id']]:
        lig += f"<li>{nomeCidade(cidades , l[0])}: <a href=\"#{l[0]}\">{l[1]}</a></li>"

    pagWeb += f"""
                <a name="{c['id']}" />
                <h3>{c['nome']}</h3>
                <p><b>População:</b> {c['população']}</p>
                <p><b>Descrição:</b> {c['descrição']}</p>
                <p><b>Distrito:</b> {c['distrito']}</p>
                <p><b>Ligações:</b></p>
                <ul>
                {lig}
                </ul>
                <address>[<a href="#indice">Voltar ao índice</a>]</address>
                <center>
                    <hr width="80%" />
                </center>
    """


pagWeb += """
            </td>
        </tr>
    </table>
</body>

</html>
"""

print(pagWeb)
