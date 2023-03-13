exports.homePage = function (todo, done, d, edit) {
  var page = `
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="w3.css" />
        <title>ToDo Website</title>
    </head>

    <body>
        <header class="w3-container w3-blue-gray">
            <h1>ToDo</h1>
        </header>
        <main class="w3-padding-large">
            <form class="w3-container" method="POST" ${
              edit ? 'action=".."' : ""
            }>
                <fieldset>
                    <legend>To Do</legend>
                    <label>Description</label>
                    ${
                      edit
                        ? '<input type="hidden" name="id" value="' +
                          edit.id +
                          '" >'
                        : ""
                    }
                    <input type="hidden" name="type" value="${
                      edit ? edit.type + "C" : "NEW"
                    }">
                    <input class="w3-input w3-round" type="text" name="what" ${
                      edit ? 'value="' + edit.what + '"' : ""
                    }>
                    <label>Who should do it</label>
                    <input class="w3-input w3-round" type="text" name="who" ${
                      edit ? 'value="' + edit.who + '"' : ""
                    }>
                    <label>Deadline</label>
                    <input class="w3-input w3-round" type="date" name="dateDued" ${
                      edit ? 'value="' + edit.dateDued + '"' : ""
                    }>
                </fieldset>
                <br />
                <button class="w3-btn w3-blue-gray w3-mb-2" type="submit">${
                  edit ? "Edit" : "Add"
                }</button>
            </form>
            <hr />
            <section class="w3-cell-row ">
                <div class="w3-container w3-blue-gray w3-cell">
                    <h2>To Do</h2>
                    <ul>
  `;

  for (let index = 0; index < todo.length; index++) {
    const element = todo[index];
    page += `
                        <li>
                        <div>
                                <p>${element.what}</p>
                                <p><b>By:</b> ${element.who}</p>
                                <p><b>Deadline:</b> ${element.dateDued}</p>
                                <div class="w3-row">
                                    <form class="w3-cell" method="POST">
                                    <input type="hidden" name="type" value="DONE">
                                        <input type="hidden" name="id" value="${element.id}">
                                        <button class="w3-btn w3-white w3-margin-right" type="submit">Done</button>
                                    </form>
                                    <form class="w3-cell" action="/#editU" method="POST">
                                        <input type="hidden" name="type" value="EDITU">
                                        <input type="hidden" name="id" value="${element.id}">
                                        <button class="w3-btn w3-white w3-margin-right" type="submit">Edit</button>
                                        </form>
                                        <form class="w3-cell" method="POST">
                                        <input type="hidden" name="type" value="REMOVEU">
                                        <input type="hidden" name="id" value="${element.id}">
                                        <button class="w3-btn w3-white w3-margin-right" type="submit">Remove</button>
                                        </form>
                                        </div>
                                        </div>
                                        <hr>
                                        </li>
                                        `;
  }

  page += `
                </ul>
                </div>
            <div class="w3-cell w3-padding-small"></div>
            <div class="w3-container w3-blue-gray w3-cell">
                <h2>Done</h2>
                <ul>
    `;

  for (let index = 0; index < done.length; index++) {
    const element = done[index];
    page += `
    <li>
    <div>
    <p>${element.what}</p>
    <p><b>By:</b> ${element.who}</p>
    <p><b>Deadline:</b> ${element.dateDued}</p>
    <div>
                                <form class="w3-cell" method="POST">
                                <input type="hidden" name="type" value="UNDONE">
                                <input type="hidden" name="id" value="${element.id}">
                                <button class="w3-btn w3-white w3-margin-right" type="submit">Undone</button>
                                </form>
                                <form class="w3-cell" action="/#editD" method="POST">
                                    <input type="hidden" name="type" value="EDITD">
                                    <input type="hidden" name="id" value="${element.id}">
                                    <button class="w3-btn w3-white w3-margin-right" type="submit">Edit</button>
                                </form>
                                <form class="w3-cell" method="POST">
                                    <input type="hidden" name="type" value="REMOVED">
                                    <input type="hidden" name="id" value="${element.id}">
                                    <button class="w3-btn w3-white w3-margin-right" type="submit">Remove</button>
                                </form>
                            </div>
                        </div>
                        <hr>
                    </li>
    `;
  }

  page += `
                    </ul>
                </div>

            </section>
            <br />
        </main>
        <footer class="w3-container w3-blue-gray">
            <address>Generated by RPCW2023 in ${d}</address>
        </footer>
    </body>

    </html>
    `;

  return page;
};
