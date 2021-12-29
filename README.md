# Projeto Unitizador

## Framework

- https://dfee.github.io/rbx

## Docker

```bash
docker build -t app_suporte .
docker run -d -p 7000:7000 --name app_suporte app_suporte
docker logs App_Suporte --tail 500 -f
```
