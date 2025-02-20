show table;
Comdandos
Inicia o Banco verificando se está ativo e entra no mysql:
mysql
, seguido de 
$show databases;

$use <name data base>;
$show tables;
show columns from <name columns>;

Querys:
insert into `<name columns>` values (null, "Primeiro post", Conteudo do post", 0);

select * from `<name columns>`;

comando update:  insert into `autores`values (null, `joao`);
    update `autores` set nome = `gui` where id = 1;

// a gente trabalha com banc orelacional associando os comandos de cada id ao seu usuário

delete from autores; //deleta todos os autores, no proximo insert na tabela autores, o id altoincrementado não resetará ou seja, os id excluidos não são usados, 

delete from autores where nome=gui;
delete from autores where id=2;

select nome from autores; //retorna uma tabela so com a coluna nomes

//Ordenar informações do banco de dados
select * from <tabela> oder by <coluna referencia> <tipo de ordenação>;
asc > Crescente; desc > decrescente;
select * from posts order by titulo desc;

insert into posts values (null, 'titulo post','conteudo do post', 0);

select * from `posts` where id = 1; com e sem `` funcionará

//Agrupar com base em uma coluna. command `group by`
select * from posts group by autor_id;
select * from posts group by autor_id order by id desc;
select * from posts where titulo = 'titulo de teste' group by  autor_id order by id desc;

// limitando quantidade de elementos ou apartir de,quantidade após em tamanho vetorial ou seja após especificar o agrupamento ou a tabela, nos limitamos destas duas formas
select * from posts order by id desc limit 5;
select * from posts limit 2,3; // apartir da posição 2, pege 3 linhas da tabela

//inner join, faz a fusão de tabelas, baseado na condição  posts e autores
select * from posts inner join autores on posts.autor_id=autores.id;
select * from posts inner join autores on posts.autor_id=autores.id where posts.id=10;
 select * from posts inner join autores on posts.autor_id = autores.id;

//left join, ele retorna mesmo que não exista autor_id ele retorna nulo onde não existir nada nessa relação.
slect * from posts left join autores on posts.autor_id=autores.id;

//right join ele pega a tabela da direita  e no left a da esquerda e faz a correlação onde não existir a condição ele retorna null
