# Teste iCasei: Front-End Pleno
Desenvolver uma aplicação HTML5

## Instruções
- Faça um fork desse projeto para a sua conta pessoal do GitHub.
- Siga as especificações abaixo.
- Crie um README com as instruções para compilar, testar e rodar o projeto.
- O link do repositório deverá ser enviado para o e-mail frontend@icasei.com.br com o título **Teste FrontEnd Pleno**

## Especificações tecnicas
- Utilizar diretrizes do [Google Material Design](https://www.google.com/design/spec/material-design/introduction.html)
- Utilizar a [OMDb API](http://www.omdbapi.com)
- Mobile first e responsivo
- Usar framework JS (AngularJS, Backbone, Knockout)
- Cores livres, layout livre, imagens livres (fora os posters)
- Gitflow
- Testes automatizados

## Especificações funcionais
### Tela Inicial
Essa tela terá um formulário de busca posicionado no meio da tela com campo de texto com placeholder "Procure seu filme" e um botão "Buscar". Essa busca deverá chamar a url http://www.omdbapi.com/?s={nome_do_filme}.

Ao fazer a busca, o formulário deve ser movido para o topo da tela usando css animate e mostrar a lista de filmes com os campos do retorno da chamada (Título, Ano, Tipo, imdbID, Poster). O campo de busca deverá ter validação.

A lista de filmes deve mostrar apenas o poster do filme e um botão para ver o detalhe do filme. Deve mostrar apenas os 6 primeiros resultados e deve possuir paginação infinita mostrando de 6 em 6 resultados.

### Tela de detalhes
A partir do imdbID retornado na outra chamada, deve ser feito uma chamada para http://www.omdbapi.com/?i={imbd_id}.

A partir desse retorno, deve-se montar uma tela onde apareçam as informações Title, Year, Rated, Genre, Director, Writer, Actors, Plot, Language, Country, Awards, Poster, Type.

Essa tela deve ter um botão para voltar para resultados da busca.

## O que será avaliado?
- Organização do projeto
- Lógica do código
- Uso do Git
- Testes automatizados
