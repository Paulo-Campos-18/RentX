# RentX
<li>O programa tem como objetivo demostrar uma arquitetura limpa e eficiente, suas partes com dependências apenas do necessário e sempre de interfaces ao invés de classes concretas, enquanto usa injeção de dependência e testes automatizados que não dependem do Prisma nem criam arquivo .db, mas sim guarda em arrays na memora local. 
<li>O programa simula uma empresa de aluguéis de carros.
  
## Instalação e Configuração

1.  **Instale as dependências:**
    ```bash
    npm install
    ```

2.  **Crie o banco de dados (SQLite) e as tabelas:**
    ```bash
    npm run prisma:migrate
    ```

3.  **Popule o banco com dados de teste (Livro Físico e E-book):**
    ```bash
    npm run prisma:seed
    ```
## Execução
Para rodar o programa use o seguinte comando:

```bash
npm run main
```
Nota: em main.ts está o input simulando uma entrada real na aplicação.

## Testes
Para rodar os testes automáticos do programa use o seguinte comando:
```bash
npm run test
```

