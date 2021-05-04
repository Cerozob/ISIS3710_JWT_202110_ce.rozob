# ISIS3710_JWT_202110_ce.rozob

Cómo crear y loguearse en usuarios usando Insomnia

## Registrar un usuario

Para registrar un usuario en la base de datos hay que enviar un POST a la url /register, el body debe tener los siguientes atributos: 
```javascript
  {
    "username":"usuario",
    "password":"clave"
  }
```

## Loguearse como usuario existente

Para loguearse, hay que enviar un POST a la url /login, el body debe tener los siguientes atributos:
```javascript
  {
    "username":"usuario",
    "password":"clave"
  }
```

Las claves se guardan hasheadas y se verifican de la misma forma, por lo que la contraseña en texto plano sólo se usa cuando se recibe del request.
