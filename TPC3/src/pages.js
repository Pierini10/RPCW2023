exports.pessoas = (lista, titulo) => {
  let pagHTML = `
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
        <link rel="stylesheet" href="w3.css">
        <meta charset="UTF-8">
        <title>${titulo}</title>
    </head>
    
    <body>
        <div class="w3-card-4">
            <header class="w3-dark-gray w3-cell-row">
                <h1 class="w3-cell w3-padding-large">${titulo}</h1>
                <a class="w3-button w3-round-large w3-cell w3-padding-large" href="/">Voltar Início</a>
            </header>
        </div>
        <div class="w3-container">
            <table class="w3-table-all">
                <tr>
                    <th>Id</th>
                    <th>Nome</th>
                    <th>Idade</th>
                    <th>Sexo</th>
                    <th>Cidade</th>
                </tr>
    
  
    `;

  for (let i = 0; i < lista.length; i++) {
    pagHTML += `
    <tr>
    <td>${lista[i].id}</td>
    <td>
    <a href="/pessoa/${lista[i].id}">
              ${lista[i].nome}
              </a>
              </td>
              <td>${lista[i].idade}</td>
              <td>${lista[i].sexo}</td>
              <td>${lista[i].morada.cidade}</td>
            </tr>
      `;
  }

  pagHTML += `
        </table>
        </div>
        <footer class="w3-container w3-dark-gray w3-margin-top">
            <h4>RPCW2023</h4>
        </footer>
    </body>
    
    </html>
    `;

  return pagHTML;
};

exports.pessoa = (pessoa) => {
  let pagHTML = `
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
        <link rel="stylesheet" href="w3.css">
        <meta charset="UTF-8">
        <title>Pessoa</title>
    </head>
    
    <body>
        <div class="w3-card-4">
            <header class="w3-dark-gray w3-cell-row">
                <h1 class="w3-cell w3-padding-large">Pessoa</h1>
                <a class="w3-button w3-round-large w3-cell w3-padding-large" href="/">Voltar Início</a>
            </header>
        </div>
        <main>
            <div class="w3-container w3-light-grey w3-margin-top">
                <h4>Nome</h4>
                <p>${pessoa.nome}</p>
            </div>
            <div class="w3-container w3-light-grey w3-margin-top">
                <h4>Idade</h4>
                <p>${pessoa.idade}</p>
            </div>
            <div class="w3-container w3-light-grey w3-margin-top">
                <h4>Sexo</h4>
                <p>${pessoa.sexo}</p>
            </div>
            <div class="w3-container w3-light-grey w3-margin-top">
                <h4>Morada</h4>
                <p>${pessoa.morada.cidade}, ${pessoa.morada.distrito}</p>
            </div>
            <div class="w3-container w3-light-grey w3-margin-top">
                <h4>BI</h4>
                <p>${pessoa.BI}</p>
            </div>
            <div class="w3-container w3-light-grey w3-margin-top">
                <h4>Profissão</h4>
                <p>${pessoa.profissao}</p>
            </div>
            <div class="w3-container w3-light-grey w3-margin-top">
                <h4>Partido político</h4>
                <p>${pessoa.partido_politico.party_name}, ${pessoa.partido_politico.party_name}</p>
            </div>
            <div class="w3-container w3-light-grey w3-margin-top">
                <h4>Religião</h4>
                <p>${pessoa.religiao}</p>
            </div>
            <div class="w3-container w3-light-grey w3-margin-top">
                <h4>Marca do carro</h4>
                <p>${pessoa.marca_carro}</p>
            </div>
            <div class="w3-container w3-light-grey w3-margin-top">
                <h4>Desportos</h4>
                <ul>
    `;

  for (let i = 0; i < pessoa.desportos.length; i++) {
    const element = pessoa.desportos[i];

    pagHTML += `
        <li>${element}</li>
        `;
  }

  pagHTML += `
    </ul>
        </div>
        <div class="w3-container w3-light-grey w3-margin-top">
            <h4>Animais</h4>
            <ul>
    `;

  for (let i = 0; i < pessoa.animais.length; i++) {
    const element = pessoa.animais[i];

    pagHTML += `
        <li>${element}</li>
        `;
  }

  pagHTML += `
    </ul>
    </div>
    <div class="w3-container w3-light-grey w3-margin-top">
    <h4>Figuras públicas</h4>
    <ul>
    `;
  for (let i = 0; i < pessoa.figura_publica_pt.length; i++) {
    const element = pessoa.figura_publica_pt[i];

    pagHTML += `
        <li>${element}</li>
        `;
  }

  pagHTML += `
    </ul>
        </div>
        <div class="w3-container w3-light-grey w3-margin-top">
            <h4>Destinos favoritos</h4>
            <ul>
    `;
  for (let i = 0; i < pessoa.destinos_favoritos.length; i++) {
    const element = pessoa.destinos_favoritos[i];

    pagHTML += `
        <li>${element}</li>
        `;
  }

  pagHTML += `
            </ul>
        </div>
        <div class="w3-container w3-light-grey w3-margin-top">
            <h4>Outros atributos</h4>
            <p>${pessoa.atributos.fumador ? "Fuma" : "Não fuma"},${
    pessoa.atributos.gosta_cinema ? " " : " não "
  }gosta de cinema,${
    pessoa.atributos.gosta_viajar ? " " : " não "
  } gosta de viajar,${
    pessoa.atributos.acorda_cedo ? " " : " não "
  }acorda cedo,${pessoa.atributos.gosta_ler ? " " : " não "}gosta de ler, ${
    pessoa.atributos.gosta_musica ? " " : " não "
  }gosta de música,${
    pessoa.atributos.gosta_comer ? " " : " não "
  }gosta de comer,${
    pessoa.atributos.gosta_animais_estimacao ? " " : " não "
  }gosta de animais de estimação e${
    pessoa.atributos.gosta_dancar ? " " : " não "
  }gosta de dançar.</p>
        </div>
        <div class="w3-container w3-light-grey w3-margin-top">
            <h4>Comida favorita</h4>
            <p>${pessoa.atributos.comida_favorita}</p>
        </div>
        </main>
        <footer class="w3-container w3-dark-gray w3-margin-top">
            <h4>RPCW2023</h4>
        </footer>
    </body>
    
    </html>
    `;

  return pagHTML;
};

exports.indice = (lista, titulo, path) => {
  let pagHTML = `
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
        <link rel="stylesheet" href="w3.css">
        <meta charset="UTF-8">
        <title>${titulo}</title>
    </head>
    
    <body class="w3-light-gray">
        <div class="w3-card-4">
        <header class="w3-dark-gray w3-cell-row">
            <h1 class="w3-cell w3-padding-large">${titulo}</h1>
            <a class="w3-button w3-round-large w3-cell w3-padding-large" href="/">Voltar Início</a>
        </header>
        </div>
        <main class="w3-padding-large">
            <h1>Índice</h1>
            <ul class="w3-ul w3-border w3-hoverable ">            
    `;

  for (let i = 0; i < lista.length; i++) {
    pagHTML += `
        <li class="w3-padding-large">
        <a href="${path}/${lista[i]}">${lista[i]}</a>
        </li>
      `;
  }

  pagHTML += `
        </ul>
        </main>
        <footer class="w3-container w3-dark-gray w3-margin-top">
            <h4>RPCW2023</h4>
        </footer>
    </body>

    </html>
    `;

  return pagHTML;
};
