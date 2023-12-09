# Superliga Volleyball Calendar Project

Este projeto é uma integração da API do Superliga Volleyball da CBV (Confederação Brasileira de Voleibol) com o Google Calendar usando Google Apps Script. 

Foi desenvolvido para gerenciar e atualizar automaticamente o calendário de jogos da Superliga de vôlei por meio de criação de eventos com informações dos jogos, incluindo os times da partida e links da transmissão.


## Estrutura de Arquivos

* **env.js:** Contém a configuração do ID do calendário utilizado no Google Calendar.

* **util.js:** Fornece utilitários para manipulação de datas, geração de URLs e formatação de informações.

* **main.js:** O arquivo principal que executa a lógica principal do projeto. Ele busca informações da API da Superliga, mapeia os dados relevantes e atualiza o calendário no Google.

## Configuração Inicial

Antes de executar o projeto, certifique-se de configurar corretamente o arquivo `env.js` com o ID do calendário do Google.

Em seguida, conceda as permissões de manipulação de eventos.

## Funções Principais

### 1. Atualização Automática do Calendário

O arquivo `main.js` contém a função principal `main()`, que é responsável por buscar informações da API da Superliga, mapear os dados relevantes e atualizar o calendário no Google.

### 2. Limpeza de Jogos Futuros

O utilitário `deletedFutureGamesCalendar()` no arquivo `util.js` remove eventos futuros do calendário, garantindo uma atualização eficiente e precisa.

### 3. Construção de Descrição do Evento

A função `buildDescriptionCalendarEvent()` no arquivo `util.js` cria uma descrição detalhada do evento, incluindo informações sobre os times, transmissão e links relevantes.

## Personalização

O projeto pode ser personalizado para se adequar a diferentes ligas ou esportes, adaptando as URLs, formatos de data e outros detalhes específicos.

## Execução do Projeto

Para executar o projeto no Google Apps Script, basta colar o código no Editor de Scripts e chamar a função `main()`. Certifique-se de ter as permissões necessárias para acessar e modificar o calendário do Google associado.

**Exemplo de Execução:**

Para facilitar a execução, utilize a tecla de atalho:

- No Windows/Linux: Pressione `Ctrl + R`.
- No macOS: Pressione `Cmd + R`.

Lembre-se de verificar regularmente as atualizações da API ou ajustar os parâmetros conforme necessário para garantir a precisão do calendário.
