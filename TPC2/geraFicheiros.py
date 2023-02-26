from bs4 import BeautifulSoup


def createSoup(filename):
    fileContent = open(filename, 'r', encoding="iso-8859-1").read()

    return BeautifulSoup(fileContent, 'xml')


def createXMLFiles(soup):
    elems = soup.find_all('ARQELEM')
    n = 1

    for elem in elems:
        elemSoup = BeautifulSoup(str(elem), 'xml')

        open(f'files/xml/arq{n}.xml', 'w',
             encoding="iso-8859-1").write(str(elemSoup))
        n += 1


def createIndexHTML(soup):
    elems = soup.find_all('ARQELEM')
    n = 1
    html = '''
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <title>Arqueologia</title>
        <meta charset="UTF-8">
    </head>
    <body>
        <header>
            <h1>Site Arqueológico</h1>
        </header>
        <main>
            <h2>Índice:</h2>
            <ul>'''

    for elem in elems:
        id = elem.find('IDENTI')

        html += f'\n\t\t\t\t<li><a href="/{n}">{id.text}</a></li>'

        n += 1

    html += '''
            </ul>
        </main>
    </body>
    </html>
    '''

    open('index.html', 'w').write(html)


def createArqElemHTML(soup):
    elems = soup.find_all('ARQELEM')
    n = 1

    for elem in elems:
        html = f'''
        <!DOCTYPE html>
        <html lang="en">

        <head>
            <title>Arqueologia</title>
            <meta charset="UTF-8">
        </head>

        <body>
        '''

        html += f"<header><h1>{elem.find('IDENTI').text}</h1></header><main>"

        img = elem.find('IMAGEM')

        if img:
            html += f'''<img src="{img['NOME']}" alt="{img['NOME']}">'''

        descri = elem.find('DESCRI')
        if descri:
            lig = descri.find('LIGA')
            if lig:
                html += f'''<h3><a href="{lig['TERMO']}">{lig.text}</a></h3>'''

        concel = elem.find('CONCEL')
        fregue = elem.find('FREGUE')
        lugar = elem.find('LUGAR')
        codadm = elem.find('CODADM')
        alt = elem.find('ALTITU')
        lat = elem.find('LATITU')
        long = elem.find('LONGIT')

        html += f'<p>Concelho: {concel.text} > Freguesia: {fregue.text} > Lugar: {lugar.text}'

        if codadm:
            html += f' || CodAdm: {codadm.text}'

        if alt:
            html += f' || Altitude: {alt.text}'

        if lat and long:
            html += f' | Coordenadas: ({lat.text}; {long.text})'

        html += '</p>'

        crono = elem.find('CRONO')

        if crono:
            html += f'''
            <h3>Crono:</h3>
            <p>{crono.text}</p>
            '''

        acesso = elem.find('ACESSO')

        if acesso:
            html += f'''
            <h3>Acesso:</h3>
            <p>{acesso.text}</p>
            '''
            
        quadro = elem.find('QUADRO')

        if quadro:
            html += f'''
            <h3>Quadro:</h3>
            <p>{quadro.text}</p>
            '''
            
        traarq = elem.find('TRAARQ')

        if traarq:
            html += f'''
            <h3>Trabalhos arqueológicos:</h3>
            <p>{traarq.text}</p>
            '''
            
        desarq = elem.find('DESARQ')

        if desarq:
            html += f'''
            <h3>Descorbertas arqueológicas:</h3>
            <p>{desarq.text}</p>
            '''
            
        interp = elem.find('INTERP')

        if interp:
            html += f'''
            <h3>Interp:</h3>
            <p>{interp.text}</p>
            '''
        
        biblio = elem.findAll('BIBLIO')
        
        if biblio:
            html += '<h2>Bibliografia:</h2>'
            
            for bib in biblio:
                html += f"<p>{bib.text}</p>"

        autor = elem.find('AUTOR')
        data = elem.find('DATA')


        html += f'''
                <p> __</p>
                <h4>Autor: {autor.text} | Data: {data.text} </h4>
                <h4><a href="/">Voltar ao índice</></h4>
            </main>
        </body>

        </html>
        '''

        open(f'files/html/arq{n}.html', 'w').write(html)
        n += 1


soup = createSoup('files/arq.xml')
createXMLFiles(soup)
createIndexHTML(soup)
createArqElemHTML(soup)
