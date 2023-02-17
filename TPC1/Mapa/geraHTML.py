import json

def ordCidade(c):
    return c['nome']

f = open("mapa.json")
data = json.load(f)
cidades = data['cidades']
cidades.sort(key=ordCidade)

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
    pagWeb += f"""
                <a name="{c['id']}" />
                <h3>{c['nome']}</h3>
                <p><b>População:</b> {c['população']}</p>
                <p><b>Descrição:</b> {c['descrição']}</p>
                <p><b>Distrito:</b> {c['distrito']}</p>
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
